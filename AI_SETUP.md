# ZIMSEC Genie AI setup

The AI page and backend code are prepared in this branch. The backend calls Cloudflare Workers AI through a server-side binding; no model API key belongs in the public browser code.

## Free usage
Cloudflare Workers AI currently documents a free allocation of 10,000 Neurons per day. This is limited and can change; check the official pricing page:
https://developers.cloudflare.com/workers-ai/platform/pricing/

## Deploy from Cloudflare dashboard
1. Open Cloudflare Dashboard → Workers & Pages.
2. Create a Worker named `zimsec-genie-ai`.
3. Paste the contents of `worker/worker.js` into its code editor and deploy.
4. In the Worker settings, add a Workers AI binding with variable name exactly `AI`. Save and redeploy if prompted.
5. Open your Worker URL plus `/api/health`. It should return JSON including `"ok":true` and `"configured":true`.
6. Edit `js/ai.js` on this branch. Replace `PASTE_YOUR_CLOUDFLARE_WORKER_URL_HERE/api/ask` with your real Worker URL ending in `/api/ask`. Do not add API keys to that file.
7. Merge this branch into `main` when you are ready. GitHub Pages will then publish the frontend.

## Security before public launch
- The Worker checks browser origins, limits question size and returns generic errors. CORS is not authentication and cannot stop all non-browser abuse.
- Configure Cloudflare rate limiting and monitor AI usage before sharing widely.
- Never commit API keys, passwords or Supabase service-role keys.
- Avoid sending student names, identity-linked marks, health details or other sensitive information in prompts.
- Verify syllabus requirements, calculations and marking guidance before using AI output in class.

## Current scope
The assistant accepts text prompts and can export the latest answer to PDF. It does not yet browse the live web, search uploaded textbooks or automatically verify current ZIMSEC syllabus documents. Book upload/search, syllabus-grounded notes, and the marks register (typed, voice and photo entry) remain later milestones.
