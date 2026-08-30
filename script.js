// Gaurav Acharya — Portfolio Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  setupCategoryFiltering();
  setupNavScrollSpy();
  setupProjectBriefForm();
});

// 1. Portfolio Category Filtering Logic
function setupCategoryFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// 2. Active Nav Link Scroll Spy
function setupNavScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// 3. Interactive Project Brief Form Handler
function setupProjectBriefForm() {
  const form = document.getElementById('project-brief-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name').value.trim();
    const email = document.getElementById('client-email').value.trim();
    const projectType = document.getElementById('project-type').value;
    const timeline = document.getElementById('project-timeline').value;
    const brief = document.getElementById('project-brief').value.trim();

    const subject = encodeURIComponent(`Project Inquiry: ${projectType} from ${name}`);
    const body = encodeURIComponent(
      `Hi Gaurav,\n\n` +
      `I am reaching out regarding a new project build.\n\n` +
      `• Client Name: ${name}\n` +
      `• Email: ${email}\n` +
      `• Project Type: ${projectType}\n` +
      `• Target Timeline: ${timeline}\n\n` +
      `Project Details & Objectives:\n${brief}\n\n` +
      `Looking forward to your reply.`
    );

    // Open direct mail client
    window.location.href = `mailto:contact@anomy77.me?subject=${subject}&body=${body}`;

    // Button feedback
    const btn = form.querySelector('button[type="submit"]');
    const origHtml = btn.innerHTML;
    btn.innerHTML = '<span>✓ Opening Mail Composer...</span>';
    setTimeout(() => {
      btn.innerHTML = origHtml;
    }, 2500);
  });
}
