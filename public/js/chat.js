// When you click Ask, send user input to backend and show AI reply
async function askBot() {
  const input = document.getElementById("user-input").value;
  const display = document.getElementById("bot-response");
  display.textContent = "Thinking...";

  const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: input })
  });

  const data = await response.json();
  display.textContent = data.reply || "Hmm... couldn't get a response.";
}
