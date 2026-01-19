/**
 * Main JavaScript for the personal website
 * Includes navigation, animations, and shared functionality
 */

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const currentYearSpan = document.getElementById('currentYear');
const fadeElements = document.querySelectorAll('.fade-in');
const staggerElements = document.querySelectorAll('.stagger-delay');

// Initialize the website
function init() {
  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize smooth scrolling for anchor links
  initSmoothScrolling();
  
  // Set active navigation link based on current page
  setActiveNavLink();
}

// Mobile menu functionality
function initMobileMenu() {
  if (!mobileMenuBtn || !navLinks) return;
  
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.setAttribute(
      'aria-expanded', 
      navLinks.classList.contains('active')
    );
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navLinks.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Close mobile menu when window is resized
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Scroll animations using IntersectionObserver
function initScrollAnimations() {
  // Create IntersectionObserver with a threshold
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all fade-in elements
  fadeElements.forEach(element => {
    observer.observe(element);
  });
  
  // Observe all stagger-delay elements
  staggerElements.forEach(element => {
    observer.observe(element);
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just a hash
      if (href === '#') return;
      
      // Check if it's an internal link
      if (href.startsWith('#') && document.querySelector(href)) {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
          // Close mobile menu if open
          if (navLinks) {
            navLinks.classList.remove('active');
          }
          
          // Calculate scroll position with offset for fixed header
          const headerHeight = document.querySelector('.navbar')?.offsetHeight || 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // Remove active class from all links
    link.classList.remove('active');
    
    // Check if this link corresponds to the current page
    if (
      (currentPage === 'index.html' && linkHref === 'index.html') ||
      (currentPage === 'about.html' && linkHref === 'about.html') ||
      (currentPage === 'agenda.html' && linkHref === 'agenda.html') ||
      (currentPage === 'journey.html' && linkHref === 'journey.html') ||
      (currentPage === 'contact.html' && linkHref === 'contact.html')
    ) {
      link.classList.add('active');
    }
  });
}

// Contact form handling
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
      showFormMessage('Please fill in all required fields.', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    // In a real application, you would send the data to a server here
    // For this demo, we'll simulate a successful submission
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    showFormMessage('Thank you for your message. I\'ll get back to you soon!', 'success');
    
    // Reset form
    this.reset();
  });
}

// Show form message
function showFormMessage(message, type) {
  // Remove existing message
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = `form-message ${type}`;
  messageElement.textContent = message;
  messageElement.style.cssText = `
    padding: 0.75rem 1rem;
    margin-top: 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    background-color: ${type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'};
    color: ${type === 'success' ? '#4caf50' : '#f44336'};
    border: 1px solid ${type === 'success' ? '#4caf50' : '#f44336'};
  `;
  
  // Insert after the form
  const contactForm = document.getElementById('contactForm');
  contactForm.appendChild(messageElement);
  
  // Remove message after 5 seconds
  setTimeout(() => {
    if (messageElement.parentNode) {
      messageElement.remove();
    }
  }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Initialize contact form if on contact page
document.addEventListener('DOMContentLoaded', initContactForm);

// Export functions for use in other modules (if needed)
export { init, initMobileMenu, initScrollAnimations, initSmoothScrolling };
