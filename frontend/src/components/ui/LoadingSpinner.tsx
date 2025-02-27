import React from 'react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  fullScreen = true, 
  message = "Loading..." 
}) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50" 
    : "relative flex items-center justify-center py-8";

  return (
    <div className={containerClasses}>
      <div className="text-center text-white">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
