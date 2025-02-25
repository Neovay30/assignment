<?php

namespace App\Http\Controllers;

class TestController extends Controller
{
    public function test()
    {
        return response()->json([
            [
                'id' => '1',
                'title' => 'The Great Gatsby',
                'description' => 'A novel by F. Scott Fitzgerald'
            ],
            [
                'id' => '2',
                'title' => '1984',
                'description' => 'A dystopian novel by George Orwell'
            ],
            [
                'id' => '3',
                'title' => 'To Kill a Mockingbird',
                'description' => 'A novel by Harper Lee'
            ]
        ]);
    }
} 