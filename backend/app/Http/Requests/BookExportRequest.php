<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\ValidationRule;

class BookExportRequest extends FormRequest
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
            'format' => 'required|string|in:csv,xml',
            'includeTitle' => 'required|boolean',
            'includeAuthor' => 'required|boolean',
        ];
    }

    /**
     * Get custom validation messages.
     * 
     * These errors should never happen in the current frontend implementation as
     * default values are set and export format is typed to csv or xml only.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'format.required' => 'Export format is required.',
            'format.in' => 'Export format must be either csv or xml.',
            'includeTitle.required' => 'Please specify whether to include book titles in the export.',
            'includeAuthor.required' => 'Please specify whether to include book authors in the export.',
        ];
    }
} 