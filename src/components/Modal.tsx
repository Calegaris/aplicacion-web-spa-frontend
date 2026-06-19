import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  // Evitar scroll del body al abrir el modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
      {/* Overlay oscuro de fondo */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Caja del Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all flex flex-col max-h-[90vh]">
        {/* Cabecera */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          {title ? (
            <h3 className="text-xl font-bold text-slate-900 font-sans">{title}</h3>
          ) : (
            <div />
          )}
          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 bg-transparent hover:bg-slate-100 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        {/* Contenido (con scroll interno si es muy largo) */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-600 font-sans leading-relaxed">
          {children}
        </div>

        {/* Pie (opcional) */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-5 border-t border-slate-100 bg-slate-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
