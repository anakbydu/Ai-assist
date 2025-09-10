export default async function handler(req, res) {
  // Ganti alamat sesuai backend kamu di VPS
  const backendUrl = "http://yoztampan.xintzy.me:2009" + req.url;

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: { ...req.headers },
      body: req.method !== "GET" ? req.body : undefined,
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).json({ error: "Proxy error", detail: error.message });
  }
}
