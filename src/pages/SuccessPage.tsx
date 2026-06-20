import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = (location.state as any)?.orderId;

  // Redirigir si no hay número de orden
  useEffect(() => {
    if (!orderId) {
      navigate('/', { replace: true });
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  const formattedOrderNumber = `#${String(orderId).padStart(5, '0')}`;

  return (
    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-100 p-8 border border-slate-100 text-center space-y-6">
        {/* Checkmark animado */}
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-sm animate-pulse">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900">¡Pedido Recibido!</h1>
          <p className="text-sm text-slate-400">
            Tu orden ha sido registrada exitosamente en nuestra base de datos.
          </p>
        </div>

        {/* Nro de Orden */}
        <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 inline-block w-full">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Número de Pedido
          </span>
          <span className="text-3xl font-black text-brand-orange-dark tracking-wide">
            {formattedOrderNumber}
          </span>
        </div>

        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
          Ya estamos notificando a la cocina. Podés seguir el progreso y los cambios de estado en tiempo real.
        </p>

        {/* Acciones */}
        <div className="space-y-3 pt-2">
          <Link
            to={`/orders`}
            className="block w-full py-3.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-extrabold rounded-xl shadow-lg shadow-brand-orange/15 transition-all text-center text-sm"
          >
            Ver mis pedidos
          </Link>
          <Link
            to="/"
            className="block w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-center text-sm"
          >
            Volver al menú principal
          </Link>
        </div>
      </div>
    </div>
  );
};
