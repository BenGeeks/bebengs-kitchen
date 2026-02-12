const FORWARD_URL = "https://webhook.site/7716c4d9-53f4-41e0-81bf-10793821b98a";

export default async function handler(req, res) {
  const { method, url } = req;

  switch (method) {
    // ✅ WhatsApp GET webhook verification
    case "GET": {
      const searchParams = new URL(url, `http://${req.headers.host}`).searchParams;
      const mode = searchParams.get("hub.mode");
      const token = searchParams.get("hub.verify_token");
      const challenge = searchParams.get("hub.challenge");

      // Put your verify token here
      const VERIFY_TOKEN = "your_verify_token_here";

      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        return res.status(200).send(challenge);
      }

      return res.status(403).send("Verification failed");
    }

    // ✅ WhatsApp POST webhook (message events)
    case "POST": {
      try {
        const body = req.body;

        // Forward everything to webhook.site
        await fetch(FORWARD_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body, null, 2),
        });

        return res.status(200).send("EVENT_RECEIVED");
      } catch (err) {
        console.error("Error forwarding webhook:", err);
        return res.status(500).send("Internal error");
      }
    }

    default:
      return res.status(405).send("Method Not Allowed");
  }
}
