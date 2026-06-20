import { useEffect, useRef, useState, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface DifyChunkResponse {
  event: string;
  answer?: string;
  conversation_id?: string;
  message_id?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
// Apunta a la función serverless de Netlify (proxy seguro definido en netlify.toml)
const DIFY_API_URL = "/api-dify";

const SUGGESTED_QUESTIONS = [
  "¿Cuáles son los horarios de atención?",
  "¿Necesito ayuno para los análisis?",
  "¿Qué obras sociales aceptan?",
  "¿Cómo retiro mis resultados?",
];

// ─── Helper: render markdown-like bold ───────────────────────────────────────
function renderContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function DifyChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Abrir/cerrar chat — nueva sesión cada vez que se abre
  const handleToggle = useCallback(() => {
    if (!isOpen) {
      // Sesión nueva: limpiar historial y conversation_id
      setMessages([]);
      setConversationId("");
      setShowSuggestions(true);
    } else {
      // Cancelar stream activo si se cierra mientras carga
      abortRef.current?.abort();
    }
    setIsOpen((prev) => !prev);
  }, [isOpen]);

  // Enviar mensaje a Dify via streaming
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      // Generador de ID manual para evitar fallas de entorno seguro (crypto.randomUUID) en local
      const generateUUID = () =>
        Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

      const userMsg: Message = {
        id: generateUUID(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);
      setShowSuggestions(false);

      // Placeholder del asistente mientras llega el stream
      const assistantId = generateUUID();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
      ]);

      abortRef.current = new AbortController();

      try {
        const res = await fetch(DIFY_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // El header Authorization NO va acá. Lo agrega la Netlify Function
            // (netlify/functions/dify-chat.ts) del lado del servidor, leyendo
            // la variable de entorno DIFY_API_KEY.
          },
          body: JSON.stringify({
            inputs: {},
            query: text.trim(),
            response_mode: "streaming",
            conversation_id: conversationId || "",
            user: "patient-anonymous",
          }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error(
              "Error 401: No autorizado. Revisá que DIFY_API_KEY esté bien configurada en Netlify → Site configuration → Environment variables, y que hayas re-desplegado el sitio después de agregarla."
            );
          }
          if (res.status === 404) {
            throw new Error(
              "Error 404: No se encontró la función. Verificá que netlify/functions/dify-chat.ts exista y que netlify.toml tenga el redirect a /.netlify/functions/dify-chat."
            );
          }
          throw new Error(`Error del servidor Dify (Status ${res.status}).`);
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const data: DifyChunkResponse = JSON.parse(line.slice(6));

              if (data.event === "message" && data.answer) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: m.content + data.answer }
                      : m
                  )
                );
              }

              if (data.conversation_id && !conversationId) {
                setConversationId(data.conversation_id);
              }
            } catch {
              // chunk incompleto, continuar
            }
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Error detectado en la petición:", err);

          let errorMessage =
            "Lo siento, hubo un error al procesar tu consulta. Por favor intentá de nuevo.";

          if (err.message.includes("Failed to fetch")) {
            errorMessage =
              "Error de conexión. Si estás probando en local, recordá usar 'netlify dev' (en vez de 'npm run dev' solo) para que la función serverless esté disponible.";
          } else {
            errorMessage = err.message;
          }

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content: errorMessage,
                  }
                : m
            )
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, conversationId]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* ── Overlay para cerrar en mobile ───────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[998] lg:hidden"
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}

      {/* ── Ventana del chat ─────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-label="Asistente virtual del laboratorio"
        aria-modal="true"
        className={`
          fixed z-[999] bg-white shadow-2xl flex flex-col
          transition-all duration-300 ease-out
          ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}

          /* Mobile: casi pantalla completa, anclado abajo */
          bottom-0 left-0 right-0 
          rounded-t-2xl
          h-[85svh]

          /* Desktop: ventana flotante sobre el botón */
          lg:bottom-[140px] lg:right-5 lg:left-auto
          lg:w-[380px] lg:h-[560px]
          lg:rounded-2xl
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-ibta-primary rounded-t-2xl flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <i className="ri-test-tube-line text-white text-lg" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm leading-tight">
              Asistente BG Laboratorio
            </p>
            <p className="text-white/60 text-xs">
              {isLoading ? (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="inline-block w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="inline-block w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce [animation-delay:300ms]" />
                </span>
              ) : (
                "En línea"
              )}
            </p>
          </div>
          <button
            onClick={handleToggle}
            aria-label="Cerrar chat"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white"
          >
            <i className="ri-close-line text-lg" aria-hidden="true" />
          </button>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
          {/* Mensaje de bienvenida */}
          <div className="flex gap-2 items-end">
            <div className="w-7 h-7 rounded-full bg-ibta-primary/10 flex items-center justify-center flex-shrink-0 mb-0.5">
              <i className="ri-test-tube-line text-ibta-primary text-sm" aria-hidden="true" />
            </div>
            <div className="max-w-[80%] bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5">
              <p className="text-gray-800 text-sm leading-relaxed">
                Hola, soy el asistente virtual del{" "}
                <strong>Laboratorio Baldomá-Gregorini</strong>. ¿En qué puedo
                ayudarte?
              </p>
            </div>
          </div>

          {/* Preguntas sugeridas */}
          {showSuggestions && messages.length === 0 && (
            <div className="flex flex-col gap-2 pl-9">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-sm text-ibta-primary border border-ibta-primary/30 bg-ibta-primary/5 hover:bg-ibta-primary/10 px-3 py-2 rounded-xl transition-colors leading-snug"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Historial de mensajes */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 items-end ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar asistente */}
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-ibta-primary/10 flex items-center justify-center flex-shrink-0 mb-0.5">
                  <i className="ri-test-tube-line text-ibta-primary text-sm" aria-hidden="true" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-ibta-primary text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                {msg.content === "" && msg.role === "assistant" ? (
                  // Typing indicator
                  <span className="flex items-center gap-1 py-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                ) : (
                  <p className="whitespace-pre-wrap">{renderContent(msg.content)}</p>
                )}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex-shrink-0 border-t border-gray-100 px-3 py-3 bg-white rounded-b-2xl">
          <div className="flex items-end gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200 focus-within:border-ibta-primary transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribí tu consulta..."
              rows={1}
              disabled={isLoading}
              aria-label="Campo de mensaje"
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none outline-none max-h-28 leading-relaxed disabled:opacity-50"
              style={{ minHeight: "24px" }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              aria-label="Enviar mensaje"
              className="flex-shrink-0 w-8 h-8 bg-ibta-primary hover:bg-ibta-dark disabled:opacity-40 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors"
            >
              <i className="ri-send-plane-fill text-white text-sm" aria-hidden="true" />
            </button>
          </div>
          <p className="text-center text-gray-300 text-[10px] mt-1.5">
            Laboratorio Baldomá-Gregorini · Rosario, Santa Fe
          </p>
        </div>
      </div>

      {/* ── Botón flotante ───────────────────────────────────────────────── */}
      <button
        onClick={handleToggle}
        aria-label={isOpen ? "Cerrar asistente virtual" : "Abrir asistente virtual"}
        aria-expanded={isOpen}
        className={`
          fixed z-[999] right-4
          /* Encima del botón de WhatsApp (que está a ~80px) */
          bottom-[140px]
          w-14 h-14
          rounded-full shadow-lg
          flex items-center justify-center
          transition-all duration-300
          bg-ibta-primary hover:bg-ibta-dark
        `}
        style={{
          backgroundImage: "url('/logo-clinica.png')",
          backgroundSize: "65%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Fallback si no carga la imagen */}
        <span className="sr-only">BG</span>
      </button>
    </>
  );
}
