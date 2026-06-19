import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-brand-orange border-t-transparent`}
        role="status"
      >
        <span className="sr-only">Cargando...</span>
      </div>
      {text && (
        <p className="mt-2 text-sm font-medium text-slate-400 animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};
