// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuToggle.setAttribute('aria-expanded', 
            menuToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
        );
    });

    // Close menu when link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Header Shadow on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slideInUp');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.bg-gray-50');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.text-2xl');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text);
                    animateCounter(stat, number);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Form Validation
const emailInput = document.querySelector('input[type="email"]');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value;
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (email && !isValid) {
            emailInput.classList.add('border-red-500');
        } else {
            emailInput.classList.remove('border-red-500');
        }
    });
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.classList.add('animate-fadeIn');
});

// Keyboard Navigation for Mobile Menu
menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        mobileMenu.classList.toggle('hidden');
    }
});