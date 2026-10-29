export default {
  async fetch(request, env) {
    const allowedOrigins = new Set([
      "https://clickandfind.github.io",
      "http://localhost:8788",
      "http://127.0.0.1:8788"
    ]);
    const origin = request.headers.get("Origin") || "";
    const headers = {
      "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://clickandfind.github.io",
      "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    };
    const json = (data, status) => Response.json(data, {status, headers});
    if (request.method === "OPTIONS") {
      if (origin && !allowedOrigins.has(origin)) return new Response(null, {status:403});
      return new Response(null, {status:204, headers});
    }
    const url = new URL(request.url);
    if (url.pathname === "/api/health" && request.method === "GET") {
      if (origin && !allowedOrigins.has(origin)) return json({error:"Origin not allowed."},403);
      return json({ok:true, configured:Boolean(env.AI), service:"ZIMSEC Genie AI"},200);
    }
    if (url.pathname !== "/api/ask") return json({error:"Not found."},404);
    if (origin && !allowedOrigins.has(origin)) return json({error:"Origin not allowed."},403);
    if (request.method !== "POST") return json({error:"Use POST."},405);
    const length = Number(request.headers.get("Content-Length") || 0);
    if (length > 12000) return json({error:"Request too large. Please shorten your question."},413);
    let body;
    try { body = await request.json(); } catch {
      return json({error:"Please send a valid JSON request."},400);
    }
    const question = typeof body.question === "string" ? body.question.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim().slice(0, 80) : "General teaching";
    const level = typeof body.level === "string" ? body.level.trim().slice(0, 80) : "Not specified";
    if (!question) return json({error:"Type a question first."},400);
    if (question.length > 5000) return json({error:"Please keep each question under 5,000 characters."},413);
    if (!env.AI) return json({error:"The AI service is not configured yet. Please contact the site administrator."},503);

    const systemPrompt = `You are ZIMSEC Genie, a practical teaching assistant for Zimbabwean teachers. Subject: ${subject}. Class/level: ${level}. Explain clearly in simple English and use useful examples, step-by-step reasoning, lesson plans, exercises, revision notes and classroom strategies when appropriate. For calculations, show and check working. Be honest if you cannot verify exact current ZIMSEC syllabus wording. Never invent syllabus codes, textbook page numbers, or official marking rules, and never claim you consulted an uploaded book unless its content was supplied. Ask the teacher to provide the relevant official syllabus extract when exact alignment matters. Remind teachers to verify high-stakes marking and syllabus details. Do not request sensitive personal information about learners. Do not claim to be an official ZIMSEC service.`;
    try {
      const result = await env.AI.run("@cf/openai/gpt-oss-120b", {
        messages: [
          {role:"system", content:systemPrompt},
          {role:"user", content:question}
        ],
        max_tokens:1500
      });
      const answer = result?.choices?.[0]?.message?.content ?? result?.response ?? "";
      if (typeof answer !== "string" || !answer.trim()) return json({error:"The model returned no answer. Please try again."},502);
      return json({answer:answer.trim()},200);
    } catch {
      return json({error:"Genie could not answer right now. The AI service may be temporarily unavailable or its free usage allowance may have been reached."},502);
    }
  }
};