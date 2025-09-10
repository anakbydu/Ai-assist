import { parse } from "url";

export default async function handler(req, res) {
  // Ambil pathname saja, tanpa query ?path=...
  const parsedUrl = parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/proxy/, "");

  // Backend VPS kamu
  const backendUrl = "http://yoztampan.xintzy.me:2009" + path;
  console.log("Forwarding to:", backendUrl);

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: { ...req.headers },
      body: req.method !== "GET" ? req.body : undefined,
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error", detail: error.message });
  }
}
