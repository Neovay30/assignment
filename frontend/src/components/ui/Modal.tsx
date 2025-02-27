import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import Button from './Button';
import { cva, VariantProps } from 'class-variance-authority';

const modalStyles = cva(
  'fixed inset-0 z-10 overflow-auto bg-black bg-opacity-50 flex items-center justify-center block',
);

const modalContentStyles = cva(
  'bg-white rounded-lg shadow-xl w-full mx-4 md:mx-0',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        xxl: 'max-w-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: VariantProps<typeof modalContentStyles>['size'];
}

export const Modal: React.FC<ModalProps> = ({ onClose, title, children, size }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className={modalStyles()}>
      <div className={modalContentStyles({ size })}>
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <Button
            variant="ghost"
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
