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
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff"
    };
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (origin && !allowedOrigins.has(origin)) return Response.json({ error: "Origin not allowed." }, { status: 403, headers });
    if (new URL(request.url).pathname !== "/api/ask") return Response.json({ error: "Not found." }, { status: 404, headers });
    if (request.method !== "POST") return Response.json({ error: "Use POST." }, { status: 405, headers });

    let body;
    try { body = await request.json(); } catch {
      return Response.json({ error: "Please send a valid JSON request." }, { status: 400, headers });
    }
    const question = typeof body.question === "string" ? body.question.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim().slice(0, 80) : "General";
    const level = typeof body.level === "string" ? body.level.trim().slice(0, 80) : "ZIMSEC";
    if (!question) return Response.json({ error: "Type a question first." }, { status: 400, headers });
    if (question.length > 5000) return Response.json({ error: "Please keep each question under 5,000 characters." }, { status: 413, headers });
    if (!env.AI) return Response.json({ error: "The AI service is not configured yet. Please contact the site administrator." }, { status: 503, headers });

    const systemPrompt = "You are ZIMSEC Genie, a helpful teaching assistant for Zimbabwean teachers and learners. Explain clearly and simply, with examples and step-by-step reasoning when useful. For syllabus-specific claims, be honest when you cannot verify the exact current ZIMSEC syllabus; never invent syllabus codes or claim you consulted an uploaded book unless its text was supplied. Help create lesson outlines, notes, exercises, marking guides, and classroom strategies. Adapt to the requested subject and level. Protect learners' personal data. Do not claim to be an official ZIMSEC service.";
    try {
      const result = await env.AI.run("@cf/openai/gpt-oss-120b", {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Subject: " + subject + "\nLevel: " + level + "\nTeacher's request:\n" + question }
        ],
        max_tokens: 1800
      });
      const answer = result?.choices?.[0]?.message?.content ?? result?.response ?? "";
      if (!answer) throw new Error("Empty model response");
      return Response.json({ answer, model: "@cf/openai/gpt-oss-120b" }, { status: 200, headers });
    } catch {
      return Response.json({ error: "Genie could not answer right now. Please try again shortly." }, { status: 502, headers });
    }
  }
};