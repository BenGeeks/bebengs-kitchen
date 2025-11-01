const FORWARD_URL = "https://webhook.site/e34a972a-4781-4cea-9245-b4fa75117754";

export default async function handler(req, res) {
  const { method, url } = req;

  switch (method) {
    // ✅ Facebook GET webhook verification
    case "GET": {
      const searchParams = new URL(url, `http://${req.headers.host}`).searchParams;
      const challenge = searchParams.get("hub.challenge");

      if (challenge) {
        // Return challenge so Facebook can verify the webhook
        return res.status(200).send(challenge);
      }

      return res.status(400).send("Missing challenge");
    }

    // ✅ Facebook POST webhook (actual message events)
    case "POST": {
      try {
        const body = req.body;

        // Forward everything we receive to webhook.site
        await fetch(FORWARD_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body, null, 2),
        });

        return res.status(200).send("ok");
      } catch (err) {
        console.error("Error forwarding webhook:", err);
        return res.status(500).send("Internal error");
      }
    }

    default:
      res.status(405).send("Method Not Allowed");
      break;
  }
}
