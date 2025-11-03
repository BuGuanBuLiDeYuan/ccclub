// Subscription page functionality

// Pricing data for monthly and yearly billing
const pricingData = {
    monthly: {
        pro: {
            price: '¥278',
            period: '/月'
        },
        premium: {
            price: '¥1038',
            period: '/月',
            original: '¥1198/月'
        },
        enterprise: {
            price: '¥3598',
            period: '/月'
        }
    },
    yearly: {
        pro: {
            price: '¥2976',
            period: '/年',
            savings: '节省 ¥360'
        },
        premium: {
            price: '¥11136',
            period: '/年',
            original: '¥14376/年',
            savings: '节省 ¥3240'
        },
        enterprise: {
            price: '¥38598',
            period: '/年',
            savings: '节省 ¥4578'
        }
    }
};

// Initialize theme from localStorage or default to dark
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Call theme initialization immediately
initializeTheme();

// Initialize billing toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const pricingCards = document.querySelectorAll('.pricing-card');

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Add animation feedback
            this.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }

    // Handle billing toggle
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get the selected period
            const period = this.getAttribute('data-period');

            // Update pricing display
            updatePricing(period);
        });
    });

    // Add hover effects to pricing cards
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Handle subscribe button clicks
    const subscribeButtons = document.querySelectorAll('.subscribe-btn');
    subscribeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const planCard = this.closest('.pricing-card');
            const planName = planCard.querySelector('.plan-name').textContent;

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Show alert (in production, this would redirect to payment)
            if (planName === 'Basic') {
                alert('开始免费体验 Claude Code！');
            } else {
                alert(`您选择了 ${planName} 方案，即将跳转到支付页面...`);
            }
        });
    });
});

// Update pricing based on selected billing period
function updatePricing(period) {
    const data = pricingData[period];

    // Update Pro plan
    const proCard = document.querySelector('.pro-plan');
    if (proCard && data.pro) {
        const proPriceElement = proCard.querySelector('.price');
        if (proPriceElement) {
            proPriceElement.textContent = data.pro.price;
        }
    }

    // Update Premium plan
    const premiumCard = document.querySelector('.premium-plan');
    if (premiumCard && data.premium) {
        const premiumPriceElement = premiumCard.querySelector('.price');
        const premiumOriginalElement = premiumCard.querySelector('.original-price');

        if (premiumPriceElement) {
            premiumPriceElement.textContent = data.premium.price;
        }

        if (premiumOriginalElement && data.premium.original) {
            premiumOriginalElement.textContent = data.premium.original;
        }
    }

    // Update Enterprise plan
    const enterpriseCard = document.querySelector('.enterprise-plan');
    if (enterpriseCard && data.enterprise) {
        const enterprisePriceElement = enterpriseCard.querySelector('.price');
        if (enterprisePriceElement) {
            enterprisePriceElement.textContent = data.enterprise.price;
        }
    }

    // Add smooth transition effect
    document.querySelectorAll('.price').forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add parallax effect to pricing cards on scroll (optional enhancement)
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.pricing-card');
    const scrollPosition = window.scrollY;

    cards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const cardHeight = card.offsetHeight;
        const windowHeight = window.innerHeight;

        if (scrollPosition > cardTop - windowHeight + cardHeight / 2) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Initialize card animations on load
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.pricing-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Handle responsive behavior
function handleResize() {
    const width = window.innerWidth;
    const pricingGrid = document.querySelector('.pricing-grid');

    if (width < 768 && pricingGrid) {
        pricingGrid.style.gap = '1.5rem';
    } else {
        pricingGrid.style.gap = '2rem';
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call on load
