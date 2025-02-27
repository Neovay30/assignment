import { forwardRef, useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form';

interface InputFormProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  validation?: RegisterOptions;
  error?: string;
}

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ name, label, type = "text", placeholder, disabled = false, className = "", validation, error }, ref) => {
    const { register } = useFormContext();
    const uniqueId = useId();
    const inputId = `${name}-${uniqueId}`;
    const errorId = `${name}-error-${uniqueId}`;
    
    return (
      <div className={className}>
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        
        <input
          id={inputId}
          type={type}
          disabled={disabled}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition
            ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-900'}
            ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
          `}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          {...register(name, validation)}
        />
        
        {error && (
          <p 
            id={errorId}
            className="mt-1 text-sm text-red-600" 
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputForm.displayName = "InputForm"; 