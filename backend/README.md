<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Assignment API - Backend Documentation

## Project Overview

This is the backend component of Assignment application, built with Laravel 10. It provides a RESTful API for managing books with features for creating, reading, updating, deleting, and exporting books data in csv and xml formats.

## Architecture

The backend follows a repository and service layer architecture approach with clear separation of concerns:

1. **Controllers**: Handle HTTP requests and responses
2. **Services**: Contain business logic, divided into:
   - Query Services: For data retrieval
   - Mutation Services: For data modification
   - Export Services: For data export functionality
3. **Repositories**: Manage data access and database operations
4. **Data Transfer Objects (DTOs)**: Transfer data between layers
5. **Models**: Represent database entities

### Key Design Principles

- **Separation of Concerns**: Each layer has a single responsibility
- **Service Layer**: For business logic
- **Repository Pattern**: For data access and database operations
- **Interface-based Programming**: Components depend on interfaces, for better code reliability
- **Type Safety**: Strong typing with PHP 8 features for better code reliability
- **Documentation**: DocBlocks with parameter and return types

## Project Structure

```
app/
├── DataTransferObjects/
│   └── .../
│       └── DTO.php
├── Http/
│   ├── Controllers/
│   │   └── Controller.php
│   ├── Requests/
│   │   └── .../
│   └── Resources/
│   │   └── .../ 
│   │       └── Resource.php  
├── Models/
│   └── Model.php
├── Providers/
│   └── AppServiceProvider.php
├── Repositories/
│   ├── Repository.php
│   └── RepositoryInterface.php
└── Services/
    └── .../
        ├── Service.php
        └── ServiceInterface.php
tests/
├── Feature/
│   └── .../
│       ├── FeatureTest.php
│       ├── MutationTest.php
│       └── QueryTest.php
└── Unit/
    └── Services/
        └── ServiceTest.php
database/
├── factories/
│   └── Factory.php
├── migrations/
│   └── Migration.php
└── seeders/
    └── Seeder.php

```

## Coding Guidelines


### 1. Documentation and Type Safety

Document all methods with DocBlocks including parameter and type hints:

```php
/**
 * Update an existing book
 * 
 * @param int $id
 * @param array<string, mixed> $data
 * @return Book|null
 */
public function updateBook(int $id, array $data): ?Book
```

### 2. Data Transfer Objects

Use DTOs for transferring data between layers:

```php
// Creating a DTO from request data
$options = BookQueryOptions::fromArray($request->validated());

// Using the DTO in a service
$books = $this->bookQueryService->getAllBooks($options);
```

It helps maintain type safety and readability of the code.

### 3. Service Layer Pattern

Note: If business logic becomes more complex consider moving to a granular service layer. (e.g. GetBookByIdService, CreateBookService, etc.)

- **Query Services**: Handle data retrieval operations
- **Mutation Services**: Handle data modification operations
- **Export Services**: Handle data export operations

### 4. Repository Pattern

A repository must represent only one model and do not contain business logic.

Repositories abstract data access logic:

```php
// In a service
public function getBookById(int $id): ?Book
{
    return $this->bookRepository->findById($id);
}

// In a repository
public function findById(int $id): ?Book
{
    return Book::find($id);
}
```

## Testing

Testing approach:

- **Unit Tests**: Test individual components in isolation
- **Feature Tests**: Test API endpoints

Tests should be organized by domain:

```
tests/
├── Feature/
│   └── Book/
│       └── BookQueryTest.php
│       └── BookMutationTest.php
│       └── BookExportTest.php
└── Unit/
    ├── Services/
    │   └── Book/
    │       ├── BookExportServiceTest.php
    │       ├── BookMutationServiceTest.php
    └──     └── BookQueryServiceTest.php

```

## Local Development Setup
 
Docker:

1. Navigate to the backend directory: `cd backend`
2. Copy `.env.example` to `.env`
3. Run `docker compose up -build -d` 
4. Run `docker-compose exec backend php artisan migrate`
5. Run `docker-compose exec backend php artisan db:seed`

Without Docker:

1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `composer install`
3. Copy `.env.example` to `.env`
4. Configure your database settings in the `.env` file
5. Run `php artisan key:generate` to create a unique application key
6. Run migrations: `php artisan migrate`
7. Seed the database: `php artisan db:seed`
8. Start the development server: `php artisan serve`

## Contributing

When contributing to the backend, please follow these guidelines:

1. Create a feature branch from `develop`
2. Follow the coding standards described above
3. Write tests for your changes
4. Update documentation as needed
5. Submit a pull request

