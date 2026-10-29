// Public URL only. Never place API keys in browser code.
const GENIE_AI_ENDPOINT = "PASTE_YOUR_CLOUDFLARE_WORKER_URL_HERE/api/ask";
nav();
const questionEl = document.querySelector("#question");
const askBtn = document.querySelector("#ask");
const clearBtn = document.querySelector("#clear");
const answerCard = document.querySelector("#answerCard");
const answerEl = document.querySelector("#answer");
const statusEl = document.querySelector("#status");
const pdfBtn = document.querySelector("#downloadPdf");
askBtn.addEventListener("click", askGenie);
clearBtn.addEventListener("click", () => {
  questionEl.value = ""; answerEl.textContent = ""; statusEl.textContent = "";
  answerCard.classList.add("hidden"); pdfBtn.disabled = true; questionEl.focus();
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
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "The AI service is temporarily unavailable.");
    if (!data.answer) throw new Error("The AI service returned an empty answer.");
    answerEl.textContent = data.answer;
    statusEl.textContent = "AI-generated answer. Verify syllabus-specific details before using in class.";
    pdfBtn.disabled = false;
  } catch (error) {
    answerEl.textContent = error.message || "Could not reach Genie. Please try again.";
    statusEl.textContent = "Connection or service error";
  } finally {
    askBtn.disabled = false; askBtn.textContent = "Ask Genie";
  }
}
pdfBtn.addEventListener("click", () => {
  if (!answerEl.textContent || !window.jspdf) return;
  const doc = new window.jspdf.jsPDF({unit:"mm",format:"a4"});
  doc.setFont("helvetica","bold"); doc.setFontSize(16);
  doc.text("ZIMSEC Genie - Teaching Assistant", 15, 18);
  doc.setFont("helvetica","normal"); doc.setFontSize(11);
  const lines = doc.splitTextToSize(answerEl.textContent, 180);
  let y = 28;
  for (const line of lines) {
    if (y > 280) { doc.addPage(); y = 18; }
    doc.text(line, 15, y); y += 5.5;
  }
  doc.save("zimsec-genie-ai-answer.pdf");
});