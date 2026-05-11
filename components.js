// UI Components

// UI Components

// Project Card Component
function createProjectCard(project, index = 0) {
    const card = Utils.createElement('div', 'portfolio-card opacity-0');
    card.style.animationDelay = `${index * 150}ms`;

    const imageDiv = Utils.createElement('div', 'portfolio-image');
    const numberDiv = Utils.createElement('div', 'portfolio-number', project.id.toString());
    const categoryDiv = Utils.createElement('div', 'portfolio-category', project.category || 'Web Design');

    imageDiv.appendChild(numberDiv);
    imageDiv.appendChild(categoryDiv);

    const contentDiv = Utils.createElement('div', 'portfolio-content');

    const title = Utils.createElement('h3', 'portfolio-card-title', project.title);
    const description = Utils.createElement('p', 'portfolio-card-description', project.description);

    const tagsDiv = Utils.createElement('div', 'portfolio-tags');
    if (project.tags && Array.isArray(project.tags)) {
        project.tags.forEach(tag => {
            const tagSpan = Utils.createElement('span', 'tag', tag);
            tagsDiv.appendChild(tagSpan);
        });
    }

    const actionsDiv = Utils.createElement('div', 'portfolio-actions');

    const viewBtn = Utils.createElement('button', 'btn', 'View Details');
    viewBtn.onclick = () => openProjectModal(project);

    const whatsappBtn = Utils.createElement('button', 'btn btn-solid', 'Get This');
    whatsappBtn.onclick = () => handleGetThis(project);

    actionsDiv.appendChild(viewBtn);
    actionsDiv.appendChild(whatsappBtn);

    contentDiv.appendChild(title);
    contentDiv.appendChild(description);
    contentDiv.appendChild(tagsDiv);
    contentDiv.appendChild(actionsDiv);

    card.appendChild(imageDiv);
    card.appendChild(contentDiv);

    return card;
}

// Service Card Component
function createServiceCard(service, index = 0) {
    const card = Utils.createElement('div', 'service-card opacity-0');
    card.style.animationDelay = `${index * 150}ms`;

    const iconDiv = Utils.createElement('div', 'service-icon');
    const icon = getServiceIcon(service.icon || service.name.toLowerCase());
    iconDiv.appendChild(icon);

    const title = Utils.createElement('h3', 'service-title', service.name);
    const price = Utils.createElement('div', 'service-price', `₦${service.price?.toLocaleString() || 'Contact for pricing'}`);

    const description = Utils.createElement('p', 'service-description', service.description);

    const featuresList = Utils.createElement('ul', 'service-features');
    if (service.features && Array.isArray(service.features)) {
        service.features.forEach(feature => {
            const featureItem = Utils.createElement('li', 'service-feature', feature);
            featuresList.appendChild(featureItem);
        });
    }

    const addBtn = Utils.createElement('button', 'btn btn-solid', 'Add to Cart');
    addBtn.onclick = () => addToCart(service);

    card.appendChild(iconDiv);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(description);
    card.appendChild(featuresList);
    card.appendChild(addBtn);

    return card;
}

// Get service icon
function getServiceIcon(iconName) {
    const icons = {
        'design': `<svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>`,
        'development': `<svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
        </svg>`,
        'seo': `<svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>`,
        'maintenance': `<svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>`
    };

    const iconKey = iconName.toLowerCase().includes('design') ? 'design' :
                   iconName.toLowerCase().includes('seo') ? 'seo' :
                   iconName.toLowerCase().includes('maintenance') ? 'maintenance' : 'development';

    const iconContainer = Utils.createElement('div', '', icons[iconKey]);
    return iconContainer;
}

// Project Modal
function openProjectModal(project) {
    // Create modal overlay
    const modal = Utils.createElement('div', 'modal-overlay');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 2rem;
        backdrop-filter: blur(5px);
    `;

    const modalContent = Utils.createElement('div', 'modal-content');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
        border-radius: 1rem;
        max-width: 600px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        border: 2px solid #D4AF37;
        box-shadow: 0 20px 40px rgba(212, 175, 55, 0.2);
    `;

    const closeBtn = Utils.createElement('button', 'modal-close');
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => document.body.removeChild(modal);

    const content = `
        <div style="padding: 2rem; color: #F5F5F5;">
            <h2 style="font-size: 2rem; margin-bottom: 1rem; color: #D4AF37; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); font-family: 'Georgia', serif;">${project.title}</h2>
            <p style="color: #D3D3D3; margin-bottom: 1.5rem; line-height: 1.6;">${project.description}</p>
            <div style="margin-bottom: 1.5rem;">
                <strong style="color: #D4AF37;">Category:</strong> <span style="color: #F5F5F5;">${project.category || 'Web Design'}</span>
            </div>
            ${project.tags ? `<div style="margin-bottom: 1.5rem;"><strong style="color: #D4AF37;">Technologies:</strong> <span style="color: #F0E68C;">${project.tags.join(', ')}</span></div>` : ''}
            <button onclick="handleGetThis(${JSON.stringify(project).replace(/"/g, '&quot;')})" class="btn btn-solid" style="margin-top: 1rem;">Get This Project</button>
        </div>
    `;

    modalContent.innerHTML = content;
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);

    // Close modal when clicking outside
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };

    document.body.appendChild(modal);
}

// WhatsApp integration
function handleGetThis(project) {
    const message = encodeURIComponent(
        `Hi! I'm interested in the "${project.title}" template. Please provide more details and pricing information.`
    );
    const whatsappUrl = `https://wa.me/${window.SUPABASE_CONFIG.contact.whatsapp}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Cart functionality
let cart = [];

function addToCart(service) {
    if (!cart.find(item => item.id === service.id)) {
        cart.push(service);
        updateCartDisplay();
        showCartNotification(`${service.name} added to cart!`);
    } else {
        showCartNotification(`${service.name} is already in cart!`);
    }
}

function removeFromCart(serviceId) {
    cart = cart.filter(item => item.id !== serviceId);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartSummary = document.getElementById('cart-summary');
    const cartItems = document.getElementById('cart-items');

    if (cart.length > 0) {
        Utils.showElement(cartSummary);
        cartItems.innerHTML = cart.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid rgba(212, 175, 55, 0.3); background: rgba(212, 175, 55, 0.05); border-radius: 0.5rem; margin-bottom: 0.5rem;">
                <div>
                    <h4 style="color: #D4AF37; margin-bottom: 0.5rem; font-family: 'Georgia', serif;">${item.name}</h4>
                    <p style="color: #FFD700; font-weight: bold;">₦${item.price?.toLocaleString()}</p>
                </div>
                <button onclick="removeFromCart(${item.id})" style="background: #B8860B; color: #000000; border: 2px solid #D4AF37; padding: 0.5rem; border-radius: 0.5rem; cursor: pointer; font-weight: bold; transition: all 0.3s ease;">Remove</button>
            </div>
        `).join('');
    } else {
        Utils.hideElement(cartSummary);
    }
}

function showCartNotification(message) {
    const notification = Utils.createElement('div', 'notification');
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            document.body.removeChild(notification);
        }
    }, 3000);
}

// Export components to window
window.Components = {
    createProjectCard,
    createServiceCard,
    openProjectModal,
    handleGetThis,
    addToCart,
    removeFromCart,
    updateCartDisplay,
    showCartNotification
};