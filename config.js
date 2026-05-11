// Supabase Configuration
const SUPABASE_URL = 'https://lsjkovnycteppudpnrhg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzamtvdm55Y3RlcHB1ZHBuZ2giLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY4NDU4MzQ4MywiZXhwIjoxOTk5OTU5NDgzfQ.YourAnonKeyHere';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Contact information
const CONTACT_INFO = {
    email: 'gumbarnabas@gmail.com',
    phone: '09028147869',
    whatsapp: '2349028147869'
};

// Export for use in other modules
window.SUPABASE_CONFIG = {
    client: supabase,
    contact: CONTACT_INFO
};