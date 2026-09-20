const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 45, 250)}ms`;
  observer.observe(el);
});

window.addEventListener('pointermove', (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const projectData = {
  expense: {
    type: '01 / Mobile application',
    title: 'Budget Expense Tracker',
    description: 'A mobile application for tracking daily income and expenses.',
    notes: 'The CV describes transaction management, expense history and simple analytics. Add your actual technology stack, screenshots, repository and implementation details here.'
  },
  agri: {
    type: '02 / Mobile application',
    title: 'Agricultural Assistance App',
    description: 'An application designed to help farmers with crop information and farming guidance.',
    notes: 'The CV describes product details, a service page and basic farming tips. Add the real technology stack, screenshots, repository and implementation details here.'
  },
  jobs: {
    type: '03 / Mobile application',
    title: 'Job Finder App',
    description: 'A simple job-search application to help users find and filter opportunities.',
    notes: 'The CV describes job listing UI, search functionality and category filtering. Add the real technology stack, screenshots, repository and implementation details here.'
  }
};

const modal = document.querySelector('#projectModal');
const modalTitle = document.querySelector('#modalTitle');
const modalType = document.querySelector('#modalType');
const modalDescription = document.querySelector('#modalDescription');
const modalNotes = document.querySelector('#modalNotes');

function openModal(key) {
  const data = projectData[key];
  if (!data) return;
  modalType.textContent = data.type;
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;
  modalNotes.textContent = data.notes;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.project-open').forEach(button => {
  button.addEventListener('click', () => openModal(button.dataset.project));
});

document.querySelector('.modal-close')?.addEventListener('click', closeModal);
document.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

/* Subtle mouse tilt on project visuals */
document.querySelectorAll('.project').forEach(card => {
  card.addEventListener('pointermove', event => {
    if (window.innerWidth < 900) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${y * -1.2}deg) rotateY(${x * 1.2}deg) translateY(-5px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});
