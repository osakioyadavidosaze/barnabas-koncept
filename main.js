document.addEventListener('DOMContentLoaded', async () => {
    Utils.initCommon();
    await loadHomepagePreviews();
});

async function loadHomepagePreviews() {
    try {
        const servicesTarget = document.getElementById('services-preview');
        const portfolioTarget = document.getElementById('portfolio-preview');
        if (!servicesTarget || !portfolioTarget) return;

        const [{ data: services, error: serviceError }, { data: projects, error: projectError }] = await Promise.all([
            window.SUPABASE_CONFIG.client
                .from('services')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(3),
            window.SUPABASE_CONFIG.client
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(3)
        ]);

        if (serviceError) throw serviceError;
        if (projectError) throw projectError;

        servicesTarget.innerHTML = '';
        projects?.forEach((project, index) => {
            const card = Components.createProjectCard(project, index);
            portfolioTarget.appendChild(card);
        });

        services?.forEach((service, index) => {
            const card = Components.createServiceCard(service, index);
            servicesTarget.appendChild(card);
        });
    } catch (error) {
        console.error('Unable to load homepage previews.', error);
        const servicesTarget = document.getElementById('services-preview');
        const portfolioTarget = document.getElementById('portfolio-preview');
        if (servicesTarget) servicesTarget.innerHTML = '<p style="color: #D3D3D3; padding: 2rem; text-align: center;">Unable to load services preview.</p>';
        if (portfolioTarget) portfolioTarget.innerHTML = '<p style="color: #D3D3D3; padding: 2rem; text-align: center;">Unable to load portfolio preview.</p>';
    }
}