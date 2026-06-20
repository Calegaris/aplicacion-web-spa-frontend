import React from 'react';

interface DeliverySelectorProps {
  value: 'delivery' | 'pickup';
  onChange: (value: 'delivery' | 'pickup') => void;
}

export const DeliverySelector: React.FC<DeliverySelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 font-sans select-none">
      {/* Botón Delivery */}
      <button
        type="button"
        onClick={() => onChange('delivery')}
        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all shadow-sm ${
          value === 'delivery'
            ? 'border-brand-orange bg-orange-50/10 text-brand-orange-dark font-extrabold shadow-orange-100'
            : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 font-semibold'
        }`}
      >
        <span className="text-2xl mb-1.5">🛵</span>
        <span className="text-sm">Envío a Domicilio</span>
      </button>

      {/* Botón Pickup */}
      <button
        type="button"
        onClick={() => onChange('pickup')}
        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all shadow-sm ${
          value === 'pickup'
            ? 'border-brand-orange bg-orange-50/10 text-brand-orange-dark font-extrabold shadow-orange-100'
            : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50 font-semibold'
        }`}
      >
        <span className="text-2xl mb-1.5">🏪</span>
        <span className="text-sm">Retiro en Local</span>
      </button>
    </div>
  );
};
