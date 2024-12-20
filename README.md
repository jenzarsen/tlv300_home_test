<h1> TLV300 Home Assignment </h1>

<br>
<h2> Backend </h2>
<br>

## Features

- Domain information lookup
- Contact information lookup
- Rate limiting
- Error handling
- Request validation
- Security middleware
- CORS support

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Environment Variables

Create a `.env` file in the root directory:

EXP_PORT=3000 <br>
API_KEY=[API_KEY] <br>
BASE_URL=[who-is-api-base-url] <br>
ALLOWED_ORIGINS=http://localhost:5000 <br>

## Installation

1. Clone the repository

bash
git clone <repository-url>

2. Install dependencies
   
bash
cd tlv_backend
npm install

3. Start the server

bash
node index.js

## API Endpoints

### Get Domain Information

GET /whoisserver/:domainName/:type

Parameters:
- `domainName`: Valid domain name (e.g., google.com)
- `type`: Either 'domain' or 'contact'

## Security

The application implements several security measures:
- Helmet for HTTP headers security
- CORS configuration
- Rate limiting (100 requests per 15 minutes)
- Input validation
- Error handling

## Error Handling

The service includes comprehensive error handling:
- Validation errors
- Rate limit errors
- API errors
- Not found errors
- Server errors

## Middleware

- `validateRequest`: Validates domain name format and type
- `errorHandler`: Centralized error handling
- `rateLimiter`: Prevents abuse
- `security`: Implements security best practices

## Logging

Winston logger is configured to:
- Log errors to `error.log`
- Log all levels to `combined.log`
- Console logging in development
- Structured JSON logging

<br>

<h2> Frontend </h2>

<br>

## Environment Setup

Create a `.env` file in the root directory:

REACT_APP_BASE_URL=http://localhost:8080
GENERATE_SOURCEMAP=false

## Installation

1. Install dependencies
   
bash
cd tlv_frontend
npm install

2. Start the development server

bash
npm start

The application will start on port 5000 - [http://localhost:5000](http://localhost:5000)

## Available Scripts

- `npm start` - Runs the app in development mode (Port 5000)
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from create-react-app

## Component Documentation

### Common Components

#### Table Component
Reusable table component with:
- Custom headers
- Responsive design
- Array data handling
- Hover effects

#### LoadingSpinner
- Animated loading indicator
- Centered layout
- Customizable colors

#### ErrorMessage
- Error state display
- Consistent styling
- Clear error messaging

### Domain Components

#### DomainLookup
Main component handling:
- Form submission
- Type selection
- API integration
- Error handling
- Loading states

#### DomainInfo & ContactInfo
Display components for:
- Domain information
- Contact details
- Tabular data presentation

## Styling

The application uses CSS Modules for styling with:
- Responsive design
- Hover effects
- Loading animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Code Organization
- Components follow a modular structure
- CSS Modules for scoped styling
- Custom hooks for data fetching
- Utility functions for validation

### Path Aliases
JSConfig is set up with baseUrl "src" for cleaner imports:
