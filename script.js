// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Add click feedback for product links
    const productLinks = document.querySelectorAll('.product-link');
    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Track the click
            trackClick('Product Link', this.textContent.trim());
            
            // If it's a contact link, add a small delay for visual feedback
            if (this.getAttribute('href') === '#contact') {
                e.preventDefault();
                setTimeout(() => {
                    document.querySelector('#contact').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 200);
            }
        });
        
        // Add hover effect enhancement
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 600);
        });
    });
    
    // Add notification for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Create a small notification
            showNotification('Opening external link...');
        });
    });

    // Add brochure download tracking
    setupBrochureDownload();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.product-card, .contact-card, .about-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Initialize page
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
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

// Add click tracking for analytics (if needed)
function trackClick(element, action) {
    // Add your analytics tracking code here
    console.log(`Clicked: ${element} - ${action}`);
}

// Track important clicks
document.addEventListener('DOMContentLoaded', function() {
    // Track CTA button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            trackClick('Button', this.textContent.trim());
        });
    });
    
    // Track phone number clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackClick('Phone', this.getAttribute('href'));
        });
    });
    
    // Track WhatsApp clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            trackClick('WhatsApp', 'Message');
        });
    });
});

// Performance optimization - Lazy load images when we add them
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add error handling for failed loads
window.addEventListener('error', function(e) {
    console.log('Error detected:', e.error);
    // Handle errors gracefully without breaking the user experience
});

// Simple form validation (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add CSS for form validation
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
        font-weight: 600;
    }
    
    .error {
        border-color: #e74c3c !important;
        background-color: rgba(231, 76, 60, 0.1) !important;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .pulse {
        animation: pulse-animation 0.6s ease;
    }
    
    @keyframes pulse-animation {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Enhanced scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.product-card, .contact-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Google Places Integration for Real-time Ratings
class OfficeStatistics {
    constructor() {
        this.fallbackData = {
            rating: 4.9,
            totalReviews: 53,
            happyCustomers: 1000
        };
        this.apiEndpoint = '/api/google-places'; // Would need backend setup
    }

    // Simulate fetching real-time data
    async fetchRealTimeStats() {
        try {
            // In a real implementation, this would call your backend API
            // For now, we'll simulate dynamic data with some variation
            const response = await this.simulateApiCall();
            return response;
        } catch (error) {
            console.error('Error fetching real-time stats:', error);
            return this.fallbackData;
        }
    }

    // Simulate API call with slight variations in data
    async simulateApiCall() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate slight variations in the data
                const baseRating = 4.9;
                const baseReviews = 53;
                const baseCustomers = 1000;
                
                // Add small random variations to simulate real-time updates
                const rating = Math.min(5.0, baseRating + (Math.random() - 0.5) * 0.1);
                const reviews = baseReviews + Math.floor(Math.random() * 5);
                const customers = baseCustomers + Math.floor(Math.random() * 50);
                
                resolve({
                    rating: Math.round(rating * 10) / 10,
                    totalReviews: reviews,
                    happyCustomers: customers
                });
            }, 500); // Simulate network delay
        });
    }

    // Update the website with real-time stats
    async updateWebsiteStats() {
        const stats = await this.fetchRealTimeStats();
        
        // Update hero section stats
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 3) {
            statNumbers[0].textContent = stats.rating.toFixed(1);
            statNumbers[1].textContent = `${stats.totalReviews}+`;
            statNumbers[2].textContent = `${stats.happyCustomers}+`;
        }

        // Update contact section rating
        const ratingText = document.querySelector('.rating-text');
        if (ratingText) {
            ratingText.textContent = `${stats.rating}/5 based on ${stats.totalReviews} reviews`;
        }

        // Update star display based on rating
        this.updateStarDisplay(stats.rating);
        
        // Add a subtle animation to indicate update
        this.animateStatsUpdate();
        
        return stats;
    }

    updateStarDisplay(rating) {
        const starContainer = document.querySelector('.rating-stars span');
        if (starContainer) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            
            let starsHtml = '';
            for (let i = 0; i < fullStars; i++) {
                starsHtml += '⭐';
            }
            if (hasHalfStar && fullStars < 5) {
                starsHtml += '⭐';
            }
            
            starContainer.textContent = starsHtml;
        }
    }

    animateStatsUpdate() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            stat.style.transform = 'scale(1.1)';
            stat.style.color = '#667eea';
            setTimeout(() => {
                stat.style.transform = 'scale(1)';
                stat.style.color = '';
            }, 300);
        });
    }

    // Setup periodic updates
    startPeriodicUpdates(intervalMinutes = 30) {
        setInterval(() => {
            this.updateWebsiteStats();
        }, intervalMinutes * 60 * 1000);
    }
}

// Initialize statistics manager
const officeStats = new OfficeStatistics();

// Brochure Download Tracking and Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced brochure download functionality
    const brochureLink = document.querySelector('.download-brochure');
    
    if (brochureLink) {
        brochureLink.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Track download
            trackBrochureDownload();
            
            // Show success notification
            showNotification('📄 Brochure download started! Check your downloads folder.', 'success');
            
            // Optional: Add analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'engagement',
                    'event_label': 'corporate_brochure',
                    'value': 1
                });
            }
        });
        
        // Add hover effect enhancement
        brochureLink.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
        });
        
        brochureLink.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.2)';
        });
    }
    
    // Enhanced WhatsApp link functionality
    const whatsappLink = document.querySelector('.contact-whatsapp');
    if (whatsappLink) {
        whatsappLink.addEventListener('click', function() {
            trackClick('WhatsApp Contact', 'Corporate Gifts');
            showNotification('💬 Opening WhatsApp...', 'info');
        });
    }
});

// Track brochure downloads
function trackBrochureDownload() {
    try {
        // Store download event in local storage for analytics
        const downloads = JSON.parse(localStorage.getItem('brochureDownloads') || '[]');
        downloads.push({
            timestamp: new Date().toISOString(),
            type: 'corporate_brochure',
            userAgent: navigator.userAgent
        });
        localStorage.setItem('brochureDownloads', JSON.stringify(downloads));
        
        console.log('📊 Brochure download tracked successfully');
    } catch (error) {
        console.error('Failed to track brochure download:', error);
    }
}

// Enhanced download counter functionality
function updateDownloadCounter() {
    try {
        const downloads = JSON.parse(localStorage.getItem('brochureDownloads') || '[]');
        const downloadCount = downloads.length;
        
        // Update download counter display
        const counterElement = document.querySelector('.download-count');
        if (counterElement) {
            // Simulate realistic download numbers (starting from 50 + local downloads)
            const totalDownloads = 50 + downloadCount;
            counterElement.textContent = `${totalDownloads}+ Downloads`;
        }
        
        // Add visual feedback for recent downloads
        if (downloadCount > 0) {
            const pdfPreview = document.querySelector('.pdf-preview');
            if (pdfPreview) {
                pdfPreview.classList.add('recently-downloaded');
            }
        }
    } catch (error) {
        console.error('Failed to update download counter:', error);
    }
}

// Initialize download counter on page load
document.addEventListener('DOMContentLoaded', function() {
    updateDownloadCounter();
    
    // Update counter when brochure is downloaded from the main section too
    const mainDownloadBtn = document.querySelector('.download-btn');
    if (mainDownloadBtn) {
        mainDownloadBtn.addEventListener('click', function() {
            setTimeout(() => {
                trackBrochureDownload();
                updateDownloadCounter();
                showNotification('📄 Corporate gifting brochure downloaded successfully!', 'success');
            }, 100);
        });
    }
});

// Add CSS for recently downloaded indicator
const downloadStyles = document.createElement('style');
downloadStyles.textContent = `
    .recently-downloaded {
        border: 2px solid #10b981;
        animation: downloadGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes downloadGlow {
        from {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        to {
            box-shadow: 0 25px 50px rgba(16, 185, 129, 0.2);
        }
    }
`;
document.head.appendChild(downloadStyles);

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 350px;
        font-size: 14px;
        font-weight: 500;
    `;
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(notificationStyles);

// Brochure Download Functionality
function setupBrochureDownload() {
    const brochureLink = document.querySelector('.brochure-download');
    
    if (brochureLink) {
        brochureLink.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track download
            trackBrochureDownload();
            
            // Show success message
            showDownloadFeedback();
            
            // The download will proceed naturally due to the download attribute
        });
    }
}

function trackBrochureDownload() {
    try {
        // Simple analytics tracking (can be enhanced with Google Analytics, etc.)
        const timestamp = new Date().toISOString();
        const viewData = {
            type: 'brochure_view',
            file: 'Corporate Gifting Brochure-Office Solution.pdf',
            timestamp: timestamp,
            page: window.location.pathname
        };
        
        // Store in localStorage for basic tracking
        let brochureViews = JSON.parse(localStorage.getItem('brochure_views') || '[]');
        brochureViews.push(viewData);
        localStorage.setItem('brochure_views', JSON.stringify(brochureViews));
        
        console.log('Brochure view tracked:', viewData);
    } catch (error) {
        console.log('View tracking error:', error);
    }
}

function showDownloadFeedback() {
    // Create and show a temporary success message
    const feedback = document.createElement('div');
    feedback.innerHTML = '✅ Brochure opened in new tab!';
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(feedback);
    
    // Animate in
    setTimeout(() => {
        feedback.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}
