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

    public function test_can_update_book_author(): void
    {
        $book = Book::factory()->withTitle('Original Title')->withAuthor('Original Author')->create();
        $updateData = [
            'author' => 'Updated Author',
        ];

        $updatedBook = $this->bookMutationService->updateBook($book->id, $updateData);

        $this->assertInstanceOf(Book::class, $updatedBook);
        $this->assertEquals($book->id, $updatedBook->id);
        // Title should remain unchanged
        $this->assertEquals('Original Title', $updatedBook->title); 
        $this->assertEquals('Updated Author', $updatedBook->author);
        $this->assertDatabaseHas('books', [
            'id' => $book->id,
            'title' => 'Original Title',
            'author' => 'Updated Author',
        ]);
    }

    public function test_update_book_returns_null_for_nonexistent_book(): void
    {
        $result = $this->bookMutationService->updateBook(999, [
            'author' => 'New Author',
        ]);
        
        $this->assertNull($result);
    }
}