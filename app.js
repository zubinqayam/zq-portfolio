// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initNavigation();
    initAnimatedCounters();
    initSkillBars();
    initContactForm();
    initModals();
    initNewsletterForm();
    initResumeDownload();
    initScrollAnimations();
    initToast();
    
    // Analytics tracking setup (placeholder)
    initAnalytics();
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navbar on scroll
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Handle home link specifically
            let targetElement;
            if (targetId === '#home') {
                targetElement = document.querySelector('#home');
            } else {
                targetElement = document.querySelector(targetId);
            }
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for sticky navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Handle "Get In Touch" button in hero section
    const getInTouchBtn = document.querySelector('a[href="#contact"]');
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Animated counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.7
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
                
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Skill bar animations
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.5
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 200);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateContactForm(contactForm)) {
            return;
        }
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        try {
            await simulateFormSubmission(new FormData(contactForm));
            
            // Show success message
            showToast('Message sent successfully!', 'success');
            contactForm.reset();
            
        } catch (error) {
            showToast('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const fieldGroup = field.closest('.form-group');
        const errorElement = fieldGroup.querySelector('.field-error');
        
        // Remove existing error
        if (errorElement) {
            errorElement.remove();
        }
        
        field.classList.remove('error');
        
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            showFieldError(field, 'This field is required');
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            field.classList.add('error');
            showFieldError(field, 'Please enter a valid email address');
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    const fieldGroup = field.closest('.form-group');
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--color-error)';
    errorElement.style.fontSize = 'var(--font-size-sm)';
    errorElement.style.marginTop = 'var(--space-4)';
    
    fieldGroup.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function simulateFormSubmission(formData) {
    // Simulate network delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // In a real application, you would send the data to your backend
            console.log('Form data:', Object.fromEntries(formData));
            
            // Simulate success (90% success rate)
            if (Math.random() > 0.1) {
                resolve();
            } else {
                reject(new Error('Simulated error'));
            }
        }, 1500);
    });
}

// Modal functionality
function initModals() {
    // Wait for DOM to be fully loaded
    setTimeout(() => {
        // Privacy Policy Modal
        const privacyModal = document.getElementById('privacyModal');
        const privacyTriggers = [
            document.getElementById('openPrivacy'),
            document.getElementById('openPrivacyFooter')
        ].filter(el => el !== null);
        const privacyClose = document.getElementById('closePrivacy');
        const privacyOverlay = document.getElementById('privacyOverlay');
        
        // Terms Modal
        const termsModal = document.getElementById('termsModal');
        const termsTriggers = [
            document.getElementById('openTerms')
        ].filter(el => el !== null);
        const termsClose = document.getElementById('closeTerms');
        const termsOverlay = document.getElementById('termsOverlay');
        
        console.log('Privacy triggers found:', privacyTriggers.length);
        console.log('Terms triggers found:', termsTriggers.length);
        
        // Privacy modal events
        privacyTriggers.forEach(trigger => {
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('Opening privacy modal');
                    if (privacyModal) {
                        privacyModal.classList.remove('hidden');
                        document.body.style.overflow = 'hidden';
                    }
                });
            }
        });
        
        if (privacyClose) {
            privacyClose.addEventListener('click', () => {
                console.log('Closing privacy modal');
                if (privacyModal) {
                    privacyModal.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });
        }
        
        if (privacyOverlay) {
            privacyOverlay.addEventListener('click', () => {
                if (privacyModal) {
                    privacyModal.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Terms modal events
        termsTriggers.forEach(trigger => {
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('Opening terms modal');
                    if (termsModal) {
                        termsModal.classList.remove('hidden');
                        document.body.style.overflow = 'hidden';
                    }
                });
            }
        });
        
        if (termsClose) {
            termsClose.addEventListener('click', () => {
                console.log('Closing terms modal');
                if (termsModal) {
                    termsModal.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });
        }
        
        if (termsOverlay) {
            termsOverlay.addEventListener('click', () => {
                if (termsModal) {
                    termsModal.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Close modals on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (privacyModal) privacyModal.classList.add('hidden');
                if (termsModal) termsModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }, 100);
}

// Newsletter form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!email || !isValidEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        try {
            // Simulate subscription (replace with actual endpoint)
            await simulateNewsletterSubscription(email);
            
            showToast('Successfully subscribed to newsletter!', 'success');
            newsletterForm.reset();
            
        } catch (error) {
            showToast('Failed to subscribe. Please try again.', 'error');
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

async function simulateNewsletterSubscription(email) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Newsletter subscription:', email);
            resolve();
        }, 1000);
    });
}

// Resume download functionality
function initResumeDownload() {
    const downloadButtons = document.querySelectorAll('#downloadResume, #downloadResumeFooter');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Create a mock PDF download
            const link = document.createElement('a');
            link.href = 'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iagpxCjMgdyAwCkJUCi9GMSAxMiBUZgoxIDAgMCAyNDAzLjQwNzMxCkV0CmQgUSAxIDAgMCAyIDAgMCBjbQovRjEgMTIgVGYKQlQKMzYgNzc0IFRkCihTdWJqZWN0OiBaVUJJTiBRQVlBTSAtIFJFU1VNRSkgVGoKRXQKZCBxIDIgVyAwIDAgMCAyIDAgMCBjbQovRjEgMTIgVGYKQlQKMzYgNzQ0IFRkCihDb3Jwb3JhdGUgQnVzaW5lc3MgRGV2ZWxvcG1lbnQgJiBNYXJrZXRpbmcgRXhlY3V0aXZlKSBUagoKRXQKZQplbmRvYmoKCnhyZWYKdHJhaWxlciA8PC9TaXplIDEvUm9vdCAxIDAgUj4+CiUlRU9G';
            link.download = 'Zubin_Qayam_Resume.pdf';
            link.click();
            
            showToast('Resume download started!', 'success');
            
            // Track download event (placeholder for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'engagement',
                    'event_label': 'resume'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .testimonial-card, .highlight-card, .cert-badge');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(element);
    });
}

// Toast notification system
function initToast() {
    // Toast is initialized and ready to be used by other functions
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('successToast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon');
    
    // Update content based on type
    toastMessage.textContent = message;
    
    if (type === 'success') {
        toastIcon.textContent = '✓';
        toast.style.background = 'var(--color-success)';
    } else if (type === 'error') {
        toastIcon.textContent = '✗';
        toast.style.background = 'var(--color-error)';
    }
    
    // Show toast
    toast.classList.remove('hidden');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Analytics initialization (placeholder)
function initAnalytics() {
    // Google Analytics 4 setup (placeholder)
    // In a real implementation, you would include the GA4 script and configuration
    
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    
    // Placeholder for actual tracking ID
    // gtag('js', new Date());
    // gtag('config', 'GA_MEASUREMENT_ID');
    
    // Track page view
    console.log('Analytics initialized - Page view tracked');
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            console.log(`Scroll depth: ${scrollPercent}%`);
            
            // Track with GA4
            if (typeof gtag !== 'undefined') {
                gtag('event', 'scroll', {
                    'event_category': 'engagement',
                    'event_label': scrollPercent + '%'
                });
            }
        }
    });
}

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Progressive Web App features (basic)
function initPWA() {
    // Check if browser supports service workers
    if ('serviceWorker' in navigator) {
        // Register service worker (would need actual SW file)
        console.log('PWA support detected');
    }
    
    // Add to home screen prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install button or banner (placeholder)
        console.log('PWA install prompt available');
    });
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = Math.round(perfData.loadEventEnd - perfData.loadEventStart);
            
            console.log(`Page load time: ${loadTime}ms`);
            
            // Track with analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    'event_category': 'performance',
                    'value': loadTime
                });
            }
        }, 0);
    });
}

// SEO and accessibility enhancements
function initSEOEnhancements() {
    // Add structured data dynamically if needed
    // Update meta tags based on current section
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updatePageTitle(sectionId);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });
}

function updatePageTitle(sectionId) {
    const titles = {
        'home': 'Zubin Qayam - Corporate Business Development & Marketing Executive',
        'about': 'About Zubin Qayam - Business Development Expert',
        'experience': 'Experience - Zubin Qayam Portfolio',
        'projects': 'Major Projects - Zubin Qayam',
        'skills': 'Skills & Expertise - Zubin Qayam',
        'healthcare': 'Healthcare Content - Zubin Qayam',
        'contact': 'Contact Zubin Qayam - Business Development'
    };
    
    if (titles[sectionId]) {
        document.title = titles[sectionId];
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initPWA();
    initPerformanceMonitoring();
    initSEOEnhancements();
});

// Handle form field focus states for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('.form-control');
    
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
            field.parentElement.classList.remove('focused');
            if (field.value) {
                field.parentElement.classList.add('filled');
            } else {
                field.parentElement.classList.remove('filled');
            }
        });
    });
});

// Keyboard navigation enhancements
document.addEventListener('keydown', (e) => {
    // Tab navigation for modals
    if (e.key === 'Tab') {
        const modal = document.querySelector('.modal:not(.hidden)');
        if (modal) {
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});

// Error handling for images and resources
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.log('Image failed to load:', e.target.src);
        // Handle broken images gracefully
        e.target.style.display = 'none';
    }
});

// Lazy loading for performance (if needed for future images)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}