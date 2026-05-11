// Contact page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize common functionality
    Utils.initCommon();

    // Load contact information
    loadContactInfo();

    // Initialize contact form
    initContactForm();
});

// Load contact information
async function loadContactInfo() {
    try {
        const contact = window.SUPABASE_CONFIG.contact;

        // Update contact display
        document.getElementById('contact-email-display').textContent = contact.email;
        document.getElementById('contact-phone-display').textContent = contact.phone;
        document.getElementById('contact-whatsapp-display').textContent = contact.whatsapp;

        // Update footer contact info
        document.getElementById('contact-email').textContent = contact.email;
        document.getElementById('contact-phone').textContent = contact.phone;
        document.getElementById('contact-whatsapp').textContent = contact.whatsapp;
    } catch (error) {
        console.error('Error loading contact info:', error);
    }
}

// Initialize contact form
function initContactForm() {
    const form = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Contact request failed');
            }

            const result = await response.json();
            messageDiv.innerHTML = `<div style="color: #FFD700; text-align: center; background: rgba(212, 175, 55, 0.1); padding: 1rem; border-radius: 0.5rem; border: 1px solid #D4AF37;">${result.message || 'Thank you for your message! We\'ll get back to you soon.'}</div>`;
            messageDiv.style.display = 'block';

            form.reset();

        } catch (error) {
            console.error('Error sending message:', error);
            messageDiv.innerHTML = '<div style="color: #B8860B; text-align: center; background: rgba(184, 134, 11, 0.1); padding: 1rem; border-radius: 0.5rem; border: 1px solid #B8860B;">Failed to send message. Please try again.</div>';
            messageDiv.style.display = 'block';
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Hide message after 5 seconds
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    });
}