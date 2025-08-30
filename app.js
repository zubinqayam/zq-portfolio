// Professional Portfolio Interactive Features - Enhanced with Blog Integration
// Author: Zubin Qayam Portfolio Application

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializeAnimations();
    initializeMobileMenu();
    initializeBlogFeatures();
});

// Navigation functionality - ENHANCED for Blog Section
function initializeNavigation() {
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links - ENHANCED
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove # symbol
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 10;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
                
                // Update active state immediately
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Handle hero buttons - ENHANCED
    const heroButtons = document.querySelectorAll('.hero__actions a');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 10;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Handle blog CTA buttons
    const blogCtaButtons = document.querySelectorAll('.blog-cta__actions a[href^="#"]');
    blogCtaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 10;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Update navigation on scroll - IMPROVED
    let ticking = false;
    
    function updateNavigation() {
        const scrollPosition = window.scrollY;
        
        // Update navigation background opacity
        if (scrollPosition > 50) {
            nav.style.background = 'rgba(19, 52, 59, 0.95)';
        } else {
            nav.style.background = 'rgba(19, 52, 59, 0.85)';
        }
        
        // Update active navigation link based on scroll position
        let current = '';
        const navHeight = nav.offsetHeight;
        const scrollWithOffset = scrollPosition + navHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollWithOffset >= sectionTop && scrollWithOffset <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        if (current) {
            updateActiveNavLink(current);
        }
        
        ticking = false;
    }
    
    function updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + activeId) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll event listener
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavigation);
            ticking = true;
        }
    });
    
    // Initial call
    setTimeout(updateNavigation, 100);
}

// Blog-specific features
function initializeBlogFeatures() {
    // Add enhanced interactions for blog elements
    const blogPost = document.querySelector('.blog-post--featured');
    const topicTags = document.querySelectorAll('.topic-tag');
    const blogCtaHighlights = document.querySelectorAll('.highlight-item');
    
    // Enhanced blog post hover effects
    if (blogPost) {
        blogPost.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        blogPost.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    }
    
    // Interactive topic tags
    topicTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.background = 'var(--color-primary)';
            this.style.color = 'var(--color-btn-primary-text)';
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.background = 'var(--color-secondary)';
            this.style.color = 'var(--color-text)';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Highlight items animation
    blogCtaHighlights.forEach((item, index) => {
        item.style.animationDelay = `${index * 100}ms`;
        item.classList.add('highlight-animate');
    });
    
    // Track blog link clicks for analytics
    const blogLinks = document.querySelectorAll('a[href*="blogspot.com"]');
    blogLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Blog link clicked:', this.href);
            // Add analytics tracking here if needed
        });
    });
    
    // Add loading states for external blog links
    const externalBlogLinks = document.querySelectorAll('a[href*="blogspot.com"][target="_blank"]');
    externalBlogLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const originalText = this.textContent;
            this.textContent = 'Opening Blog...';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
            }, 2000);
        });
    });
}

// Mobile menu functionality - ENHANCED
function initializeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('nav__menu--open');
            navToggle.classList.toggle('nav__toggle--open');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on navigation links
        const mobileNavLinks = navMenu.querySelectorAll('.nav__link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(() => {
                    closeMobileMenu();
                }, 300); // Small delay to allow scroll to complete
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on window resize if screen becomes larger
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('nav__menu--open');
        navToggle.classList.remove('nav__toggle--open');
        document.body.classList.remove('menu-open');
    }
}

// Scroll-triggered animations using Intersection Observer - ENHANCED
function initializeAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('achievements__grid') ||
                    entry.target.classList.contains('competencies__grid') ||
                    entry.target.classList.contains('certifications__grid')) {
                    
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate-in');
                        }, index * 100);
                    });
                }
                
                // Special animation for blog elements
                if (entry.target.classList.contains('blog__content')) {
                    const blogElements = entry.target.querySelectorAll('.blog__intro, .blog__featured, .blog__cta');
                    blogElements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('animate-in');
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation - ENHANCED with blog elements
    const animatedElements = document.querySelectorAll(`
        .hero__content,
        .summary__content,
        .achievements__grid,
        .experience__timeline,
        .competencies__grid,
        .certifications__grid,
        .blog__content,
        .contact__content,
        .context__content
    `);
    
    animatedElements.forEach(element => {
        element.classList.add('animate-ready');
        observer.observe(element);
    });
    
    // Special observer for blog post elements
    const blogPostObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.2 });
    
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        post.style.transform = 'translateY(20px)';
        post.style.opacity = '0';
        post.style.transition = 'all 0.6s ease-out';
        blogPostObserver.observe(post);
    });
}

// Enhanced scroll effects - UPDATED
function initializeScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        }, 10));
    }
    
    // Add scroll-to-top functionality
    let scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.className = 'scroll-to-top';
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        border-radius: var(--radius-full);
        cursor: pointer;
        font-size: 20px;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        visibility: hidden;
        transition: all var(--duration-normal) var(--ease-standard);
        z-index: 999;
    `;
    
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(scrollTopButton);
    
    // Show/hide scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopButton.style.opacity = '1';
            scrollTopButton.style.visibility = 'visible';
        } else {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.visibility = 'hidden';
        }
    });
    
    // Enhanced badge wall animations
    const badgeLinks = document.querySelectorAll('.badge-link');
    badgeLinks.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 150}ms`;
        badge.classList.add('badge-animate');
    });
}

// Contact form handling - ENHANCED
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error styling on input
                this.classList.remove('form-control--error');
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const company = formData.get('company').trim();
            const message = formData.get('message').trim();
            
            // Validate all fields
            let isValid = true;
            
            if (!name) {
                showFieldError('name', 'Name is required');
                isValid = false;
            }
            
            if (!email) {
                showFieldError('email', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showFieldError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!message) {
                showFieldError('message', 'Message is required');
                isValid = false;
            }
            
            if (!isValid) {
                showNotification('Please correct the errors below.', 'error');
                return;
            }
            
            // Submit form
            submitForm(name, email, company, message);
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field.id, `${field.labels[0].textContent} is required`);
        isValid = false;
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field.id, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (isValid) {
        clearFieldError(field.id);
    }
    
    return isValid;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const existingError = document.getElementById(`${fieldId}-error`);
    
    field.classList.add('form-control--error');
    
    if (existingError) {
        existingError.textContent = message;
    } else {
        const errorElement = document.createElement('span');
        errorElement.id = `${fieldId}-error`;
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--color-error);
            font-size: var(--font-size-xs);
            margin-top: var(--space-4);
            display: block;
        `;
        field.parentNode.appendChild(errorElement);
    }
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    field.classList.remove('form-control--error');
    if (errorElement) {
        errorElement.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm(name, email, company, message) {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}${company ? ' - ' + company : ''}`);
    const body = encodeURIComponent(`Name: ${name}
Email: ${email}${company ? '\nCompany: ' + company : ''}
Message: ${message}

---
Sent via Zubin Qayam's Professional Portfolio`);
    
    const mailtoLink = `mailto:zubin.qayam@outlook.com?subject=${subject}&body=${body}`;
    
    // Simulate processing time
    setTimeout(() => {
        try {
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form
            document.getElementById('contact-form').reset();
            
            // Clear any field errors
            const errorElements = document.querySelectorAll('.field-error');
            errorElements.forEach(error => error.remove());
            
            // Show success message
            showNotification('Thank you for your message! Your email client should now open with the pre-filled message.', 'success');
        } catch (error) {
            showNotification('There was an issue opening your email client. Please contact zubin.qayam@outlook.com directly.', 'error');
        }
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1000);
}

// Notification system - ENHANCED
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">${getNotificationIcon(type)}</span>
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        padding: var(--space-16);
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Set type-specific styles
    if (type === 'success') {
        notification.style.borderLeftColor = 'var(--color-success)';
        notification.style.borderLeftWidth = '4px';
    } else if (type === 'error') {
        notification.style.borderLeftColor = 'var(--color-error)';
        notification.style.borderLeftWidth = '4px';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return '✅';
        case 'error': return '❌';
        case 'warning': return '⚠️';
        default: return 'ℹ️';
    }
}

// Add CSS animations and additional styles - ENHANCED with Blog Features
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
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
        
        .notification__content {
            display: flex;
            align-items: center;
            gap: var(--space-12);
            color: var(--color-text);
        }
        
        .notification__close {
            background: none;
            border: none;
            color: var(--color-text-secondary);
            cursor: pointer;
            font-size: var(--font-size-lg);
            padding: 0;
            margin-left: auto;
            transition: color var(--duration-fast) var(--ease-standard);
        }
        
        .notification__close:hover {
            color: var(--color-text);
        }
        
        .form-control--error {
            border-color: var(--color-error) !important;
            box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1) !important;
        }
        
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate-ready .highlight-card,
        .animate-ready .achievement-card,
        .animate-ready .competency-card,
        .animate-ready .cert-category,
        .animate-ready .blog__intro,
        .animate-ready .blog__featured,
        .animate-ready .blog__cta {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
        }
        
        .animate-in .highlight-card,
        .animate-in .achievement-card,
        .animate-in .competency-card,
        .animate-in .cert-category,
        .animate-in .blog__intro,
        .animate-in .blog__featured,
        .animate-in .blog__cta {
            opacity: 1;
            transform: translateY(0);
        }
        
        .badge-animate {
            animation: fadeInUp 0.6s ease-out both;
        }
        
        .highlight-animate {
            animation: fadeInUp 0.5s ease-out both;
        }
        
        /* Topic tag hover effects */
        .topic-tag {
            transition: all 0.2s ease-out;
        }
        
        /* Blog post enhanced animations */
        .blog-post--featured {
            transition: all 0.3s ease-out;
        }
        
        /* Mobile menu styles */
        .nav__menu--open {
            display: flex !important;
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background: var(--color-surface);
            flex-direction: column;
            padding: var(--space-24);
            border-top: 1px solid var(--color-border);
            box-shadow: var(--shadow-lg);
            animation: slideDown 0.3s ease-out;
            z-index: 1000;
        }
        
        .nav__toggle--open span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav__toggle--open span:nth-child(2) {
            opacity: 0;
        }
        
        .nav__toggle--open span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .menu-open {
            overflow: hidden;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .scroll-to-top:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }
        
        /* Blog-specific animations */
        .blog-post {
            transition: all 0.3s ease-out;
        }
        
        .highlight-item {
            transition: all 0.2s ease-out;
        }
        
        .highlight-item:hover {
            transform: translateX(4px);
        }
        
        @media (max-width: 768px) {
            .nav__menu {
                display: none;
            }
            
            .notification {
                right: 10px !important;
                left: 10px !important;
                max-width: none !important;
            }
            
            .scroll-to-top {
                bottom: 20px !important;
                right: 20px !important;
                width: 45px !important;
                height: 45px !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance monitoring - ENHANCED
function initializePerformanceMonitoring() {
    // Log page load performance
    window.addEventListener('load', function() {
        if (window.performance && performance.getEntriesByType) {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Portfolio Performance Metrics:', {
                    'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                    'Page Load Time': Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                    'Total Load Time': Math.round(perfData.loadEventEnd - perfData.fetchStart)
                });
            }
        }
        
        // Log blog integration status
        const blogSection = document.getElementById('blog');
        if (blogSection) {
            console.log('Blog section successfully integrated');
        }
    });
}

// Initialize dynamic styles and performance monitoring
addDynamicStyles();
initializePerformanceMonitoring();

// Global error handling
window.addEventListener('error', function(event) {
    console.error('Portfolio Error:', event.error);
});

// Enhanced user experience features
function initializeEnhancedFeatures() {
    // Add smooth reveal animation for blog elements on load
    setTimeout(() => {
        const blogElements = document.querySelectorAll('.blog__intro, .blog__featured, .blog__cta');
        blogElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 200}ms`;
            element.classList.add('animate-ready');
        });
    }, 500);
    
    // Initialize blog post reading time estimation
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        const text = post.textContent || post.innerText || '';
        const wordsPerMinute = 200;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        
        // Add reading time indicator if space allows
        const excerpt = post.querySelector('.blog-post__excerpt');
        if (excerpt && readingTime > 0) {
            const readingTimeEl = document.createElement('span');
            readingTimeEl.className = 'reading-time';
            readingTimeEl.textContent = `${readingTime} min read`;
            readingTimeEl.style.cssText = `
                font-size: var(--font-size-xs);
                color: var(--color-text-secondary);
                font-weight: var(--font-weight-medium);
                opacity: 0.8;
                margin-top: var(--space-8);
                display: block;
            `;
            excerpt.appendChild(readingTimeEl);
        }
    });
}

// Initialize enhanced features after DOM is loaded
setTimeout(initializeEnhancedFeatures, 100);

// Initialize on DOM ready
console.log('Zubin Qayam Professional Portfolio with Blog Integration - JavaScript Loaded Successfully');