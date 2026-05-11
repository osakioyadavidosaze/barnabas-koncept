# Banabas Koncept - HTML/CSS/JavaScript Version

This is a vanilla HTML, CSS, and JavaScript version of the Banabas Koncept website, converted from Next.js with Supabase database integration. Features a sophisticated black and gold color scheme that conveys luxury and professionalism.

## Features

- **Black & Gold Theme**: Elegant color scheme with gold accents on black backgrounds
- **Responsive Design**: Mobile-first design that works on all devices
- **Supabase Integration**: Real-time database for projects and services
- **Modern UI**: Clean, professional design with smooth animations
- **Contact Forms**: Functional contact forms with email integration
- **Portfolio Gallery**: Dynamic project showcase with modal details
- **Service Catalog**: Interactive service selection with cart functionality
- **WhatsApp Integration**: Direct messaging for inquiries

## Project Structure

```
html-version/
├── index.html              # Homepage
├── portfolio.html          # Portfolio page
├── services.html           # Services page
├── contact.html            # Contact page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── config.js           # Supabase configuration
│   ├── utils.js            # Utility functions
│   ├── components.js       # UI components
│   ├── main.js             # Homepage functionality
│   ├── portfolio.js        # Portfolio page functionality
│   ├── services.js         # Services page functionality
│   └── contact.js          # Contact page functionality
├── server/
│   ├── server.js           # Express.js backend
│   ├── package.json        # Backend dependencies
│   └── .env                # Environment variables
└── public/
    └── images/             # Static assets
```

## Setup Instructions

### 1. Frontend Setup

1. Copy the `html-version` folder to your web server root directory
2. Ensure all files are accessible via web server

### 2. Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd html-version/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env` file and update with your actual values
   - Add your Supabase URL and anon key
   - Configure Gmail credentials for contact forms

4. Start the backend server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

### 3. Database Setup

1. Create a Supabase project at https://supabase.com
2. Run the SQL schema from `lib/schema.sql` in your Supabase SQL editor
3. Update the Supabase credentials in both `js/config.js` and `server/.env`

### 4. Email Configuration

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Update `EMAIL_USER` and `EMAIL_PASS` in `server/.env`

## API Endpoints

The backend provides the following REST API endpoints:

### Projects
- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Fetch a specific project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Services
- `GET /api/services` - Fetch all services
- `POST /api/services` - Create a new service
- `GET /api/services/:id` - Fetch a specific service
- `PUT /api/services/:id` - Update a service
- `DELETE /api/services/:id` - Delete a service

### Other
- `GET /api/config` - Get configuration data
- `POST /api/contact` - Handle contact form submissions
- `GET /health` - Health check endpoint

## Usage

1. **Homepage**: Showcases hero section, services preview, and portfolio preview
2. **Portfolio**: Displays all projects with filtering and detail modals
3. **Services**: Lists all services with cart functionality
4. **Contact**: Contact form with email integration

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Development

### Adding New Projects/Services

Use the API endpoints to add content:

```javascript
// Add a new project
fetch('/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Project',
    description: 'Project description',
    category: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript']
  })
});
```

### Customizing Styles

Edit `css/styles.css` to modify the appearance. The CSS uses modern features like CSS Grid, Flexbox, and CSS animations.

### Adding New Pages

1. Create new HTML file
2. Add corresponding JavaScript file
3. Update navigation in all HTML files
4. Add routing logic if needed

## Deployment

### Frontend
Deploy the HTML/CSS/JS files to any static web hosting service like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Backend
Deploy the Node.js server to:
- Heroku
- DigitalOcean App Platform
- AWS EC2
- Google Cloud Run

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the backend server includes proper CORS headers.

### Database Connection
Verify your Supabase credentials and ensure the database tables exist.

### Email Not Sending
Check Gmail credentials and ensure the App Password is correct.

## License

This project is private and proprietary to Banabas Koncept.