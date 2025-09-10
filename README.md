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

## Try it out

[Try the Invoice Generator](https://go-invoice-frontend-470727012795.asia-southeast1.run.app/)
