<?php

namespace App\Services\Book;

use App\DataTransferObjects\Book\BookExportOptions;
use Symfony\Component\HttpFoundation\StreamedResponse;
use InvalidArgumentException;
interface BookExportServiceInterface
{
    /**
     * Export books based on the provided options.
     *
     * @param BookExportOptions $options
     * @return StreamedResponse
     * @throws InvalidArgumentException
     */
    public function exportBooks(BookExportOptions $options): StreamedResponse;
}
