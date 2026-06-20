import React, { useState, useEffect } from 'react';
import { DeliverySelector } from './DeliverySelector';
import { PaymentSelector } from './PaymentSelector';
import { TransferInfo } from './TransferInfo';
import { ErrorMessage } from './ErrorMessage';
import type { CheckoutData } from '../types';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void;
  initialData?: Partial<CheckoutData>;
  isLoading?: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmit,
  initialData = {},
  isLoading = false,
}) => {
  const [name, setName] = useState(initialData.name || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>(
    initialData.deliveryType || 'delivery'
  );
  const [address, setAddress] = useState(initialData.address || '');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer'>(
    initialData.paymentMethod || 'cash'
  );

  const [error, setError] = useState('');

  // Sincronizar datos iniciales si cambian (por ejemplo, al cargarse el perfil del store)
  useEffect(() => {
    if (initialData.name) setName(initialData.name);
    if (initialData.email) setEmail(initialData.email);
    if (initialData.phone) setPhone(initialData.phone);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Por favor completá todos los campos de contacto.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresá un correo electrónico válido.');
      return;
    }

    if (deliveryType === 'delivery' && !address.trim()) {
      setError('Por favor ingresá una dirección de entrega.');
      return;
    }

    onSubmit({
      name,
      email,
      phone,
      deliveryType,
      address: deliveryType === 'delivery' ? address : undefined,
      paymentMethod,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      {error && <ErrorMessage message={error} />}

      {/* Datos de Contacto */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
          Datos de Contacto
        </h3>

        <div>
          <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Nombre Completo
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
            placeholder="Juan Pérez"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all disabled:opacity-50 text-slate-800 text-sm font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="juan@email.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all disabled:opacity-50 text-slate-800 text-sm font-medium"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Teléfono
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
              placeholder="+54 9 11 1234-5678"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all disabled:opacity-50 text-slate-800 text-sm font-medium"
            />
          </div>
        </div>
      </div>

      {/* Tipo de Entrega */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
          Método de Entrega
        </h3>
        <DeliverySelector value={deliveryType} onChange={setDeliveryType} />

        {deliveryType === 'delivery' && (
          <div className="pt-2 animate-fadeIn">
            <label htmlFor="address" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Dirección de Entrega
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={isLoading}
              placeholder="Av. Siempreviva 742, Depto 2B"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all disabled:opacity-50 text-slate-800 text-sm font-medium"
            />
          </div>
        )}
      </div>

      {/* Método de Pago */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
          Método de Pago
        </h3>
        <PaymentSelector value={paymentMethod} onChange={setPaymentMethod} />

        {paymentMethod === 'transfer' && (
          <div className="pt-2 animate-fadeIn">
            <TransferInfo />
          </div>
        )}
      </div>

      {/* Botón de Envío */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-extrabold rounded-xl shadow-lg shadow-brand-orange/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100 text-center text-base"
      >
        Revisar pedido
      </button>
    </form>
  );
};
