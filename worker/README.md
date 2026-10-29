# ZIMSEC Genie AI backend

This folder contains the first Cloudflare Worker backend for the Genie AI assistant. No AI provider key is stored in browser JavaScript.

## Deploy
1. In Cloudflare, create a Worker named `zimsec-genie-ai`.
2. Deploy the contents of `worker.js` (or use Wrangler with this folder and `wrangler.toml`).
3. Configure a Workers AI binding named **AI**. The configured model is `@cf/openai/gpt-oss-120b`; if it is unavailable in your account, choose a currently supported chat model and update the model ID in `worker.js`.
4. Test the endpoint at `https://YOUR-WORKER-URL/api/ask` using a POST JSON body such as `{"question":"Explain fractions simply","subject":"Mathematics","level":"Form 3"}`.
5. Set `GENIE_AI_ENDPOINT` in `js/ai.js` to the deployed URL ending in `/api/ask`, then commit the frontend change.

## Security and limitations
- Never place API keys or Cloudflare account tokens in frontend JavaScript or a public repository.
- Free Workers AI usage is limited and its quotas can change.
- Origin checks and CORS help restrict browser access but are not authentication and do not stop scripted abuse. Add Cloudflare rate limiting or Turnstile and monitor usage before promoting this publicly.
- This initial version supports AI chat only. It does not yet search uploaded books, guarantee current syllabus alignment, save chat history or generate syllabus-based PDF notes.
- Do not send identifiable learner records or sensitive information to the AI.
