export default async function handler(req, res) {
  // Buat path tanpa "/proxy" di depan
  const path = req.url.replace(/^\/proxy/, "");

  // Alamat backend kamu
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
