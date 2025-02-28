<?php

namespace App\Services\Book;

use App\DataTransferObjects\Book\BookExportOptions;
use App\Repositories\BookRepositoryInterface;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Support\Collection;


/**
 * NOTE: Consider using strategy pattern if there are more formats to export: 
 * https://refactoring.guru/design-patterns/strategy
 * And implement queue for large exports: 
 * https://laravel.com/docs/10.x/queues
 */
class BookExportService implements BookExportServiceInterface
{
    private BookRepositoryInterface $bookRepository;

    public function __construct(BookRepositoryInterface $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    /**
     * Export books based on the provided options.
     * 
     * This method gets all books from the repository, filters the fields
     * based on the options, generates the appropriate format (CSV or XML),
     * and returns a StreamedResponse for downloading the file.
     *
     * @param BookExportOptions $options
     * @return StreamedResponse
     * @throws \InvalidArgumentException
     */
    public function exportBooks(BookExportOptions $options): StreamedResponse
    {

        $books = $this->bookRepository->getAll();

        $fields = [];
        if ($options->includeTitle) {
            $fields[] = 'title';
        }
        if ($options->includeAuthor) {
            $fields[] = 'author';
        }

        $content = match ($options->format) {
            'csv' => $this->generateCsv($books, $fields),
            'xml' => $this->generateXml($books, $fields),
            default => throw new \InvalidArgumentException("Unsupported format: {$options->format}")
        };

        return $this->createDownloadResponse($content, $options->format);
    }

    /**
     * Creates a CSV file with headers based on the given fields.
     *
     * @param Collection $books
     * @param array $fields
     * @return string
     */
    private function generateCsv($books, array $fields): string
    {
        $output = fopen('php://temp', 'r+');

        fputcsv($output, $fields);

        foreach ($books as $book) {
            $row = [];
            foreach ($fields as $field) {
                $row[] = $book->{$field};
            }
            fputcsv($output, $row);
        }

        rewind($output);
        $csv = stream_get_contents($output);
        fclose($output);

        return $csv;
    }

    /**
     * Creates an XML document with a root <books> element containing
     * <book> elements with child elements for each field.
     *
     * @param Collection $books
     * @param array $fields
     * @return string
     */
    private function generateXml($books, array $fields): string
    {
        $xml = new \SimpleXMLElement('<books></books>');

        foreach ($books as $book) {
            $xmlBook = $xml->addChild('book');
            foreach ($fields as $field) {
                $xmlBook->addChild($field, htmlspecialchars($book->{$field}));
            }
        }

        return $xml->asXML();
    }

    /**
     * Configures a StreamedResponse with appropriate headers for downloading
     * the exported content as a file.
     *
     * @param string $content
     * @param string $format
     * @return StreamedResponse
     */
    private function createDownloadResponse(string $content, string $format): StreamedResponse
    {
        $filename = 'books_export.' . $format;
        $contentType = $format === 'csv' ? "text/csv" : "application/xml";

        return response()->streamDownload(
            function () use ($content) {
                echo $content;
            },
            $filename,
            [
                'Content-Type' => $contentType,
                'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            ]
        );
    }
}
