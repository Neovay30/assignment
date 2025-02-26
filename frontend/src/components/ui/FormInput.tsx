import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { cva } from 'class-variance-authority';

interface FormInputProps {
  name: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const inputStyles = cva(
  'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2',
  {
    variants: {
      error: {
        true: 'border-red-500 focus:ring-red-500',
        false: 'border-gray-300 focus:ring-blue-500',
      },
      disabled: {
        true: 'bg-gray-100 text-gray-500',
        false: 'bg-white text-gray-900',
      },
    },
    defaultVariants: {
      error: false,
      disabled: false,
    },
  }
);

export const FormInput: React.FC<FormInputProps> = ({ name, label, disabled, className, placeholder }) => {
  const { control, formState: { errors } } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            className={inputStyles({ error: !!errors[name], disabled }) + ` ${className}`}
            disabled={disabled}
            placeholder={placeholder}
          />
        )}
      />
      {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
}; 