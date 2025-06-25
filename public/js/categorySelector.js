// Handle category button clicks
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;

    // ✅ Navigate directly to quiz.html with correct query string
    window.location.href = `quiz.html?category=${category}`;
  });
});

// On homepage load, show scores next to each category if stored
document.addEventListener('DOMContentLoaded', () => {
  const scores = JSON.parse(localStorage.getItem('scores') || '{}');

  document.querySelectorAll('.category-btn').forEach(btn => {
    const cat = btn.dataset.category;
    if (scores[cat] != null) {
      const span = document.createElement('span');
      span.className = 'score-badge';
      span.textContent = `Score: ${scores[cat]}`;
      btn.after(span);
    }
  });
});
