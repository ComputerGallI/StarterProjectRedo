async function askBot() {
  const input = document.getElementById("user-input").value;
  const display = document.getElementById("bot-response");
  display.textContent = "Thinking...";

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });

    const data = await response.json();
    display.textContent = data.reply || "Hmm... couldn't get a response.";
  } catch (error) {
    display.textContent = "There was an error talking to the bot.";
  }
}
