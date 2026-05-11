// Utility functions for the HTML site
const Utils = {
    createElement(tag, className = '', content = '') {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (content !== '') {
            if (typeof content === 'string') {
                el.innerHTML = content;
            } else {
                el.appendChild(content);
            }
        }
        return el;
    },

    showElement(element) {
        if (!element) return;
        element.style.display = '';
    },

    hideElement(element) {
        if (!element) return;
        element.style.display = 'none';
    },

    setContactInfo(contact) {
        const emailEl = document.getElementById('contact-email');
        const phoneEl = document.getElementById('contact-phone');
        const whatsappEl = document.getElementById('contact-whatsapp');
        const emailDisplay = document.getElementById('contact-email-display');
        const phoneDisplay = document.getElementById('contact-phone-display');
        const whatsappDisplay = document.getElementById('contact-whatsapp-display');

        if (emailEl) emailEl.textContent = contact.email;
        if (phoneEl) phoneEl.textContent = contact.phone;
        if (whatsappEl) whatsappEl.textContent = contact.whatsapp;
        if (emailDisplay) emailDisplay.textContent = contact.email;
        if (phoneDisplay) phoneDisplay.textContent = contact.phone;
        if (whatsappDisplay) whatsappDisplay.textContent = contact.whatsapp;
    },

    async fetchConfig() {
        try {
            const response = await fetch('/api/config');
            if (!response.ok) throw new Error('Config fetch failed');
            return await response.json();
        } catch (error) {
            console.warn('Unable to fetch config, using local fallback.', error);
            return window.SUPABASE_CONFIG.contact;
        }
    },

    initCommon() {
        this.setContactInfo(window.SUPABASE_CONFIG.contact);
        this.initHeaderScroll();
        this.initMobileMenu();
        this.initParticles();
    },

    initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    },

    initMobileMenu() {
        const button = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');
        if (button) button.addEventListener('click', this.toggleMobileMenu.bind(this));
        if (mobileNav) {
            mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.addEventListener('click', () => this.closeMobileMenu());
            });
        }
    },

    toggleMobileMenu() {
        const mobileNav = document.getElementById('mobile-nav');
        if (!mobileNav) return;
        mobileNav.classList.toggle('open');
    },

    closeMobileMenu() {
        const mobileNav = document.getElementById('mobile-nav');
        if (!mobileNav) return;
        mobileNav.classList.remove('open');
    },

    initParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        const count = 35;
        for (let i = 0; i < count; i++) {
            const particle = this.createElement('div', 'particle');
            const size = 2 + Math.random() * 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            const left = Math.random() * 100;
            particle.style.left = `${left}%`;
            particle.style.bottom = `${-10 - Math.random() * 40}px`;
            const duration = 10 + Math.random() * 20;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.opacity = `${0.2 + Math.random() * 0.4}`;
            container.appendChild(particle);
        }
    }
};

function toggleMobileMenu() {
    window.Utils?.toggleMobileMenu();
}

window.Utils = Utils;