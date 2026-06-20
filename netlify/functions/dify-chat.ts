import type { Context } from "@netlify/functions";

const DIFY_API_KEY = process.env.DIFY_API_KEY;
const DIFY_API_URL = "https://api.dify.ai/v1/chat-messages";

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (!DIFY_API_KEY) {
    return new Response(
      JSON.stringify({ error: "DIFY_API_KEY no configurada en el servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();

    const difyRes = await fetch(DIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DIFY_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    // Si es streaming, reenviamos el stream tal cual
    if (body.response_mode === "streaming" && difyRes.body) {
      return new Response(difyRes.body, {
        status: difyRes.status,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Si es modo bloqueante, devolvemos el JSON normal
    const data = await difyRes.json();
    return new Response(JSON.stringify(data), {
      status: difyRes.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Error al conectar con Dify", details: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};