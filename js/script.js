// Mobile nav toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navOverlay = document.querySelector('.nav-overlay');

function closeNav() {
  nav?.classList.remove('open');
  menuToggle?.classList.remove('open');
  navOverlay?.classList.remove('show');
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    navOverlay?.classList.toggle('show', isOpen);
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
  navOverlay?.addEventListener('click', closeNav);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });
}

// Shrink header on scroll
const header = document.querySelector('.header');
if (header) {
  const toggleScrolled = () => header.classList.toggle('scrolled', window.scrollY > 40);
  toggleScrolled();
  window.addEventListener('scroll', toggleScrolled, { passive: true });
}

// Back to top button
const backTop = document.querySelector('.back-top');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Project filter (projects.html and homepage featured section)
const filterButtons = document.querySelectorAll('.filter-bar button');
const projectCards = document.querySelectorAll('.project-card');
if (filterButtons.length && projectCards.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// Simple form submit handlers (front-end only demo)
document.querySelectorAll('form[data-enquiry]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Thank you! We will call you shortly.';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      form.reset();
    }, 2800);
  });
});

// Highlight active nav link based on current page
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });
})();

// Scroll-reveal animation for key sections/cards
const revealTargets = document.querySelectorAll(
  '.cat-card, .project-card, .testimonial-card, .team-card, .why-item, .why-img, ' +
  '.about-imgs, .contact-info-card, .contact-form, .stats-grid > div'
);
if ('IntersectionObserver' in window && revealTargets.length) {
  revealTargets.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in-view'));
}
