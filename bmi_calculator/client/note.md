


// client/src/App.tsx
import React, { useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Header from './components/Header';
import BMIForm from './components/BMIForm';
import BMIResult from './components/BMIResult';
import BMIHistory from './components/BMIHistory';
import { BMIResult as BMIResultType } from './types';
import './App.css';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Publishable Key');
}

const BMIApp: React.FC = () => {
  const [currentResult, setCurrentResult] = useState<BMIResultType | null>(null);
  const [activeTab, setActiveTab] = useState<'calculator' | 'history'>('calculator');

  const handleBMIResult = (result: BMIResultType) => {
    setCurrentResult(result);
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            Calculator
          </button>
          <button 
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
        </div>

        {activeTab === 'calculator' ? (
          <div className="calculator-section">
            <div className="calculator-container">
              <BMIForm onResult={handleBMIResult} />
              {currentResult && <BMIResult result={currentResult} />}
            </div>
          </div>
        ) : (
          <div className="history-section">
            <BMIHistory />
          </div>
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <BMIApp />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

export default App;

// client/src/App.css

// client/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// client/public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="BMI Calculator with user authentication and history tracking"
    />
    <title>BMI Calculator</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>

// client/.env.example
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
REACT_APP_API_URL=http://localhost:5000/api

// Setup Instructions (README.md)
# BMI Calculator - MERN Stack with Clerk Authentication

A full-stack BMI calculator application built with MongoDB, Express.js, React, Node.js, TypeScript, and Clerk authentication.

## Features

- 🔐 User authentication with Clerk
- 📊 BMI calculation with metric and imperial units
- 📈 BMI history tracking
- ✅ Form validation with Yup
- 📱 Responsive design
- 🎯 TypeScript for type safety

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Clerk account for authentication

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update environment variables in `.env`:
   - `MONGODB_URI`: Your MongoDB connection string
   - `CLERK_PUBLISHABLE_KEY`: From Clerk dashboard
   - `CLERK_SECRET_KEY`: From Clerk dashboard
   - `FRONTEND_URL`: Frontend URL (default: http://localhost:3000)

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update environment variables in `.env`:
   - `REACT_APP_CLERK_PUBLISHABLE_KEY`: From Clerk dashboard
   - `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000/api)

5. Start the development server:
   ```bash
   npm start
   ```

### Clerk Setup

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy the publishable key and secret key
4. Configure allowed origins in Clerk dashboard:
   - Add `http://localhost:3000` for development
   - Add your production domain when deploying

## Project Structure

```
bmi-calculator/
├── server/                 # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── validation/     # Yup validation schemas
│   │   └── server.ts       # Entry point
│   ├── package.json
│   └── tsconfig.json
├── client/                 # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── api/            # API service functions
│   │   ├── components/     # React components
│   │   ├── types/          # TypeScript types
│   │   ├── validation/     # Yup validation schemas
│   │   ├── App.tsx         # Main App component
│   │   └── index.tsx       # Entry point
│   ├── package.json
│   └── public/
└── README.md
```

## API Endpoints

- `POST /api/bmi/calculate` - Calculate BMI and save to history
- `GET /api/bmi/history` - Get user's BMI calculation history
- `GET /api/health` - Health check endpoint

## BMI Categories

- **Underweight**: BMI < 18.5
- **Normal weight**: BMI 18.5-24.9 (Healthy range)
- **Overweight**: BMI 25-29.9
- **Obese**: BMI ≥ 30

## Technologies Used

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- TypeScript
- Clerk SDK for authentication
- Yup for validation
- CORS for cross-origin requests

### Frontend
- React 18 with TypeScript
- Clerk React SDK
- Axios for HTTP requests
- Yup for form validation
- CSS3 with responsive design

## Development

- Backend runs on port 5000
- Frontend runs on port 3000
- MongoDB connection required
- All API requests require authentication via Clerk

## Deployment

1. Build the backend:
   ```bash
   cd server && npm run build
   ```

2. Build the frontend:
   ```bash
   cd client && npm run build
   ```

3. Deploy to your preferred hosting service
4. Update Clerk settings with production URLs
5. Set environment variables on your hosting platform