export default async function handler(req, res) {
  const path = req.url; // path udah bener sekarang
  const backendUrl = "http://yoztampan.xintzy.me:2009" + path;
  console.log("Forwarding to:", backendUrl);

  try {
    let body;
    if (req.method !== "GET" && req.method !== "HEAD") {
      // Baca body stream jadi buffer
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      body = Buffer.concat(chunks);
    }

    const response = await fetch(backendUrl, {
      method: req.method,
      headers: { ...req.headers },
      body: body,
    });

    // Ambil respon dari backend
    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy error", detail: error.message });
  }
}
