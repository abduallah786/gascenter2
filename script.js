// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const name = event.target.querySelector('input[type="text"]').value;
    const phone = event.target.querySelector('input[type="tel"]').value;
    const service = event.target.querySelector('select').value;
    const message = event.target.querySelector('textarea').value;

    // Show success message
    showNotification('Thank you for your inquiry! We will contact you soon.', 'success');

    // Reset form
    event.target.reset();
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;

    // Set notification style based on type
    if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
    } else if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
    }

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Animate service cards on scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.service-card, .feature-card');

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;

        if (cardTop < window.innerHeight - cardVisible) {
            card.classList.add('animate-fade-in');
        }
    });
}

// Add fade-in animation class
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .service-card, .feature-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.3s ease;
    }
    
    .service-card.animate-fade-in, .feature-card.animate-fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('shadow-xl');
        header.style.backgroundColor = 'rgba(30, 64, 175, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.classList.remove('shadow-xl');
        header.style.backgroundColor = '';
        header.style.backdropFilter = '';
    }
}

// Floating action button visibility
function handleFloatingButton() {
    const floatingButton = document.querySelector('.fixed.bottom-6.right-6 button');
    if (window.scrollY > 300) {
        floatingButton.style.opacity = '1';
        floatingButton.style.transform = 'scale(1)';
    } else {
        floatingButton.style.opacity = '0';
        floatingButton.style.transform = 'scale(0.8)';
    }
}

// Initialize floating button styles
document.addEventListener('DOMContentLoaded', function () {
    const floatingButton = document.querySelector('.fixed.bottom-6.right-6 button');
    floatingButton.style.opacity = '0';
    floatingButton.style.transform = 'scale(0.8)';
    floatingButton.style.transition = 'all 0.3s ease';
});

// Event listeners
window.addEventListener('scroll', () => {
    animateOnScroll();
    handleHeaderScroll();
    handleFloatingButton();
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function () {
    // Initial animation check
    setTimeout(animateOnScroll, 100);

    // Add loading animation to hero section
    const heroSection = document.querySelector('section.bg-gradient-to-br');
    heroSection.style.opacity = '0';
    heroSection.style.transform = 'translateY(20px)';

    setTimeout(() => {
        heroSection.style.transition = 'all 0.8s ease';
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }, 200);
});

// Mobile menu toggle (if needed for future enhancements)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Add click-to-call functionality
document.addEventListener('DOMContentLoaded', function () {
    const phoneElements = document.querySelectorAll('[href^="tel:"]');
    phoneElements.forEach(element => {
        element.addEventListener('click', function () {
            showNotification('Calling Al Madina Gas Center...', 'info');
        });
    });
});

// Add smooth hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function () {
    const interactiveElements = document.querySelectorAll('button, .service-card, .feature-card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            this.style.transform = this.style.transform.includes('scale') ?
                this.style.transform : 'translateY(-2px) scale(1.02)';
        });

        element.addEventListener('mouseleave', function () {
            this.style.transform = this.style.transform.replace('scale(1.02)', '').replace('translateY(-2px)', '');
        });
    });
});

// Add typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Counter animation for statistics (if you want to add stats later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// Add intersection observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', function () {
    const animatableElements = document.querySelectorAll('.service-card, .feature-card');
    animatableElements.forEach(element => {
        observer.observe(element);
    });
});