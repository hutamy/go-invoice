# Go Invoice

A full-stack web application for freelancers and small businesses to generate, manage, and share invoices with ease.

## Features

- User authentication (JWT-based)
- Client management (CRUD)
- Invoice management (CRUD)
- PDF invoice generation
- Public invoice generator (no login required)
- Responsive, modern UI (Next.js + Tailwind CSS)
- API documentation (Swagger/OpenAPI)
- Secure, modular backend (Go + PostgreSQL)

## Tech Stack

- **Frontend:** Vite, React, Tailwind CSS
- **Backend:** Go, Echo, PostgreSQL, GORM
- **PDF Generation:** HTML templates + headless Chrome
- **API Docs:** Swagger/OpenAPI
- **Containerization:** Docker, Docker Compose

## Monorepo Structure

```
go-invoice/
├── backend/   # Go API server
└── frontend/  # Vite web app
```

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Typescript (for frontend dev)
- Go (for backend dev)

### 1. Clone the repository

```bash
git clone https://github.com/hutamy/go-invoice.git
cd go-invoice
```

### 2. Database Setup

1. Install PostgreSQL locally
2. Create a database
3. Copy and edit the environment files:

```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your local database credentials
```

### 3. Run with Docker Compose

```bash
docker compose -f backend/docker-compose-local.yaml up --build
```

### 4. Access the App

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)
- Swagger Docs: [http://localhost:8000/swagger/index.html](http://localhost:8000/swagger/index.html)

## Project Structure

### Backend (`backend/`)

- Go modules, Echo server, GORM models, repository/service/controller layers
- JWT authentication, PDF generation, Swagger docs

### Frontend (`frontend/`)

- Vite app, React components, Tailwind CSS
- Auth context, protected routes, API integration
