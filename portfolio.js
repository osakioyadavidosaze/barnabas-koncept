// Portfolio page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize common functionality
    Utils.initCommon();

    // Load contact information
    loadContactInfo();

    // Load all projects
    loadAllProjects();
});

// Load contact information
async function loadContactInfo() {
    try {
        const contact = window.SUPABASE_CONFIG.contact;

        // Update footer contact info
        document.getElementById('contact-email').textContent = contact.email;
        document.getElementById('contact-phone').textContent = contact.phone;
        document.getElementById('contact-whatsapp').textContent = contact.whatsapp;
    } catch (error) {
        console.error('Error loading contact info:', error);
    }
}

// Load all projects
async function loadAllProjects() {
    const loadingEl = document.getElementById('loading');
    const gridEl = document.getElementById('portfolio-grid');

    try {
        Utils.showElement(loadingEl);
        Utils.hideElement(gridEl);

        const { data: projects, error } = await window.SUPABASE_CONFIG.client
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        Utils.hideElement(loadingEl);
        Utils.showElement(gridEl);

        if (projects && projects.length > 0) {
            projects.forEach((project, index) => {
                const card = Components.createProjectCard(project, index);
                gridEl.appendChild(card);
            });
        } else {
            gridEl.innerHTML = '<p style="text-align: center; padding: 2rem;">No projects available at the moment.</p>';
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        Utils.hideElement(loadingEl);
        Utils.showElement(gridEl);
        gridEl.innerHTML = '<p style="text-align: center; color: #ef4444; padding: 2rem;">Failed to load projects. Please try again later.</p>';
    }
}