export class SessionMemory {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    const data = (await this.state.storage.get("history")) || [];
    const url = new URL(request.url);

    if (url.pathname === "/get") {
      return Response.json(data);
    }

    if (url.pathname === "/add" && request.method === "POST") {
      const body = await request.json();
      data.push(body);
      await this.state.storage.put("history", data.slice(-5)); // Keep last 5 exchanges
      return new Response("OK");
    }

    return new Response("Not found", { status: 404 });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(
        "🔐 Welcome to cf_ai_certassistant!\nSend POST /chat with {\"message\": \"your question\"}"
      );
    }

    if (url.pathname === "/chat" && request.method === "POST") {
      const { message } = await request.json();

      // Save user message in memory
      const session = env.SESSION.idFromName("global");
      const stub = env.SESSION.get(session);
      await stub.fetch("http://internal/add", {
        method: "POST",
        body: JSON.stringify({ role: "user", content: message }),
      });

      const systemPrompt = `
You are CertAssistant, an SSL/TLS troubleshooting expert.
You help developers fix HTTPS certificate validation issues.
Explain causes and fixes clearly and concisely.`;

      const userPrompt = `User: ${message}`;

      // Run inference using Llama 3.3 model
      const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      });

      const reply = aiResponse.response.trim();

      // Save AI response in memory
      await stub.fetch("http://internal/add", {
        method: "POST",
        body: JSON.stringify({ role: "assistant", content: reply }),
      });

      return Response.json({ reply });
    }

    return new Response("Not found", { status: 404 });
  },
};

