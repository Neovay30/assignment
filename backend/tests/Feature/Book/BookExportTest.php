<?php

namespace Tests\Feature;

use App\Models\Book;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookExportTest extends TestCase
{
    use RefreshDatabase;

    public function test_export_books_as_csv_with_all_fields(): void
    {
        Book::factory()->withTitle('Test Book 1')->withAuthor('Test Author 1')->create();
        Book::factory()->withTitle('Test Book 2')->withAuthor('Test Author 2')->create();
        
        $response = $this->postJson('/api/book/export', [
            'format' => 'csv',
            'includeTitle' => true,
            'includeAuthor' => true,
        ]);
        
        $response->assertStatus(200)
            ->assertHeader('Content-Type', 'text/csv; charset=UTF-8')
            ->assertHeader('Content-Disposition', 'attachment; filename=books_export.csv');
        
        $content = $response->streamedContent();
        $this->assertStringContainsString('title,author', $content);
        $this->assertStringContainsString('Test Book 1', $content);
        $this->assertStringContainsString('Test Author 1', $content);
        $this->assertStringContainsString('Test Book 2', $content);
        $this->assertStringContainsString('Test Author 2', $content);
    }

    public function test_export_books_as_csv_with_title_only(): void
    {
        Book::factory()->withTitle('Test Book 1')->withAuthor('Test Author 1')->create();
        Book::factory()->withTitle('Test Book 2')->withAuthor('Test Author 2')->create();
        
        $response = $this->postJson('/api/book/export', [
            'format' => 'csv',
            'includeTitle' => true,
            'includeAuthor' => false,
        ]);
        
        $response->assertStatus(200)
            ->assertHeader('Content-Type', 'text/csv; charset=UTF-8')
            ->assertHeader('Content-Disposition', 'attachment; filename=books_export.csv');
        
        $content = $response->streamedContent();
        $this->assertStringContainsString('title', $content);
        $this->assertStringContainsString('Test Book 1', $content);
        $this->assertStringContainsString('Test Book 2', $content);
        $this->assertStringNotContainsString('author', $content);
        $this->assertStringNotContainsString('Test Author', $content);
    }

    public function test_export_books_as_csv_with_author_only(): void
    {
        Book::factory()->withTitle('Test Book 1')->withAuthor('Test Author 1')->create();
        
        $response = $this->postJson('/api/book/export', [
            'format' => 'csv',
            'includeTitle' => false,
            'includeAuthor' => true,
        ]);
        
        $response->assertStatus(200)
            ->assertHeader('Content-Type', 'text/csv; charset=UTF-8')
            ->assertHeader('Content-Disposition', 'attachment; filename=books_export.csv');
        
        $content = $response->streamedContent();
        $this->assertStringContainsString('author', $content);
        $this->assertStringContainsString('Test Author 1', $content);
        $this->assertStringNotContainsString('title', $content);
        $this->assertStringNotContainsString('Test Book 1', $content);
    }

    public function test_export_books_as_xml_with_all_fields(): void
    {
        Book::factory()->withTitle('XML Test Book')->withAuthor('XML Test Author')->create();
        
        $response = $this->postJson('/api/book/export', [
            'format' => 'xml',
            'includeTitle' => true,
            'includeAuthor' => true,
        ]);
        
        $response->assertStatus(200)
            ->assertHeader('Content-Type', 'application/xml')
            ->assertHeader('Content-Disposition', 'attachment; filename=books_export.xml');
        
        $content = $response->streamedContent();
        $this->assertStringContainsString('<books>', $content);
        $this->assertStringContainsString('<book>', $content);
        $this->assertStringContainsString('<title>XML Test Book</title>', $content);
        $this->assertStringContainsString('<author>XML Test Author</author>', $content);
    }

    public function test_export_books_as_xml_with_title_only(): void
    {
        Book::factory()->withTitle('XML Test Book')->withAuthor('XML Test Author')->create();
        
        $response = $this->postJson('/api/book/export', [
            'format' => 'xml',
            'includeTitle' => true,
            'includeAuthor' => false,
        ]);
        
        $response->assertStatus(200)
            ->assertHeader('Content-Type', 'application/xml')
            ->assertHeader('Content-Disposition', 'attachment; filename=books_export.xml');
        
        $content = $response->streamedContent();
        $this->assertStringContainsString('<books>', $content);
        $this->assertStringContainsString('<book>', $content);
        $this->assertStringContainsString('<title>XML Test Book</title>', $content);
        $this->assertStringNotContainsString('<author>', $content);
    }

    public function test_export_validation_errors(): void
    {
        $response = $this->postJson('/api/book/export', [
            'format' => 'invalid-format',
            'includeTitle' => true,
            'includeAuthor' => true,
        ]);
        
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['format']);
    }

    public function test_export_with_empty_database(): void
    {
        $response = $this->postJson('/api/book/export', [
            'format' => 'csv',
            'includeTitle' => true,
            'includeAuthor' => true,
        ]);
        
        $response->assertStatus(200);
        
        $content = $response->streamedContent();
        $this->assertStringContainsString('title,author', $content);
        
        // Count lines - should only be the header
        $lines = explode("\n", trim($content));
        $this->assertCount(1, $lines);
    }

    public function test_export_with_missing_fields(): void
    {
        $response = $this->postJson('/api/book/export', [
            'format' => 'csv',
        ]);
        
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['includeTitle', 'includeAuthor']);
    }
}