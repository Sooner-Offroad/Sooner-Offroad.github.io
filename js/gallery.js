const catCards = document.querySelectorAll('.gallery-cat-card');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxPlaceholder = document.getElementById('lightboxPlaceholder');
const lightboxPlaceholderText = document.getElementById('lightboxPlaceholderText');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDate = document.getElementById('lightboxDate');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxDots = document.getElementById('lightboxDots');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxCategoryLabel = document.getElementById('lightboxCategoryLabel');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');

let photos = [];
let index = 0;
let timer = null;

catCards.forEach(card => {
  card.addEventListener('click', () => {
    photos = JSON.parse(card.dataset.photos || '[]');
    if (!photos.length) return;
    lightboxCategoryLabel.textContent = card.dataset.category || '';
    index = 0;
    open();
  });
});

function open() {
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  buildDots();
  show(0);
  startTimer();
}

function close() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  clearInterval(timer);
}

function show(i) {
  index = ((i % photos.length) + photos.length) % photos.length;
  const p = photos[index];

  lightboxTitle.textContent = p.title || '';
  lightboxDate.textContent = p.date || '';
  lightboxDesc.textContent = p.desc || '';
  lightboxCounter.textContent = `${index + 1} / ${photos.length}`;

  if (p.src) {
    lightboxImg.src = p.src;
    lightboxImg.alt = p.title || '';
    lightboxImg.style.display = 'block';
    lightboxPlaceholder.style.display = 'none';
  } else {
    lightboxImg.style.display = 'none';
    lightboxPlaceholderText.textContent = p.title || 'Photo Coming Soon';
    lightboxPlaceholder.style.display = 'flex';
  }

  updateDots();
}

function buildDots() {
  lightboxDots.innerHTML = '';
  photos.forEach((_, i) => {
    const d = document.createElement('button');
    d.classList.add('lightbox-dot');
    d.addEventListener('click', () => { show(i); resetTimer(); });
    lightboxDots.appendChild(d);
  });
}

function updateDots() {
  lightboxDots.querySelectorAll('.lightbox-dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => show(index + 1), 10000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

lightboxNext.addEventListener('click', () => { show(index + 1); resetTimer(); });
lightboxPrev.addEventListener('click', () => { show(index - 1); resetTimer(); });
lightboxClose.addEventListener('click', close);
lightboxBackdrop.addEventListener('click', close);

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'ArrowRight') { show(index + 1); resetTimer(); }
  if (e.key === 'ArrowLeft')  { show(index - 1); resetTimer(); }
  if (e.key === 'Escape')     { close(); }
});