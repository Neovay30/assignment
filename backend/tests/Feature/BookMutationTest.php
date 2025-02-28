<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Book;

class BookMutationTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_book(): void
    {
        $bookData = [
            'title' => 'New Test Book',
            'author' => 'New Test Author',
        ];

        $response = $this->postJson('/api/book', $bookData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'title',
                'author',
            ])
            ->assertJson([
                'title' => 'New Test Book',
                'author' => 'New Test Author',
            ]);

        $this->assertDatabaseHas('books', $bookData);
    }

    public function test_validation_errors_when_creating_book_with_empty_fields(): void
    {
        $response = $this->postJson('/api/book', [
            'title' => '',
            'author' => '',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'author']);
    }

    public function test_validation_errors_when_creating_book_with_duplicate_title(): void
    {
        Book::factory()->withTitle('Existing Book Title')->withAuthor('Some Author')->create();

        // Try to create another book with the same title
        $response = $this->postJson('/api/book', [
            'title' => 'Existing Book Title',
            'author' => 'Different Author'
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title'])
            ->assertJsonPath('errors.title.0', 'A book with this exact title already exists.');
    }

    public function test_can_update_book_author(): void
    {
        $book = Book::factory()->withTitle('Original Title')->withAuthor('Original Author')->create();
        
        $updateData = [
            'author' => 'Updated Author',
        ];

        $response = $this->putJson("/api/book/{$book->id}", $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'id' => $book->id,
                'title' => 'Original Title',
                'author' => 'Updated Author',
            ])
            ->assertJsonMissing([
                'created_at',
                'updated_at'
            ]);
        
        $this->assertDatabaseHas('books', [
            'id' => $book->id,
            'title' => 'Original Title',
            'author' => 'Updated Author',
        ]);
    }

    public function test_validation_errors_when_updating_book_with_empty_author(): void
    {
        $book = Book::factory()->create();

        $response = $this->putJson("/api/book/{$book->id}", [
            'author' => '',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['author']);
    }

    public function test_cannot_update_nonexistent_book(): void
    {
        $response = $this->putJson("/api/book/999", [
            'author' => 'New Author',
        ]);

        $response->assertStatus(404)
            ->assertJson([
                'message' => 'Book not found'
            ]);
    }

    public function test_cannot_update_book_title(): void
    {
        $book = Book::factory()->withTitle('Original Title')->withAuthor('Original Author')->create();
        
        // Try to update the title (which should be ignored)
        $response = $this->putJson("/api/book/{$book->id}", [
            'title' => 'New Title',
            'author' => 'Updated Author'
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'id' => $book->id,
                'title' => 'Original Title',
                'author' => 'Updated Author',
            ]);
        
        $this->assertDatabaseHas('books', [
            'id' => $book->id,
            'title' => 'Original Title',
            'author' => 'Updated Author',
        ]);
    }
}
