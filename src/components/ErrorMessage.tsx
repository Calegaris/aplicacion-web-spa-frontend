import React from 'react';

interface ErrorMessageProps {
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  dismissible = false,
  onDismiss,
}) => {
  return (
    <div className="flex items-center justify-between p-4 mb-4 text-red-800 rounded-lg bg-red-50 border border-red-200" role="alert">
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium">{message}</span>
      </div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
          aria-label="Cerrar"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
