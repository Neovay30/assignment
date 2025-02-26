import React from 'react';
import { cva } from 'class-variance-authority';

interface BasicInputProps {
  name: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const inputStyles = cva(
  'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2',
  {
    variants: {
      disabled: {
        true: 'bg-gray-100 text-gray-500',
        false: 'bg-white text-gray-900',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export const BasicInput: React.FC<BasicInputProps> = ({ name, label, disabled, className, placeholder, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        name={name}
        className={inputStyles({ disabled }) + ` ${className}`}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}; 