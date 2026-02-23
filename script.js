// Blue Bulls Youth Rugby - Premium JavaScript
// Handles all interactions, animations, and premium features

// Page Loading Animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    }
    
    // Initialize all images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});

// Mobile Menu Toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navMenu) {
        navMenu.classList.toggle('active');
        
        // Animate toggle button
        if (menuToggle) {
            menuToggle.style.transform = navMenu.classList.contains('active') 
                ? 'rotate(90deg)' 
                : 'rotate(0deg)';
        }
    }
}

// Back to Top Button
(function() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
})();

// Scroll Reveal Animation
(function() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length > 0) {
        const revealOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });
    }
})();

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form Validation Enhancement
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state to submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual submission)
            setTimeout(() => {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerHTML = '<strong>Success!</strong> Your message has been sent. We\'ll get back to you soon.';
                this.parentNode.insertBefore(successMsg, this);
                
                // Reset form
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.style.opacity = '0';
                    setTimeout(() => successMsg.remove(), 300);
                }, 5000);
            }, 1500);
        }
    });
});

// Add Ripple Effect to Buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 1.2;
        const y = e.clientY - rect.top - size / 1.2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Dropdown Menu Enhancement for Mobile
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.stopPropagation();
            this.classList.toggle('active');
        }
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
});

// Lazy Loading for Images
(function() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
})();

// Add Active State to Current Page in Navigation
(function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = 'var(--blue-bulls-primary)';
            link.style.fontWeight = '600';
        }
    });
})();

// Performance Monitoring
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 100) {
                console.warn('Slow operation detected:', entry.name, entry.duration + 'ms');
            }
        }
    });
    
    try {
        perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (e) {
        // PerformanceObserver not supported
    }
}

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.classList.add('js-enabled');

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    }
    
    // Tab key enhances focus visibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// Console Message (Fun Easter Egg)
console.log(
    '%cBlue Bulls Youth Rugby Association',
    'color: #007DC5; font-size: 24px; font-weight: bold;'
);
console.log(
    '%c🏉 Developing youth rugby excellence',
    'color: #003D82; font-size: 14px;'
);
console.log(
    '%cWebsite built with premium attention to detail',
    'color: #4DA8DA; font-size: 12px; font-style: italic;'
);

// Analytics Ready (placeholder for future implementation)
window.BBYRA = {
    version: '1.0.0',
    initialized: new Date().toISOString(),
    trackEvent: function(category, action, label) {
        // Placeholder for analytics tracking
        console.log('Event:', category, action, label);
    }
};

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}