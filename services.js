document.addEventListener('DOMContentLoaded', async () => {
    Utils.initCommon();
    await loadServicesPage();
});

async function loadServicesPage() {
    const loadingEl = document.getElementById('loading');
    const gridEl = document.getElementById('services-grid');

    try {
        if (loadingEl) Utils.showElement(loadingEl);
        if (gridEl) Utils.hideElement(gridEl);

        const { data: services, error } = await window.SUPABASE_CONFIG.client
            .from('services')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (gridEl) {
            gridEl.innerHTML = '';
            if (services && services.length > 0) {
                services.forEach((service, index) => {
                    const card = Components.createServiceCard(service, index);
                    gridEl.appendChild(card);
                });
            } else {
                gridEl.innerHTML = '<p style="color: #D3D3D3; padding: 2rem; text-align: center;">No services are available at this time.</p>';
            }
        }

        if (loadingEl) Utils.hideElement(loadingEl);
        if (gridEl) Utils.showElement(gridEl);
        Components.updateCartDisplay();
    } catch (error) {
        console.error('Unable to load services.', error);
        if (loadingEl) Utils.hideElement(loadingEl);
        if (gridEl) {
            Utils.showElement(gridEl);
            gridEl.innerHTML = '<p style="color: #D3D3D3; padding: 2rem; text-align: center;">Failed to load services. Please try again later.</p>';
        }
    }
}