<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = [
            [
                'title' => 'The Great Gatsby',
                'author' => 'F. Scott Fitzgerald'
            ],
            [
                'title' => '1984',
                'author' => 'George Orwell'
            ],
            [
                'title' => 'To Kill a Mockingbird',
                'author' => 'Harper Lee'
            ],
            [
                'title' => 'Pride and Prejudice',
                'author' => 'Jane Austen'
            ],
            [
                'title' => 'The Catcher in the Rye',
                'author' => 'J.D. Salinger'
            ],
            [
                'title' => 'The Hobbit',
                'author' => 'J.R.R. Tolkien'
            ],
            [
                'title' => 'The Lord of the Rings',
                'author' => 'J.R.R. Tolkien'
            ],
            [
                'title' => 'The Two Towers',
                'author' => 'J.R.R. Tolkien'
            ]
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
} 