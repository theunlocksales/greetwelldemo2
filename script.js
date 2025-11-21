// ==================== GREETWELL GROUP - PREMIUM FOOD THEME JAVASCRIPT ====================

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initAOS();
    initSmoothScroll();
    initLucideIcons();
    initBackToTop();
    initContactForm();

    console.log('🌾 GreetWell Group Website Loaded!');
    console.log('📞 Contact: +91 9588479681');
    console.log('✨ Global Partners in Turmeric, Rice & Spices');
});

// ==================== NAVBAR FUNCTIONALITY ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        }
    });

    // Close mobile menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Active nav link on scroll (desktop only)
    if (window.innerWidth >= 1024) {
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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
    }
}

// ==================== AOS ANIMATION INITIALIZATION ====================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==================== LUCIDE ICONS INITIALIZATION ====================
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ==================== BACK TO TOP BUTTON ====================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
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
}

// ==================== CONTACT FORM HANDLING ====================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const company = document.getElementById('company').value.trim();
            const product = document.getElementById('product').value;
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !phone || !product) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Create WhatsApp message
            const whatsappMessage = createWhatsAppMessage(name, email, phone, company, product, message);

            // Open WhatsApp
            const whatsappURL = `https://api.whatsapp.com/send?phone=919588479681&text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');

            // Show success notification
            showNotification('✅ Redirecting to WhatsApp! We\'ll respond within 24 hours.', 'success');

            // Reset form
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }

    // Phone input validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9+]/g, '');
        });
    }
}

function createWhatsAppMessage(name, email, phone, company, product, message) {
    let msg = `*🌾 New Inquiry - GreetWell Group*\n\n`;
    msg += `*Name:* ${name}\n`;
    msg += `*Email:* ${email}\n`;
    msg += `*Phone:* ${phone}\n`;
    if (company) {
        msg += `*Company:* ${company}\n`;
    }
    msg += `*Product Interest:* ${product}\n`;
    if (message) {
        msg += `*Message:* ${message}\n`;
    }
    msg += `\n_Sent from GreetWell Group Website_`;
    return msg;
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };

    const colors = {
        success: 'linear-gradient(135deg, #10B981, #059669)',
        error: 'linear-gradient(135deg, #EF4444, #DC2626)',
        info: 'linear-gradient(135deg, #3B82F6, #2563EB)'
    };

    notification.innerHTML = `${icons[type]} ${message}`;

    const isMobile = window.innerWidth < 768;
    notification.style.cssText = `
        position: fixed;
        top: ${isMobile ? '80px' : '100px'};
        right: ${isMobile ? '15px' : '30px'};
        left: ${isMobile ? '15px' : 'auto'};
        background: ${colors[type]};
        color: white;
        padding: ${isMobile ? '15px 20px' : '20px 35px'};
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideIn 0.5s ease, slideOut 0.5s ease 2.5s;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: ${isMobile ? '0.9rem' : '1rem'};
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== PAGE VISIBILITY API ====================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 Come Back! - GreetWell Group';
    } else {
        document.title = 'GreetWell Group | Global Partners in Turmeric, Rice & Spices';
    }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
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

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== ORIENTATION CHANGE HANDLER ====================
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 300);
});

// ==================== VIEWPORT HEIGHT FIX FOR MOBILE ====================
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', debounce(setVH, 100));

// ==================== PREVENT ZOOM ON INPUT FOCUS (IOS) ====================
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const currentSize = window.getComputedStyle(input).fontSize;
            if (parseFloat(currentSize) < 16) {
                input.style.fontSize = '16px';
            }
        });
    });
}

// ==================== CONSOLE BRANDING ====================
console.log('%c🌾 GREETWELL GROUP', 'color: #2D5F3F; font-size: 32px; font-weight: bold;');
console.log('%cGlobal Partners in Turmeric, Rice & Spices', 'color: #D4A574; font-size: 14px; font-weight: bold;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #2D5F3F;');
console.log('%c📞 Contact: +91 9588479681', 'color: #10B981; font-size: 12px; font-weight: bold;');
console.log('%c📍 Location: Nagpur, Maharashtra', 'color: #6B6B6B; font-size: 12px;');

// ==================== END OF SCRIPT ====================
console.log('✅ GreetWell Group website initialized successfully!');