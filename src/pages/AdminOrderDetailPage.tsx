import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminOrderDetail } from '../components/AdminOrderDetail';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { apiClient } from '../api/apiClient';
import type { Order } from '../types';

export const AdminOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchOrderDetail = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await apiClient.get<Order[]>('/orders');
      const foundOrder = response.data.find((o) => o.id === Number(id));

      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('No se encontró la orden especificada.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Ocurrió un error al cargar el detalle de la orden.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiClient.put<Order>(`/orders/${id}/status`, {
        status: newStatus,
      });

      // Actualizar el estado local con la respuesta de la API
      setOrder(response.data);
      setSuccess(`¡Estado actualizado con éxito a "${newStatus}"!`);

      // Limpiar mensaje de éxito tras 3 segundos
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Ocurrió un error al actualizar el estado de la orden.');
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleGoBack = () => {
    navigate('/admin');
  };

  const formattedOrderNumber = id ? `#${String(id).padStart(5, '0')}` : '';

  return (
    <div className="space-y-6 font-sans text-slate-300">
      {/* Encabezado */}
      <div className="flex items-center justify-between pb-3 border-b border-brand-dark-border/40">
        <div className="flex items-center gap-3">
          <button
            onClick={handleGoBack}
            disabled={isLoading || isUpdating}
            className="p-2 hover:bg-brand-dark-card rounded-lg transition-colors border border-transparent hover:border-brand-dark-border text-slate-500 disabled:opacity-50"
            title="Volver a la cola"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Detalle de Orden {formattedOrderNumber}
          </h1>
        </div>

        {order && !isLoading && (
          <span className="text-sm font-bold bg-brand-dark-card border border-brand-dark-border px-3 py-1.5 rounded-full flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
            <span>Estado: {order.status}</span>
          </span>
        )}
      </div>

      {error && <ErrorMessage message={error} />}
      {success && (
        <div className="p-4 mb-4 text-green-400 rounded-lg bg-green-950/20 border border-green-900/50 flex items-center gap-2">
          <span>✅</span>
          <span className="text-sm font-semibold">{success}</span>
        </div>
      )}

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner size="lg" text="Cargando detalles de la orden..." />
        </div>
      ) : (
        order && (
          <AdminOrderDetail
            order={order}
            onStatusChange={handleStatusChange}
            isLoading={isUpdating}
          />
        )
      )}
    </div>
  );
};
