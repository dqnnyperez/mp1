const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const carouselSlides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');
const modalButtons = document.querySelectorAll('.open-modal');
const modalOverlays = document.querySelectorAll('.modal-overlay');
const modalCloses = document.querySelectorAll('.modal-close');

function updateHeaderState() {
  if (!header) {
    return;
  }

  if (window.scrollY > 32) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

function updateActiveNav() {
  if (!header) {
    return;
  }

  const scrollPosition = window.scrollY + 150;
  let currentId = 'home';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollPosition >= sectionTop) {
      currentId = section.id;
    }
  });

  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 20) {
    currentId = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('active', isActive);
  });
}

function showSlide(index) {
  carouselSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === index);
  });
}

let activeSlideIndex = 0;

if (prevButton && nextButton) {
  prevButton.addEventListener('click', () => {
    activeSlideIndex = (activeSlideIndex - 1 + carouselSlides.length) % carouselSlides.length;
    showSlide(activeSlideIndex);
  });

  nextButton.addEventListener('click', () => {
    activeSlideIndex = (activeSlideIndex + 1) % carouselSlides.length;
    showSlide(activeSlideIndex);
  });
}

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.modal);
    if (target) {
      target.classList.add('open');
      target.setAttribute('aria-hidden', 'false');
    }
  });
});

modalCloses.forEach((closeButton) => {
  closeButton.addEventListener('click', () => {
    const overlay = closeButton.closest('.modal-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    }
  });
});

modalOverlays.forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modalOverlays.forEach((overlay) => {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    });
  }
});

window.addEventListener('scroll', () => {
  updateHeaderState();
  updateActiveNav();
});

window.addEventListener('load', () => {
  updateHeaderState();
  updateActiveNav();
  showSlide(activeSlideIndex);
});

