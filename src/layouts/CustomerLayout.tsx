import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { WhatsAppFloatingButton } from '../components/WhatsAppFloatingButton';

export const CustomerLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Barra de Navegación superior */}
      <Navbar />

      {/* Contenido dinámico de las páginas */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Pie de página */}
      <Footer />

      {/* Botón flotante de WhatsApp */}
      <WhatsAppFloatingButton />
    </div>
  );
};
