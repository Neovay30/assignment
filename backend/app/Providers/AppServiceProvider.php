<?php

namespace App\Providers;

use App\Services\Book\BookQueryService;
use App\Services\Book\BookQueryServiceInterface;
use Illuminate\Support\ServiceProvider;
use App\Repositories\BookRepositoryInterface;
use App\Repositories\BookRepository;
use App\Services\Book\BookMutationService;
use App\Services\Book\BookMutationServiceInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Bind repository
        $this->app->bind(BookRepositoryInterface::class, BookRepository::class);  

        // Bind services
        $this->app->bind(BookQueryServiceInterface::class, BookQueryService::class);
        $this->app->bind(BookMutationServiceInterface::class, BookMutationService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
