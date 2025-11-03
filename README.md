# 🔐 cf_ai_certassistant

An **AI-powered SSL troubleshooting assistant** that helps developers debug certificate validation issues like HTTP-01 and DNS-01 challenges.  
Built using **Cloudflare Workers AI (Llama 3.1)**, **Durable Objects**, and **Workers**.

---

## 🚀 Features
- 🤖 Uses **Llama 3.1** for reasoning about SSL/TLS errors  
- 💾 Maintains short-term **chat memory** via Durable Objects  
- ⚙️ Simple **/chat** API endpoint for interactive debugging  
- 🌩️ Deployable on **Cloudflare Workers**

---

## 🧱 Architecture
| Component | Technology | Purpose |
|------------|-------------|----------|
| LLM | Llama 3.1 (Workers AI) | Handles SSL/TLS Q&A |
| Workflow | Cloudflare Worker | Routes chat + logic |
| Memory | Durable Object | Stores last 5 chat turns |
| Input | HTTP POST /chat | User questions |

---

## 🧰 Run Locally

```bash
npm install
npx wrangler dev
```

## 🔗 Live Demo: https://cf_ai_certassistant.sujithk1910.workers.dev

