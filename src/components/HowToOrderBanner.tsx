import React from 'react';

export const HowToOrderBanner: React.FC = () => {
  const whatsappNumber = '549112345678';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola! Quiero hacer un pedido por WhatsApp.')}`;

  return (
    <div className="bg-orange-50 border-y border-orange-100 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left font-sans">
        <p className="text-sm text-slate-700 font-medium">
          🍔 <strong className="text-brand-orange-dark">¿Cómo pedir?</strong> Explorá el menú libremente. Para hacer tu pedido online necesitás una cuenta (es rápido) o podés escribirnos directo por{' '}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700 font-extrabold underline decoration-2 transition-colors"
          >
            WhatsApp 📱
          </a>
        </p>
      </div>
    </div>
  );
};
