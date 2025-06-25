(async function () {
  const params = new URLSearchParams(location.search);
  const category = params.get('category');
  const container = document.getElementById('quiz-container');
  const tracker = document.getElementById('score-tracker');

  const QUESTIONS = window.QUESTIONS?.[category] || [];
  let currentScore = 0;
  localStorage.setItem(`currentScore_${category}`, 0);
  tracker.textContent = `Score: ${currentScore}`;

  QUESTIONS.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `<p>${i + 1}. ${q.question}</p>`;
    container.appendChild(div);

    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;

      btn.addEventListener('click', () => {
        if (div.querySelector('.alert')) return;

        const mark = document.createElement('div');
        mark.className = opt === q.answer ? 'alert green' : 'alert red';
        mark.textContent = opt === q.answer ? 'Correct!' : 'Incorrect';
        div.appendChild(mark);

        if (opt === q.answer) {
          currentScore++;
          localStorage.setItem(`currentScore_${category}`, currentScore);
          tracker.textContent = `Score: ${currentScore}`;
        }

        div.querySelectorAll('.option-btn').forEach(b => (b.disabled = true));
      });

      div.appendChild(btn);
    });
  });

  const submit = document.createElement('button');
  submit.className = 'btn-round';
  submit.textContent = 'Submit';
  submit.addEventListener('click', () => {
    window.location.href = `results.html?score=${currentScore}&total=${QUESTIONS.length}&category=${category}`;
  });

  container.appendChild(submit);
})();
