# Smart Leads Dashboard

## Features

- JWT Authentication
- RBAC
- CRUD Leads
- Search + Filters
- Pagination
- CSV Export
- Docker Setup

## Tech Stack

Frontend:
- React
- TypeScript
- TailwindCSS

Backend:
- Node.js
- Express
- MongoDB
- TypeScript

## Setup Instructions

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## Docker Setup

docker-compose up

## API Documentation

POST /api/auth/register
POST /api/auth/login
GET /api/leads
POST /api/leads
PUT /api/leads/:id
DELETE /api/leads/:id