import React from 'react';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-100 p-8 border border-slate-100 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Mi Carrito</h1>
        <p className="text-slate-500 mb-6">
          Esta página se habilitará en la Fase 2 para ver y editar los productos agregados.
        </p>
        <Link
          to="/"
          className="inline-block w-full py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold rounded-xl shadow-lg shadow-brand-orange/15 transition-all text-center"
        >
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
};
