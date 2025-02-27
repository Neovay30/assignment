<?php

namespace Tests\Unit\Services;

use App\Models\Book;
use App\Repositories\BookRepositoryInterface;
use App\Services\Book\BookMutationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookMutationServiceTest extends TestCase
{
    use RefreshDatabase;

    private BookMutationService $bookMutationService;
    private BookRepositoryInterface $bookRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->bookRepository = app(BookRepositoryInterface::class);
        $this->bookMutationService = new BookMutationService($this->bookRepository);
    }

    public function test_can_create_book(): void
    {
        $bookData = [
            'title' => 'Test Book Title',
            'author' => 'Test Author Name',
        ];

        $book = $this->bookMutationService->createBook($bookData);

        $this->assertInstanceOf(Book::class, $book);
        $this->assertEquals('Test Book Title', $book->title);
        $this->assertEquals('Test Author Name', $book->author);
        $this->assertDatabaseHas('books', $bookData);
    }
}