// Gaurav Acharya — Brutalist Portfolio Scripts

document.addEventListener('DOMContentLoaded', () => {
  setupRevealAnimations();
});

// Intersection Observer for scroll animations
function setupRevealAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Stop observing once revealed to keep the state
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal-text, .reveal-item');
  revealElements.forEach(el => observer.observe(el));

  // Manually trigger hero elements immediately on load
  setTimeout(() => {
    document.querySelectorAll('.hero-brutalist .reveal-text').forEach(el => {
      el.classList.add('in-view');
    });
  }, 100);
}
