import { parse } from "url";

export default async function handler(req, res) {
  // Ambil URL dari request
  const parsedUrl = parse(req.url, true);

  // Hapus prefix "/api" karena backend kamu gak pake /api
  const path = parsedUrl.pathname.replace(/^\/api/, "");

  // Gabung dengan alamat VPS
  const backendUrl = "http://yoztampan.xintzy.me:2009" + path;
  console.log("Forwarding to:", backendUrl);

  try {
    let body;
    if (req.method !== "GET" && req.method !== "HEAD") {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      body = Buffer.concat(chunks);
    }

    const response = await fetch(backendUrl, {
      method: req.method,
      headers: { ...req.headers },
      body,
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error", detail: error.message });
  }
}
