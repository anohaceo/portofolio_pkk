class PterodactylPricing {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.createParticles();
        this.setupScrollAnimations();
        this.initializeAnimations();
    }

    init() {
        this.navbar = document.querySelector('.navbar');
        this.orderModal = document.getElementById('orderModal');
        this.orderForm = document.getElementById('orderForm');
        this.lastScrollY = 0;
        this.currentPlan = null;
        
        // Pterodactyl hosting plans data
        this.plans = {
            basic: {
                name: 'Basic Plan',
                price: '1.000',
                currency: 'Rp',
                period: '/bulan',
                features: [
                    '1GB RAM',
                    '100% CPU', 
                    'Unlimited Bandwidth',
                    'DDoS Protection',
                    '24/7 Support'
                ]
            },
            premium: {
                name: 'Premium Plan',
                price: '10.000', 
                currency: 'Rp',
                period: '/bulan',
                features: [
                    '6GB RAM',
                    '500% CPU',
                    'Unlimited Bandwidth', 
                    'Advanced DDoS Protection',
                    'Full 20 Days Guarantee',
                    'Priority Support',
                ]
            },
            pro: {
                name: 'Pro Plan',
                price: '15.000',
                currency: 'Rp', 
                period: '/bulan',
                features: [
                    'Unlimited RAM',
                    'Unlimited CPU',
                    'Unlimited Bandwidth',
                    'Enterprise DDoS Protection',
                    'Full 20 Days Guarantee',
                    'VIP Support',
                ]
            }
        };
    }

    setupEventListeners() {
        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        this.smoothScrollTo(target);
                    }
                }
                // External links will navigate normally
            });
        });

        // Scroll handling
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Modal event listeners
        if (this.orderModal) {
            // Close modal when clicking outside
            this.orderModal.addEventListener('click', (e) => {
                if (e.target === this.orderModal) {
                    this.closeOrderModal();
                }
            });

            // Close with escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.orderModal.classList.contains('active')) {
                    this.closeOrderModal();
                }
            });
        }

        // Form submission
        if (this.orderForm) {
            this.orderForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleOrderSubmission();
            });
        }

        // Window resize
        window.addEventListener('resize', () => {
            this.createParticles();
        });

        // Card hover effects
        document.querySelectorAll('.pricing-card, .feature-item').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });
        });

        // FAQ click handlers
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                this.toggleFAQ(question);
            });
        });
    }

    createParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;

        // Clear existing particles
        container.innerHTML = '';

        const particleCount = window.innerWidth < 768 ? 30 : 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 1-4px
            const size = Math.random() * 3 + 1;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random horizontal position
            particle.style.left = Math.random() * 100 + '%';
            
            // Random animation delay
            particle.style.animationDelay = Math.random() * 25 + 's';
            
            // Random animation duration
            particle.style.animationDuration = (Math.random() * 10 + 20) + 's';
            
            container.appendChild(particle);
        }
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.pricing-card, .feature-item, .faq-item, .hero-pricing').forEach(element => {
            observer.observe(element);
        });
    }

    initializeAnimations() {
        // Animate hero section
        setTimeout(() => {
            document.querySelector('.hero-pricing')?.classList.add('animate-in');
        }, 200);

        // Stagger pricing cards animation
        setTimeout(() => {
            const pricingCards = document.querySelectorAll('.pricing-card');
            pricingCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 150);
            });
        }, 400);

        // Animate feature items
        setTimeout(() => {
            const featureItems = document.querySelectorAll('.feature-item');
            featureItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, index * 100);
            });
        }, 800);

        // Animate FAQ items
        setTimeout(() => {
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, index * 80);
            });
        }, 1200);
    }

    handleScroll() {
        const currentScrollY = window.pageYOffset;

        // Navbar background change on scroll
        if (this.navbar) {
            if (currentScrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }

        this.lastScrollY = currentScrollY;
    }

    smoothScrollTo(target) {
        const targetPosition = target.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    animateCardHover(card, isHover) {
        if (isHover) {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
        }
    }

    // Modal Functions
    openOrderModal(planType) {
        if (!this.orderModal || !this.plans[planType]) return;

        this.currentPlan = planType;
        const plan = this.plans[planType];
        
        // Set plan details in modal
        const selectedPlanInput = document.getElementById('selectedPlan');
        if (selectedPlanInput) {
            selectedPlanInput.value = `${plan.name} - ${plan.currency} ${plan.price}${plan.period}`;
        }

        // Show modal with animation
        this.orderModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus on first input
        setTimeout(() => {
            const firstInput = document.getElementById('customerName');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    closeOrderModal() {
        if (!this.orderModal) return;

        this.orderModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset form
        if (this.orderForm) {
            this.orderForm.reset();
        }
        
        this.currentPlan = null;
    }

    handleOrderSubmission() {
        // Get form data
        const customerName = document.getElementById('customerName')?.value.trim();
        const customerEmail = document.getElementById('customerEmail')?.value.trim();
        const customerPhone = document.getElementById('customerPhone')?.value.trim();
        const serverName = document.getElementById('serverName')?.value.trim();
        const gameType = document.getElementById('gameType')?.value;
        const additionalNotes = document.getElementById('additionalNotes')?.value.trim();

        // Validation
        if (!customerName || !customerEmail || !customerPhone) {
            this.showNotification('Mohon lengkapi semua field yang wajib diisi (*)', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            this.showNotification('Mohon masukkan alamat email yang valid', 'error');
            return;
        }

        // Phone validation (Indonesian format)
        const phoneRegex = /^(\+?62|0)[0-9]{9,13}$/;
        const cleanPhone = customerPhone.replace(/\s+/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            this.showNotification('Mohon masukkan nomor WhatsApp yang valid', 'error');
            return;
        }

        // Build WhatsApp message
        const plan = this.plans[this.currentPlan];
        let message = `*PESANAN PTERODACTYL HOSTING*\n\n`;
        message += `🦕 *Paket:* ${plan.name}\n`;
        message += `💰 *Harga:* ${plan.currency} ${plan.price}${plan.period}\n\n`;
        message += `👤 *Data Pelanggan:*\n`;
        message += `• Nama: ${customerName}\n`;
        message += `• Email: ${customerEmail}\n`;
        message += `• WhatsApp: ${customerPhone}\n`;
        
        if (serverName) {
            message += `• Nama Server: ${serverName}\n\n`;
        }
       
        message += `📋 *Fitur Paket:*\n`;
        plan.features.forEach(feature => {
            message += `✓ ${feature}\n`;
        });
        
        if (additionalNotes) {
            message += `\n📝 *Catatan Tambahan:*\n${additionalNotes}\n`;
        }
        
        message += `\n🚀 Mohon proses pesanan hosting ini. Terima kasih!`;

        // Create WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = '6282133886418'; // Your WhatsApp number
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Close modal and show success
        this.closeOrderModal();
        this.showNotification('Pesanan berhasil dikirim! Anda akan dialihkan ke WhatsApp.', 'success');
    }

    getGameDisplayName(gameType) {
        const gameTypes = {
            minecraft: 'Minecraft',
            csgo: 'CS:GO',
            rust: 'Rust',
            ark: 'ARK: Survival Evolved',
            gmod: "Garry's Mod",
            other: 'Lainnya'
        };
        return gameTypes[gameType] || 'Tidak dipilih';
    }

    toggleFAQ(questionElement) {
        const faqItem = questionElement.closest('.faq-item');
        const faqAnswer = faqItem.querySelector('.faq-answer');
        const faqToggle = questionElement.querySelector('.faq-toggle');
        const isActive = questionElement.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-question').forEach(q => {
            if (q !== questionElement) {
                q.classList.remove('active');
                q.closest('.faq-item').querySelector('.faq-answer').classList.remove('active');
                q.querySelector('.faq-toggle').textContent = '+';
            }
        });

        // Toggle current item
        if (isActive) {
            questionElement.classList.remove('active');
            faqAnswer.classList.remove('active');
            faqToggle.textContent = '+';
        } else {
            questionElement.classList.add('active');
            faqAnswer.classList.add('active');
            faqToggle.textContent = '×';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icon}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#00d084' : '#007acc'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10001;
            max-width: 350px;
            animation: slideInRight 0.3s ease;
            font-size: 0.9rem;
        `;

        document.body.appendChild(notification);

        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Global functions for HTML onclick events
window.openOrderModal = function(planType) {
    if (window.pterodactylPricingInstance) {
        window.pterodactylPricingInstance.openOrderModal(planType);
    }
};

window.closeOrderModal = function() {
    if (window.pterodactylPricingInstance) {
        window.pterodactylPricingInstance.closeOrderModal();
    }
};

window.toggleFAQ = function(element) {
    if (window.pterodactylPricingInstance) {
        window.pterodactylPricingInstance.toggleFAQ(element);
    }
};

function redirectToWhatsapp(plan) {
    let message = `*PESANAN EDIT FOTO/VIDEO*\n\n`;
    message += `✓ Saya ingin memesan paket: *${plan}*\n\n`;
    message += ` Mohon diproses, terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/6285640476286?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
}

function redirectToDesain(plan) {
    let message = `*PESANAN DESAIN GRAFIS*\n\n`;
    message += `✓  Saya ingin memesan paket: *${plan}*\n\n`;
    message += ` Mohon diproses, terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/6285600554738?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
}
// Add notification animations CSS
const notificationCSS = `
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
    gap: 0.5rem;
}

.notification-icon {
    flex-shrink: 0;
    font-size: 1.2rem;
}
`;

// Inject notification styles
const styleElement = document.createElement('style');
styleElement.textContent = notificationCSS;
document.head.appendChild(styleElement);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.pterodactylPricingInstance = new PterodactylPricing();

});




