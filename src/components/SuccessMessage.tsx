import React from 'react';

interface SuccessMessageProps {
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  dismissible = false,
  onDismiss,
}) => {
  return (
    <div className="flex items-center justify-between p-4 mb-4 text-green-800 rounded-lg bg-green-50 border border-green-200" role="alert">
      <div className="flex items-center gap-2">
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium">{message}</span>
      </div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8"
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
