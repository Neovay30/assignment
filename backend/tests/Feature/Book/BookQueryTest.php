<?php

namespace Tests\Feature;

use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookQueryTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_search_books(): void
    {
        // Create books with specific titles
        Book::factory()->withTitle('PHP Programming')->create();
        Book::factory()->withTitle('Laravel Guide')->create();
        Book::factory()->withTitle('JavaScript Basics')->create();

        // Search for PHP
        $response = $this->getJson('/api/book?search=PHP');

        $response->assertStatus(200);
        $this->assertEquals(1, $response->json('meta.total'));
        $this->assertEquals('PHP Programming', $response->json('books.0.title'));
    }

    public function test_can_sort_books(): void
    {
        // Create books in non-alphabetical order
        Book::factory()->withTitle('Z Book')->create();
        Book::factory()->withTitle('A Book')->create();
        Book::factory()->withTitle('M Book')->create();

        // Sort by title ascending
        $response = $this->getJson('/api/book?sort_by=title&sort_direction=asc');

        $response->assertStatus(200);
        $this->assertEquals('A Book', $response->json('books.0.title'));
        $this->assertEquals('M Book', $response->json('books.1.title'));
        $this->assertEquals('Z Book', $response->json('books.2.title'));
    }

    public function test_can_paginate_books(): void
    {
        // Create 15 books
        Book::factory()->count(15)->create();

        // Get first page with 5 per page
        $response = $this->getJson('/api/book?page=1&per_page=5');

        $response->assertStatus(200);
        $this->assertEquals(15, $response->json('meta.total'));
        $this->assertEquals(5, count($response->json('books')));
        $this->assertEquals(1, $response->json('meta.current_page'));
        $this->assertEquals(3, $response->json('meta.last_page'));
    }

    public function test_empty_search_returns_all_books(): void
    {
        Book::factory()->count(3)->create();

        $response = $this->getJson('/api/book?search=');

        $response->assertStatus(200);
        $this->assertEquals(3, $response->json('meta.total'));
    }

    public function test_handles_empty_string_parameters_correctly(): void
    {
        Book::factory()->count(3)->create();

        // Test with empty strings for search, sort_by, and sort_direction
        $response = $this->getJson('/api/book?search=&sort_by=&sort_direction=');

        $response->assertStatus(200);
        $this->assertEquals(3, $response->json('meta.total'));
    }
}