import React from 'react';

interface PaymentSelectorProps {
  value: 'cash' | 'transfer';
  onChange: (value: 'cash' | 'transfer') => void;
}

export const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 font-sans select-none">
      {/* Botón Efectivo */}
      <button
        type="button"
        onClick={() => onChange('cash')}
        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all shadow-sm ${
          value === 'cash'
            ? 'border-brand-orange bg-orange-50/10 text-brand-orange-dark font-extrabold shadow-orange-100'
            : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 font-semibold'
        }`}
      >
        <span className="text-2xl mb-1.5">💵</span>
        <span className="text-sm">Efectivo</span>
      </button>

      {/* Botón Transferencia */}
      <button
        type="button"
        onClick={() => onChange('transfer')}
        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all shadow-sm ${
          value === 'transfer'
            ? 'border-brand-orange bg-orange-50/10 text-brand-orange-dark font-extrabold shadow-orange-100'
            : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 font-semibold'
        }`}
      >
        <span className="text-2xl mb-1.5">🏦</span>
        <span className="text-sm">Transferencia</span>
      </button>
    </div>
  );
};
