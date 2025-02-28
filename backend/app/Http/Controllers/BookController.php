<?php

namespace App\Http\Controllers;

use App\DataTransferObjects\Book\BookExportOptions;
use App\DataTransferObjects\Book\BookQueryOptions;
use App\Http\Requests\BookExportRequest;
use App\Http\Requests\BookIndexRequest;
use App\Http\Requests\BookStoreRequest;
use App\Http\Requests\BookUpdateRequest;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use App\Services\Book\BookMutationServiceInterface;
use App\Services\Book\BookQueryServiceInterface;
use App\Services\Book\BookExportServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BookController extends Controller
{

    public function __construct(
        protected BookQueryServiceInterface $bookQueryService,
        protected BookMutationServiceInterface $bookMutationService,
        protected BookExportServiceInterface $bookExportService,
    ) {}

    /**
     * Fetch a list of books with optional filters.
     */
    public function index(BookIndexRequest $request): JsonResponse
    {
        $options = BookQueryOptions::fromArray($request->validated());
        $books = $this->bookQueryService->getAllBooks($options);
        return response()->json(new BookCollection($books));
    }

    /**
     * Fetch the specified book.
     */
    public function show(int $id): JsonResponse
    {
        $book = $this->bookQueryService->getBookById($id);
        
        if (!$book) {
            return response()->json(['message' => 'Book not found'], Response::HTTP_NOT_FOUND);
        }
        
        return response()->json(new BookResource($book));
    }

    /**
     * Store a newly created book.
     */
    public function store(BookStoreRequest $request): JsonResponse
    {
        $book = $this->bookMutationService->createBook($request->validated());
        return response()->json(new BookResource($book), Response::HTTP_CREATED);
    }

    /**
     * Update the specified book.
     */
    public function update(BookUpdateRequest $request, int $id): JsonResponse
    {
        $book = $this->bookMutationService->updateBook($id, $request->validated());
        
        if (!$book) {
            return response()->json(['message' => 'Book not found'], Response::HTTP_NOT_FOUND);
        }
        
        return response()->json(new BookResource($book));
    }

    /**
     * Remove the specified book.
     */
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->bookMutationService->deleteBook($id);
        
        if (!$deleted) {
            return response()->json(['message' => 'Book not found'], Response::HTTP_NOT_FOUND);
        }
        
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * NOTE: If there are other types of data to export,
     * consider separating it in an export dedicated controller 
     * and add the route to routes/api.php. Do not forget to 
     * update frontend to use the new route.
     * 
     * Export books in CSV or XML format.
     */
    public function export(BookExportRequest $request): StreamedResponse
    {
        $options = BookExportOptions::fromArray($request->validated());
        return $this->bookExportService->exportBooks($options);
    }
} 