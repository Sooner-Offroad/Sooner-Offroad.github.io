// ============================================
// MOBILE NAV HAMBURGER
// ============================================
const hamburger = document.getElementById('hamburger');
const navDrawer = document.getElementById('navDrawer');

if (hamburger && navDrawer) {
  hamburger.addEventListener('click', () => {
    navDrawer.classList.toggle('open');
  });

  // Close drawer when a link is clicked
  navDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navDrawer.classList.remove('open');
    });
  });
}

// ============================================
// NAV SHRINK ON SCROLL
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.height = '80px';
    navbar.style.borderBottomColor = 'rgba(132, 22, 23, 0.4)';
  } else {
    navbar.style.height = '90px';
    navbar.style.borderBottomColor = 'rgba(132, 22, 23, 0.4)';
  }
});

// ============================================
// CONTACT FORM — prevent default for now
// Hook up to Formspree when you deploy:
// 1. Go to formspree.io, create a free account
// 2. Create a form, get your endpoint URL
// 3. Replace action="#" in contact.html with your URL
// ============================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const action = contactForm.getAttribute('action');
    if (action === '#') {
      e.preventDefault();
      alert('Form not connected yet. Add your Formspree URL to the action attribute in contact.html.');
    }
  });
}
// ============================================
// SLIDESHOW
// ============================================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slide-dot');
const prevBtn = document.getElementById('slidePrev');
const nextBtn = document.getElementById('slideNext');

let currentSlide = 0;
let slideTimer = null;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');

  // Reset progress bar
  const ss = document.querySelector('.slideshow');
  if (ss) {
    ss.style.animation = 'none';
    ss.offsetHeight; // reflow
    ss.style.animation = '';
  }
}

function startTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 10000);
}

if (slides.length > 0) {
  // Arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      startTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      startTimer();
    });
  }

  // Dot buttons
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      startTimer();
    });
  });

  // Start auto-advance
  startTimer();
}