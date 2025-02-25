# Laravel + React Application

This web application is built with Laravel for the backend and React for the frontend, using TypeScript and Vite.

## 🚀 Tech Stack

### Backend
- Laravel 10.x
- PHP 8.2
- MySQL
- Docker

### Frontend
- React 19
- TypeScript
- Vite 6
- TailwindCSS
- React Hook Form
- Tanstack Table
- Axios
- Docker

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+
- PHP 8.1+
- Composer

## 🛠️ Installation

### Backend Setup
```bash
# Install dependencies
cd backend
composer install

# Run database migrations
php artisan migrate

# Start the development server
php artisan serve

# (Optional) Seed the database with sample data
php artisan db:seed
```

### Frontend Setup
```bash
# Install dependencies
cd frontend
npm install

# Start the development server
npm run dev
```

### Run with Docker

```bash
# Run in both the backend and frontend services
docker compose up --build -d

# Run database migrations
php artisan migrate

# (Optional) Seed the database with sample data
php artisan db:seed
```

