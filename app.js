import { animate, stagger, inView, scroll } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

// ---- Custom Cursor ----
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (dot) { dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px'; }
});
function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  if (ring) { ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px'; }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ---- Spotlight Effect on Cards ----
document.querySelectorAll('.skill-card, .bento-card, .contact-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
    card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height * 100) + '%');
  });
});

// ---- Scroll Progress Bar ----
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  scroll(animate(progressBar, { transform: ['scaleX(0)', 'scaleX(1)'] }));
}

// ---- Navbar: hide on scroll down, show on scroll up ----
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.classList.add('nav-hidden');
  } else {
    navbar.classList.remove('nav-hidden');
  }
  lastScroll = currentScroll;
});

// ---- Active Section Tracking ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');
const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });
sections.forEach(s => observerNav.observe(s));

// ---- Mobile Menu ----
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinksContainer.classList.toggle('open');
});
navLinksContainer?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinksContainer.classList.remove('open');
  });
});

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ---- Typewriter Effect ----
const phrases = [
  'beautiful designs.',
  'engaging websites.',
  'creative solutions.',
  'brand identities.',
  'digital experiences.',
];
const typewriterEl = document.getElementById('typewriterText');
let phraseIdx = 0, charIdx = 0, isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIdx];
  if (!isDeleting) {
    typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, 2000);
      return;
    }
    setTimeout(type, 80);
  } else {
    typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 40);
  }
}
type();

// ---- Motion Animations: Hero ----
const heroElements = document.querySelectorAll('.hero .anim-hidden');
animate(heroElements, { opacity: [0, 1], y: [40, 0] }, { delay: stagger(0.15, { start: 0.3 }), duration: 0.8, easing: [0.16, 1, 0.3, 1] });

// ---- Motion Animations: Sections with inView ----
document.querySelectorAll('.section').forEach(section => {
  const items = section.querySelectorAll('.anim-hidden');
  if (items.length > 0) {
    inView(section, () => {
      animate(items, { opacity: [0, 1], y: [30, 0] }, { delay: stagger(0.1), duration: 0.7, easing: [0.16, 1, 0.3, 1] });
    }, { amount: 0.15 });
  }
});

// ---- Timeline Fill on Scroll ----
const timelineFill = document.getElementById('timelineFill');
const timelineSection = document.getElementById('experience');
if (timelineFill && timelineSection) {
  scroll(
    animate(timelineFill, { transform: ['scaleY(0)', 'scaleY(1)'] }),
    { target: timelineSection, offset: ['start end', 'end start'] }
  );
}
