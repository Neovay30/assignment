<?php

namespace App\Http\Requests\Book;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\ValidationRule;
class BookIndexRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'page' => 'sometimes|nullable|integer|min:1',
            'per_page' => 'sometimes|nullable|integer|min:1|max:100',
            'search' => 'sometimes|nullable|string|max:255',
            'sort_by' => 'sometimes|nullable|string|in:title,author',
            'sort_direction' => 'sometimes|nullable|string|in:asc,desc',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->normalizeEmptyStrings();
    }

    /**
     * Normalize empty strings to null for specific fields.
     */
    private function normalizeEmptyStrings(): void
    {
        $input = $this->all();
        
        foreach (['search', 'sort_by', 'sort_direction'] as $field) {
            if (isset($input[$field]) && $input[$field] === '') {
                $input[$field] = null;
            }
        }
        $this->replace($input);
    }
} 