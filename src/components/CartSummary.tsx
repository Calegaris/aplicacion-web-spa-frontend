import React from 'react';

interface CartSummaryProps {
  subtotal: number;
  tax?: number;
  total: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  total,
  onCheckout,
  isLoading = false,
}) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm font-sans space-y-4">
      <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
        Resumen de Pedido
      </h3>

      <div className="space-y-2 text-sm font-medium">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Envío</span>
          <span className="text-green-600 font-semibold">Gratis</span>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline mb-2">
        <span className="text-base font-bold text-slate-800">Total</span>
        <span className="text-2xl font-black text-slate-950">{formatPrice(total)}</span>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        disabled={isLoading || total <= 0}
        className="w-full py-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-extrabold rounded-xl shadow-lg shadow-brand-orange/15 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Procesando...</span>
          </>
        ) : (
          <span>Ir al checkout</span>
        )}
      </button>
    </div>
  );
};
