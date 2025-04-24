// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 300)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Scroll animations
const animateElements = document.querySelectorAll('.animate');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

animateElements.forEach(element => {
    observer.observe(element);
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing Animation
const typeWriter = (elementId, text, speed) => {
    const element = document.getElementById(elementId);
    let i = 0;
    let isTag = false;
    let currentText = '';
    
    function type() {
        if (i < text.length) {
            // Handle HTML tags
            if (text.charAt(i) === '<') {
                isTag = true;
            }
            
            currentText += text.charAt(i);
            element.innerHTML = currentText;
            
            if (text.charAt(i) === '>') {
                isTag = false;
            }
            
            i++;
            
            // Don't wait when inside a tag
            const delay = isTag ? 0 : speed;
            setTimeout(type, delay);
        } else {
            // Remove the cursor after typing completes
            element.classList.remove('typewriter');
        }
    }
    
    type();
};

// Start typing animation when hero section is in view
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeWriter('typewriter', 'Hi, I\'m <span>Shivaditya Singh</span>', 100);
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('#home');
heroObserver.observe(heroSection);