import React from 'react';

export const TransferInfo: React.FC = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 font-sans space-y-3">
      <div className="flex items-start gap-3">
        <span className="text-xl">ℹ️</span>
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-800">
            Información de Transferencia
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Realizá la transferencia al alias indicado abajo. Recordá enviar el comprobante de pago por WhatsApp para confirmar y agilizar tu pedido.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200/60 pt-3 space-y-2">
        <div className="flex justify-between items-baseline text-xs sm:text-sm">
          <span className="font-semibold text-slate-500">Alias MP:</span>
          <span className="font-black text-slate-900 bg-orange-100/50 text-brand-orange-dark px-2 py-0.5 rounded border border-orange-200/40 select-all font-mono">
            burguerhouse.mp
          </span>
        </div>
        <div className="flex justify-between items-baseline text-xs sm:text-sm">
          <span className="font-semibold text-slate-500">Enviar comprobante al:</span>
          <span className="font-bold text-slate-800 font-mono">
            +54 9 11 2345-6789
          </span>
        </div>
      </div>
    </div>
  );
};
