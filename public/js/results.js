(function () {
  const params = new URLSearchParams(location.search);
  const score = +params.get('score');
  const total = +params.get('total');
  const category = params.get('category');
  const container = document.getElementById('results-container');
  const KEY = 'scores';
  const all = JSON.parse(localStorage.getItem(KEY) || '{}');

  // Save best score
  if (!all[category] || score > all[category]) {
    all[category] = score;
    localStorage.setItem(KEY, JSON.stringify(all));
  }

  // Image per category
  const CATEGORY_IMAGES = {
    beaches: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    mountains: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    parks: 'https://images.unsplash.com/photo-1596302203603-a2fd2654b12e?auto=format&fit=crop&w=800&q=80',
    nature: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80'
  };

  // Heading
  const heading = document.createElement('h2');
  if (score > total * 0.65) {
    heading.textContent = `GREAT JOB! YOU KNOW ALL ABOUT ${category.toUpperCase()}`;
  } else {
    heading.textContent = `THAT’S OKAY! LET’S EXPLORE ${category.toUpperCase()} A BIT MORE BEFORE YOU TRY AGAIN!`;
  }
  container.appendChild(heading);

  // Image
  const img = document.createElement('img');
  img.src = CATEGORY_IMAGES[category];
  img.alt = category;
  img.className = 'result-img';
  container.appendChild(img);

  // Buttons
  const actions = document.createElement('div');
  actions.id = 'actions';

  const home = document.createElement('button');
  home.className = 'btn-round';
  home.textContent = 'THINK YOU CAN BEAT OUR OTHER QUIZZES?';
  home.onclick = () => window.location.href = 'index.html';
  actions.appendChild(home);

  const retry = document.createElement('button');
  retry.className = 'btn-round';
  retry.textContent = 'TRY AGAIN';
  retry.onclick = () => {
    delete all[category];
    localStorage.setItem(KEY, JSON.stringify(all));
    window.location.href = `quiz.html?category=${category}`;
  };
  actions.appendChild(retry);

  container.appendChild(actions);
})();
