// Set this to the deployed Cloudflare Worker URL ending in /api/ask.
const GENIE_AI_ENDPOINT = "PASTE_YOUR_CLOUDFLARE_WORKER_URL_HERE/api/ask";
nav();
const questionEl = document.querySelector("#question");
const askBtn = document.querySelector("#ask");
const answerCard = document.querySelector("#answerCard");
const answerEl = document.querySelector("#answer");
const statusEl = document.querySelector("#status");
askBtn.addEventListener("click", askGenie);
document.querySelector("#clear").addEventListener("click", () => {
  questionEl.value = ""; answerEl.textContent = ""; statusEl.textContent = "";
  answerCard.classList.add("hidden"); questionEl.focus();
});
questionEl.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") askGenie();
});
async function askGenie() {
  const question = questionEl.value.trim();
  if (!question) { toast("Type a question first."); questionEl.focus(); return; }
  if (GENIE_AI_ENDPOINT.startsWith("PASTE_")) {
    answerCard.classList.remove("hidden");
    answerEl.textContent = "The AI page is ready, but the secure Cloudflare Worker URL still needs to be added in js/ai.js after the backend is deployed.";
    statusEl.textContent = "Setup required";
    return;
  }
  askBtn.disabled = true; askBtn.textContent = "Thinking…";
  answerCard.classList.remove("hidden"); answerEl.textContent = "Genie is preparing an answer…"; statusEl.textContent = "";
  try {
    const response = await fetch(GENIE_AI_ENDPOINT, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, subject: document.querySelector("#subject").value, level: document.querySelector("#level").value })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "The AI service is temporarily unavailable.");
    answerEl.textContent = data.answer;
    statusEl.textContent = "AI-generated answer. Verify syllabus-specific details before using in class.";
  } catch (error) {
    answerEl.textContent = error.message || "Could not reach Genie. Please try again.";
    statusEl.textContent = "Connection or service error";
  } finally {
    askBtn.disabled = false; askBtn.textContent = "Ask Genie";
  }
}