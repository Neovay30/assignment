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

To run without docker : 

    backend : 

run `composer install` in the backend directory

run `php artisan migrate` in the backend directory

run `php artisan serve` in the backend directory

run `php artisan db:seed` in the backend directory if you want to have some data in the database

frontend : 

run `npm install` in the frontend directory

run `npm run dev` in the frontend directory


## 📦 Project Structure

### Backend

backend/
├── app/
│ ├── Console/
│ ├── Exceptions/
│ ├── Http/
│ ├── Models/
│ ├── Providers/
│ ├── Resources/
│ ├── Services/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
├── tests/
├── vendor/
├── .env
├── docker-compose.yml
└── Dockerfile


### Frontend

frontend/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ ├── services/
│ ├── styles/
│ ├── types/
│ ├── utils/
│ ├── views/
│ ├── App.tsx
│ ├── main.tsx
│ ├── router.ts
│ ├── vite-env.d.ts
│ └── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── docker-compose.yml
└── Dockerfile






