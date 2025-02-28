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
        Book::factory()->withTitle('Test Book')->create();
        Book::factory()->withTitle('Another Book')->create();
        Book::factory()->withAuthor('Test Author')->create();
        $options = new BookQueryOptions(search: 'Test');

        $result = $this->bookQueryService->getAllBooks($options);

        $this->assertEquals(2, $result->count());
    }

    public function test_get_all_books_with_custom_page(): void
    {
        // Create 25 books, second page must have 10 books
        Book::factory()->count(25)->create();
        $options = new BookQueryOptions(page: 2, perPage: 10);

        $result = $this->bookQueryService->getAllBooks($options);

        $this->assertEquals(10, $result->count());
        $this->assertEquals(25, $result->total());
        $this->assertEquals(2, $result->currentPage());
    }

    public function test_get_all_books_with_sort_by_title_asc(): void
    {
        // Create books in non-alphabetical order, should be sorted by title asc
        Book::factory()->withTitle('Z Book')->create();
        Book::factory()->withTitle('A Book')->create();
        Book::factory()->withTitle('M Book')->create();
        
        $options = new BookQueryOptions(sortBy: 'title', sortDirection: 'asc');

        $result = $this->bookQueryService->getAllBooks($options);
        
        $titles = $result->pluck('title')->toArray();
        $this->assertEquals(['A Book', 'M Book', 'Z Book'], $titles);
    }

    public function test_get_all_books_with_sort_by_title_desc(): void
    {
        // Create books in non-alphabetical order, should be sorted by title desc
        Book::factory()->withTitle('Z Book')->create();
        Book::factory()->withTitle('A Book')->create();
        Book::factory()->withTitle('M Book')->create();
        
        $options = new BookQueryOptions(sortBy: 'title', sortDirection: 'desc');

        $result = $this->bookQueryService->getAllBooks($options);
        
        $titles = $result->pluck('title')->toArray();
        $this->assertEquals(['Z Book', 'M Book', 'A Book'], $titles);
    }

    public function test_get_all_books_with_sort_by_author(): void
    {
        Book::factory()->withTitle('Book 1')->withAuthor('Z Author')->create();
        Book::factory()->withTitle('Book 2')->withAuthor('A Author')->create();
        Book::factory()->withTitle('Book 3')->withAuthor('M Author')->create();
        
        $options = new BookQueryOptions(sortBy: 'author', sortDirection: 'asc');

        $result = $this->bookQueryService->getAllBooks($options);
        
        $authors = $result->pluck('author')->toArray();
        $this->assertEquals(['A Author', 'M Author', 'Z Author'], $authors);
    }

    public function test_get_all_books_with_combined_options(): void
    {
        Book::factory()->withTitle('PHP Book 1')->withAuthor('Author 1')->create();
        Book::factory()->withTitle('PHP Book 2')->withAuthor('Author 2')->create();
        Book::factory()->withTitle('Laravel Book')->withAuthor('PHP Author')->create();
        Book::factory()->withTitle('JavaScript Book')->withAuthor('JS Author')->create();
        
        $options = new BookQueryOptions(
            search: 'PHP',
            sortBy: 'title',
            sortDirection: 'desc',
            page: 1,
            perPage: 2
        );

        $result = $this->bookQueryService->getAllBooks($options);
        
        // Should find 3 books with PHP in title or author
        $this->assertEquals(3, $result->total());
        // But only return 2 per page
        $this->assertEquals(2, $result->count());
        // And they should be sorted by title descending
        $titles = $result->pluck('title')->toArray();
        $this->assertEquals(['PHP Book 2', 'PHP Book 1'], $titles);
    }

    public function test_get_all_books_with_empty_search_returns_all_books(): void
    {
        Book::factory()->count(3)->create();
        $options = new BookQueryOptions(search: '');

        $result = $this->bookQueryService->getAllBooks($options);

        $this->assertEquals(3, $result->count());
    }

    public function test_get_all_books_with_no_results(): void
    {
        Book::factory()->count(3)->create();
        $options = new BookQueryOptions(search: 'NonexistentTerm');

        $result = $this->bookQueryService->getAllBooks($options);

        $this->assertEquals(0, $result->count());
        $this->assertEquals(0, $result->total());
    }

    public function test_get_book_by_id_returns_correct_book(): void
    {
        $book = Book::factory()->withTitle('Test Book')->withAuthor('Test Author')->create();
        
        $result = $this->bookQueryService->getBookById($book->id);
        
        $this->assertNotNull($result);
        $this->assertEquals($book->id, $result->id);
        $this->assertEquals('Test Book', $result->title);
        $this->assertEquals('Test Author', $result->author);
    }

    public function test_get_book_by_id_returns_null_for_nonexistent_book(): void
    {
        $result = $this->bookQueryService->getBookById(999);
        
        $this->assertNull($result);
    }
}