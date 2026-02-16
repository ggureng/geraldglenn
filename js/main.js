/**
 * Main JavaScript – navigation, animations, shared functionality
 */

// DOM elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const currentYearSpan = document.getElementById('currentYear');
const fadeElements = document.querySelectorAll('.fade-in');

// Initialize
function init() {
  setCurrentYear();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScrolling();
  setActiveNavLink();
  initContactForm();
}

// Set current year in footer
function setCurrentYear() {
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
}

// Mobile menu toggle
function initMobileMenu() {
  if (!mobileMenuBtn || !navLinks) return;

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navLinks.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on resize above mobile
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Scroll animations (Intersection Observer)
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      if (href.startsWith('#') && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        const headerHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });

        // Close mobile menu if open
        if (navLinks) navLinks.classList.remove('active');
      }
    });
  });
}

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// Contact form handling (on contact page)
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const msgDiv = document.getElementById('formMessage');

    if (!name || !email || !message) {
      showFormMessage('Please fill in all fields.', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate success
    console.log({ name, email, message });
    showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
    form.reset();
  });
}

function showFormMessage(text, type) {
  const msgDiv = document.getElementById('formMessage');
  msgDiv.textContent = text;
  msgDiv.className = type;
  setTimeout(() => {
    msgDiv.textContent = '';
    msgDiv.className = '';
  }, 5000);
}

// Start everything when DOM is ready
document.addEventListener('DOMContentLoaded', init);
