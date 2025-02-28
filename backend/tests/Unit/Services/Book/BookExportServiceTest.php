<?php

namespace Tests\Unit\Services;

use App\DataTransferObjects\Book\BookExportOptions;
use App\Models\Book;
use App\Repositories\BookRepositoryInterface;
use App\Services\Book\BookExportService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookExportServiceTest extends TestCase
{
    use RefreshDatabase;

    private BookExportService $bookExportService;
    private BookRepositoryInterface $bookRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->bookRepository = app(BookRepositoryInterface::class);
        $this->bookExportService = new BookExportService($this->bookRepository);
    }

    public function test_export_books_as_csv_with_all_fields(): void
    {
        Book::factory()->withTitle('Test Book 1')->withAuthor('Test Author 1')->create();
        Book::factory()->withTitle('Test Book 2')->withAuthor('Test Author 2')->create();
        
        $options = new BookExportOptions(
            format: 'csv',
            includeTitle: true,
            includeAuthor: true
        );
        
        $response = $this->bookExportService->exportBooks($options);
        $content = $this->getStreamedContent($response);
        
        $this->assertStringContainsString('title,author', $content);
        $this->assertStringContainsString('Test Book 1', $content);
        $this->assertStringContainsString('Test Author 1', $content);
        $this->assertStringContainsString('Test Book 2', $content);
        $this->assertStringContainsString('Test Author 2', $content);
    }

    public function test_export_books_as_csv_with_title_only(): void
    {
        Book::factory()->withTitle('Test Book 1')->withAuthor('Test Author 1')->create();
        
        $options = new BookExportOptions(
            format: 'csv',
            includeTitle: true,
            includeAuthor: false
        );
        
        $response = $this->bookExportService->exportBooks($options);
        $content = $this->getStreamedContent($response);
        
        $this->assertStringContainsString('title', $content);
        $this->assertStringContainsString('Test Book 1', $content);
        $this->assertStringNotContainsString('author', $content);
        $this->assertStringNotContainsString('Test Author 1', $content);
    }

    public function test_export_books_as_csv_with_author_only(): void
    {
        Book::factory()->withTitle('Test Book 1')->withAuthor('Test Author 1')->create();
        
        $options = new BookExportOptions(
            format: 'csv',
            includeTitle: false,
            includeAuthor: true
        );
        
        $response = $this->bookExportService->exportBooks($options);
        $content = $this->getStreamedContent($response);
        
        $this->assertStringContainsString('author', $content);
        $this->assertStringContainsString('Test Author 1', $content);
        $this->assertStringNotContainsString('title', $content);
        $this->assertStringNotContainsString('Test Book 1', $content);
    }

    public function test_export_books_as_xml_with_all_fields(): void
    {
        Book::factory()->withTitle('XML Test Book')->withAuthor('XML Test Author')->create();
        
        $options = new BookExportOptions(
            format: 'xml',
            includeTitle: true,
            includeAuthor: true
        );
        
        $response = $this->bookExportService->exportBooks($options);
        $content = $this->getStreamedContent($response);
        
        $this->assertStringContainsString('<books>', $content);
        $this->assertStringContainsString('<book>', $content);
        $this->assertStringContainsString('<title>XML Test Book</title>', $content);
        $this->assertStringContainsString('<author>XML Test Author</author>', $content);
    }

    public function test_export_books_as_xml_with_title_only(): void
    {
        Book::factory()->withTitle('XML Test Book')->withAuthor('XML Test Author')->create();
        
        $options = new BookExportOptions(
            format: 'xml',
            includeTitle: true,
            includeAuthor: false
        );
        
        $response = $this->bookExportService->exportBooks($options);
        $content = $this->getStreamedContent($response);
        
        $this->assertStringContainsString('<books>', $content);
        $this->assertStringContainsString('<book>', $content);
        $this->assertStringContainsString('<title>XML Test Book</title>', $content);
        $this->assertStringNotContainsString('<author>', $content);
    }

    public function test_export_books_as_xml_with_author_only(): void
    {
        Book::factory()->withTitle('XML Test Book')->withAuthor('XML Test Author')->create();
        
        $options = new BookExportOptions(
            format: 'xml',
            includeTitle: false,
            includeAuthor: true
        );
        
        $response = $this->bookExportService->exportBooks($options);
        $content = $this->getStreamedContent($response);
        
        $this->assertStringContainsString('<books>', $content);
        $this->assertStringContainsString('<book>', $content);
        $this->assertStringContainsString('<author>XML Test Author</author>', $content);
        $this->assertStringNotContainsString('<title>', $content);
        $this->assertStringNotContainsString('XML Test Book', $content);
    }

    public function test_export_with_invalid_format_throws_exception(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        
        $options = new BookExportOptions(
            format: 'pdf',
            includeTitle: true,
            includeAuthor: true
        );
        
        $this->bookExportService->exportBooks($options);
    }

    public function test_export_with_empty_database(): void
    {
        $options = new BookExportOptions(
            format: 'csv',
            includeTitle: true,
            includeAuthor: true
        );
        
        $response = $this->bookExportService->exportBooks($options);
        $content = $this->getStreamedContent($response);
        
        $this->assertStringContainsString('title,author', $content);
        
        $lines = explode("\n", trim($content));
        $this->assertCount(1, $lines);
    }
    
    /**
     * Helper method to get content from a StreamedResponse
     */
    private function getStreamedContent($response): string
    {
        ob_start();
        $response->sendContent();
        $content = ob_get_clean();
        return $content;
    }
}