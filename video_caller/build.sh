#!/bin/bash

# Install dependencies for backend
cd backend
npm install

# Install dependencies for frontend and build
cd ../frontend
npm install
npm run build

# Return to project root
cd .. 