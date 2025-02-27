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
}
