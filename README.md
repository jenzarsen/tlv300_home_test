## TLV300 Home Assignment 

## Backend

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
