<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Book::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'author' => $this->faker->name(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    public function withTitle(string $title): self
    {
        return $this->state(fn (array $attributes) => ['title' => $title]);
    }

    public function withAuthor(string $author): self
    {
        return $this->state(fn (array $attributes) => ['author' => $author]);
    }
} 