# GoInvoice Frontend

A modern, responsive React + TypeScript frontend for the GoInvoice application. Built with Vite and Tailwind CSS, featuring authentication, client management, and professional invoice generation.

## 🚀 Features

### Public Features

- **Invoice Generation**: Create professional invoices without registration
- **Real-time Preview**: Side-by-side form and invoice preview
- **PDF Download**: Generate and download invoices as PDF files
- **Responsive Design**: Works perfectly on desktop and mobile devices

### Authenticated Features

- **User Authentication**: Secure login and registration system
- **Dashboard**: Overview of invoice activity and statistics
- **Client Management**: Save and manage client information
- **Invoice Management**: Create, edit, and track invoices
- **Email Integration**: Send invoices directly via email
- **User Settings**: Manage account and business information
- **Auto-fill**: Pre-fill business info and select clients from saved list

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **Date Handling**: date-fns

## 📦 Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   # Update the .env file with your backend API URL
   VITE_API_BASE_URL=http://localhost:8000
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173/`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar
│   ├── InvoiceForm.tsx # Invoice creation form
│   └── InvoicePreview.tsx # Invoice preview component
├── pages/              # Page components
│   ├── HomePage.tsx    # Public GoInvoice generator
│   ├── LoginPage.tsx   # User authentication
│   ├── RegisterPage.tsx # User registration
│   ├── DashboardPage.tsx # User dashboard
│   ├── InvoicesPage.tsx # Invoice management
│   ├── ClientsPage.tsx # Client management
│   ├── SettingsPage.tsx # User settings
│   └── CreateInvoicePage.tsx # Invoice creation
├── context/            # React contexts
│   └── AuthContext.tsx # Authentication state
├── utils/              # Utilities
│   └── api.ts          # API service layer
├── types/              # TypeScript type definitions
│   └── index.ts        # Application types
├── hooks/              # Custom React hooks
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 API Integration

The frontend integrates with the backend API for:

- **Authentication**: Login, register, token refresh
- **User Management**: Profile updates, settings
- **Client Management**: CRUD operations for clients
- **Invoice Management**: CRUD operations for invoices
- **PDF Generation**: Public and authenticated invoice generation
- **Email Services**: Send invoices via email

### API Configuration

Configure the backend API URL in the `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## 🔐 Authentication

The application uses JWT-based authentication with:

- **Access Tokens**: Short-lived tokens for API requests
- **Refresh Tokens**: Long-lived tokens for token renewal
- **Automatic Refresh**: Seamless token renewal on expiration
- **Protected Routes**: Authentication required for certain pages

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured experience with side-by-side layout
- **Tablet**: Adapted layout for medium screens
- **Mobile**: Touch-friendly interface with collapsed navigation

## 🎨 Styling

Built with Tailwind CSS featuring:

- **Utility-first CSS**: Rapid development with utility classes
- **Custom Components**: Reusable styled components
- **Consistent Design**: Professional and modern UI

## 🔄 State Management

- **Authentication State**: Managed via React Context
- **Form State**: React Hook Form for complex forms
- **API State**: Axios interceptors for request/response handling
- **Local Storage**: Persistent authentication tokens

## 📄 Key Components

### InvoiceForm

- Dynamic item management
- Client selection integration
- Real-time calculations
- Form validation

### InvoicePreview

- Professional invoice layout
- Real-time data binding
- Print-ready styling
- Business information display

### Authentication

- Secure login/register forms
- Password visibility toggle
- Form validation
- Error handling

## 🚦 Getting Started

1. **Start the backend API** (refer to backend documentation)
2. **Update the API URL** in `.env` file
3. **Run the development server**: `npm run dev`
4. **Open your browser** to `http://localhost:5173/`
5. **Create an account** or use the public GoInvoice generator

## 🐛 Troubleshooting

### Common Issues

**Build Errors**: Ensure all dependencies are installed with `npm install`

**API Connection**: Verify the backend is running and the API URL is correct

**Styling Issues**: Tailwind CSS classes may need to be added to the safelist

**TypeScript Errors**: Run `npm run type-check` to identify type issues

### Development Tips

- Use the browser developer tools to debug API requests
- Check the console for any JavaScript errors
- Ensure the backend API is running before testing authentication features
- Use the network tab to monitor API responses
