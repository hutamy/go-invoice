# Invoice Generator for Freelancers

A self-hosted, developer-friendly backend API for freelancers to manage clients and generate invoices (with PDF export). Built with **Go**, **PostgreSQL**, **Echo**, and **Swagger**.

---

## Features

- **User Authentication** (JWT)
- **Client Management** (CRUD)
- **Invoice Management** (CRUD)
- **PDF Invoice Generation** using HTML templates
- **Swagger/OpenAPI Docs**
- **Public Invoice Generator** (no login, instant PDF generation without data storage)

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/hutamy/go-invoice-backend.git
cd go-invoice
```

### 2. Set up .env

```
cp .env.example .env
# fill in DB, JWT_SECRET
```

### 3. Run with docker compose

```
docker-compose up --build
```

## API Documentation

Visit: `http://localhost:8080/swagger/index.html`

## 💡 Project Structure

```
├── cmd/                  # Main application entrypoint
├── config/               # Configuration files and helpers
├── controllers/          # HTTP handlers
├── docs/                 # Swagger/OpenAPI docs
├── middleware/           # Middleware for JWT
├── models/               # GORM models
├── repositories/         # DB access layer
├── routes/               # HTTP routes
├── services/             # Business logic
├── templates/            # HTML templates for PDF invoices
├── utils/                # Shared utilities and packages
├── scripts/              # Helper scripts (e.g., DB migrations)
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── go.mod
├── go.sum
├── Makefile
└── README.md
```

## How It Works

- **Public Mode**: Anyone can POST invoice data and receive a PDF (no auth required)
- **Authenticated Mode**: Logged-in users can save clients, manage invoices, and view history

## Example Usage

### Sign Up (Register)

```bash
curl --location 'http://localhost:8080/v1/public/auth/sign-up' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "yourpassword",
    "address": "123 Main Street",
    "phone": "1234567890",
    "bank_name": "Bank Name",
    "bank_account_name": "Jane Doe",
    "bank_account_number": "1234567890"
}'
```

### Sign In

```bash
curl --location 'http://localhost:8080/v1/public/auth/sign-in' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "jane@example.com",
    "password": "yourpassword"
}'
```

### Get Current User Profile

```bash
curl --location 'http://localhost:8080/v1/protected/me' \
--header 'Authorization: Bearer <access_token>'
```

### Update User Profile

```bash
curl --location --request PUT 'http://localhost:8080/v1/protected/me/profile' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access_token>' \
--data-raw '{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "address": "456 New Street",
    "phone": "0987654321"
}'
```

### Update User Banking Information

```bash
curl --location --request PUT 'http://localhost:8080/v1/protected/me/banking' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access_token>' \
--data-raw '{
    "bank_name": "New Bank Name",
    "bank_account_name": "Jane Smith",
    "bank_account_number": "9876543210"
}'
```

### Change Password

```bash
curl --location 'http://localhost:8080/v1/protected/me/change-password' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access_token>' \
--data-raw '{
    "old_password": "oldpassword",
    "new_password": "newpassword"
}'
```

### Deactivate Account (Soft Delete)

```bash
curl --location 'http://localhost:8080/v1/protected/me/deactivate' \
--header 'Authorization: Bearer <access_token>'
```

### Refresh Token

```bash
curl --location 'http://localhost:8080/v1/protected/auth/refresh-token' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access_token>' \
--data-raw '{
    "refresh_token": "<refresh_token>"
}'
```

### Create Client

```bash
curl --location 'http://localhost:8080/v1/protected/clients' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access_token>' \
--data-raw '{
    "name": "Client Name",
    "email": "client@example.com",
    "phone": "1234567890",
    "address": "Client Address"
}'
```

### Get All Clients

```bash
curl --location 'http://localhost:8080/v1/protected/clients' \
--header 'Authorization: Bearer <access_token>'
```

### Get Client By ID

```bash
curl --location 'http://localhost:8080/v1/protected/clients/1' \
--header 'Authorization: Bearer <access_token>'
```

### Update Client

```bash
curl --location --request PUT 'http://localhost:8080/v1/protected/clients/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access_token>' \
--data-raw '{
    "name": "Updated Client Name",
    "email": "updated.client@example.com",
    "phone": "0987654321",
    "address": "Updated Client Address"
}'
```

### Delete Client (Soft Delete)

```bash
curl --location --request DELETE 'http://localhost:8080/v1/protected/clients/1' \
--header 'Authorization: Bearer <access_token>'
```

### Get Invoice Summary (Dashboard Stats)

```bash
curl --location 'http://localhost:8080/v1/protected/invoices/summary' \
--header 'Authorization: Bearer <access_token>'
```

### Create Invoice

```bash
curl --location 'http://localhost:8080/v1/protected/invoices' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access_token>' \
--data '{
    "client_id": 1,
    "invoice_number": "INV-001",
    "due_date": "2025-06-30",
    "issue_date": "2025-05-30",
    "notes": "Payment due within 30 days",
    "tax_rate": 10,
    "items": [
        {
            "description": "Web Development Services",
            "quantity": 1,
            "unit_price": 1000
        }
    ]
}'
```

### Create Invoice with Manual Client Info

```bash
curl --location 'http://localhost:8080/v1/protected/invoices' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access_token>' \
--data '{
    "client_name": "Manual Client",
    "client_email": "manual@example.com",
    "client_phone": "+1234567890",
    "client_address": "123 Client Street",
    "invoice_number": "INV-002",
    "due_date": "2025-06-30",
    "issue_date": "2025-05-30",
    "notes": "Payment due within 30 days",
    "tax_rate": 10,
    "items": [
        {
            "description": "Consulting Services",
            "quantity": 8,
            "unit_price": 150
        }
    ]
}'
```

### Get All Invoices

```bash
curl --location 'http://localhost:8080/v1/protected/invoices' \
--header 'Authorization: Bearer <access_token>'
```

### Get Invoice By ID

```bash
curl --location 'http://localhost:8080/v1/protected/invoices/1' \
--header 'Authorization: Bearer <access_token>'
```

### Update Invoice

```bash
curl --location --request PUT 'http://localhost:8080/v1/protected/invoices/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access_token>' \
--data '{
    "client_id": 1,
    "invoice_number": "INV-001-UPDATED",
    "due_date": "2025-07-15",
    "issue_date": "2025-05-30",
    "notes": "Updated payment terms",
    "tax_rate": 8.5,
    "status": "sent",
    "items": [
        {
            "id": 1,
            "description": "Updated Web Development Services",
            "quantity": 1,
            "unit_price": 1200
        }
    ]
}'
```

### Update Invoice Status

```bash
curl --location --request PATCH 'http://localhost:8080/v1/protected/invoices/1/status' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access_token>' \
--data '{
    "status": "paid"
}'
```

### Delete Invoice (Soft Delete)

```bash
curl --location --request DELETE 'http://localhost:8080/v1/protected/invoices/1' \
--header 'Authorization: Bearer <access_token>'
```

### Download Invoice PDF

```bash
curl --location --request POST 'http://localhost:8080/v1/protected/invoices/1/pdf' \
--header 'Authorization: Bearer <access_token>' \
--output invoice.pdf
```

### Generate Public PDF (No Authentication Required)

```bash
curl --location 'http://localhost:8080/v1/public/invoices/generate-pdf' \
--header 'Content-Type: application/json' \
--output public-invoice.pdf \
--data-raw '{
    "invoice_number": "PUB-INV-001",
    "due_date": "2025-06-30",
    "issue_date": "2025-06-01",
    "notes": "Payment due within 30 days",
    "tax_rate": 10,
    "sender": {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "address": "123 Business Street",
        "phone_number": "1234567890",
        "bank_name": "Business Bank",
        "bank_account_name": "Jane Doe",
        "bank_account_number": "1234567890"
    },
    "recipient": {
        "name": "Client Name",
        "email": "client@example.com",
        "phone": "0987654321",
        "address": "456 Client Avenue"
    },
    "items": [
        {
            "description": "Freelance Consulting",
            "quantity": 10,
            "unit_price": 100
        }
    ]
}'
```
