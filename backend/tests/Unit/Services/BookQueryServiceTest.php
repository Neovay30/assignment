<?php

namespace Tests\Unit\Services;

use App\DataTransferObjects\Book\BookQueryOptions;
use App\Models\Book;
use App\Services\Book\BookQueryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookQueryServiceTest extends TestCase
{
    use RefreshDatabase;

    private BookQueryService $bookQueryService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->bookQueryService = app(BookQueryService::class);
    }

    public function test_get_all_books_returns_paginated_results(): void
    {
        Book::factory()->count(15)->create();
        $options = new BookQueryOptions(perPage: 10);

        $result = $this->bookQueryService->getAllBooks($options);

        $this->assertEquals(10, $result->count());
        $this->assertEquals(15, $result->total());
        $this->assertEquals(2, $result->lastPage());
    }

    public function test_get_all_books_with_search_filter(): void
    {
        Book::factory()->create(['title' => 'Test Book']);
        Book::factory()->create(['title' => 'Another Book']);
        Book::factory()->create(['author' => 'Test Author']);
        $options = new BookQueryOptions(search: 'Test');

        $result = $this->bookQueryService->getAllBooks($options);

        $this->assertEquals(2, $result->count());
    }
}