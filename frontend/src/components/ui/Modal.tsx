import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import Button from './Button';
import { cva } from 'class-variance-authority';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const modalStyles = cva(
  'fixed inset-0 z-10 overflow-auto bg-black bg-opacity-50 flex items-center justify-center',
  {
    variants: {
      open: {
        true: 'block',
        false: 'hidden',
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

const modalContentStyles = cva(
  'bg-white rounded-lg shadow-xl max-w-md w-full mx-4 md:mx-0',
  {
    variants: {
      size: {
        small: 'max-w-sm',
        medium: 'max-w-md',
        large: 'max-w-lg',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <div className={modalStyles({ open: isOpen })}>
      <div className={modalContentStyles()}>
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <Button
            variant="outline"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full"
          >
            <FaTimes />
          </Button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
