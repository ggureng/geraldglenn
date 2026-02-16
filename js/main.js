/**
 * Professional Website JavaScript
 * Gerald Glenn Galero - IT Professional Portfolio
 */

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    setCurrentYear();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    mobileMenuBtn?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon?.classList.toggle('fa-bars');
        icon?.classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking a link
    navLinkElements.forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('active');
            const icon = mobileMenuBtn?.querySelector('i');
            icon?.classList.remove('fa-times');
            icon?.classList.add('fa-bars');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks?.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
            navLinks?.classList.remove('active');
            const icon = mobileMenuBtn?.querySelector('i');
            icon?.classList.remove('fa-times');
            icon?.classList.add('fa-bars');
        }
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Active navigation on scroll
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollToTopBtn?.classList.add('visible');
        } else {
            scrollToTopBtn?.classList.remove('visible');
        }
    });
    
    scrollToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// ANIMATIONS
// ============================================
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Counter animation
    initCounterAnimation();
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    let countersAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        statsObserver.observe(statsGrid);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                // Add suffix based on target value
                if (target === 95) {
                    counter.textContent = target + '%';
                } else {
                    counter.textContent = target + '+';
                }
            }
        };
        
        updateCounter();
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();
        
        // Validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Message length validation
        if (message.length < 10) {
            showFormMessage('Please enter a message with at least 10 characters.', 'error');
            return;
        }
        
        // Simulate form submission
        // In production, you would send this to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            if (formMessage) {
                formMessage.style.display = 'none';
            }
        }, 5000);
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

// ============================================
// UTILITIES
// ============================================
function setCurrentYear() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// PHOTO UPLOAD (for about.html)
// ============================================
function uploadPhoto() {
    const fileInput = document.getElementById('photo-upload');
    const profilePic = document.getElementById('profile-pic');
    
    if (!fileInput || !profilePic) return;
    
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB.');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            profilePic.src = e.target.result;
            // Store the image in localStorage
            try {
                localStorage.setItem('profilePhoto', e.target.result);
            } catch (error) {
                console.warn('Could not save to localStorage:', error);
            }
        };
        
        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file first.');
    }
}

// ============================================
// LOAD SAVED PROFILE PHOTO (for about.html)
// ============================================
window.addEventListener('load', () => {
    const savedPhoto = localStorage.getItem('profilePhoto');
    const profilePic = document.getElementById('profile-pic');
    
    if (savedPhoto && profilePic) {
        profilePic.src = savedPhoto;
    }
});

// ============================================
// EXPORT FOR GLOBAL USE
// ============================================
window.uploadPhoto = uploadPhoto;
