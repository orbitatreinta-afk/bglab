import type { VercelRequest, VercelResponse } from "@vercel/node";

const DIFY_API_KEY = process.env.DIFY_API_KEY;
const DIFY_API_URL = "https://api.dify.ai/v1/chat-messages";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  if (!DIFY_API_KEY) {
    return res.status(500).json({ error: "DIFY_API_KEY no configurada" });
  }

  try {
    const difyRes = await fetch(DIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DIFY_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    // Streaming
    if (req.body?.response_mode === "streaming" && difyRes.body) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const reader = difyRes.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(decoder.decode(value, { stream: true }));
      }
      return res.end();
    }

    // Bloqueante
    const data = await difyRes.json();
    return res.status(difyRes.status).json(data);

  } catch (err) {
    return res.status(500).json({
      error: "Error al conectar con Dify",
      details: String(err),
    });
  }
}