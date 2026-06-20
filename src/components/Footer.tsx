import React from 'react';

export const Footer: React.FC = () => {
  const whatsappNumber = '549112345678'; // WhatsApp estático para el local
  const message = encodeURIComponent('¡Hola! Vengo de la web y quiero hacer una consulta.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
  const instagramUrl = 'https://instagram.com/burgerhouse.tp';

  return (
    <footer className="bg-brand-dark-card border-t border-brand-dark-border text-slate-400 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍔</span>
              <span className="font-sans font-extrabold text-xl tracking-tight text-white">
                Burger House
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm">
              Las mejores hamburguesas artesanales de barrio elaboradas con ingredientes frescos y carne de primera calidad.
            </p>
          </div>

          {/* Dirección y Horarios */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Información de Local
            </h3>
            <p className="text-sm flex items-center gap-2">
              <span>📍</span> Av. Siempreviva 742, Buenos Aires
            </p>
            <p className="text-sm flex items-center gap-2">
              <span>🕐</span> Lun a Dom: 19:00 a 00:00 hs
            </p>
          </div>

          {/* Redes y Contacto */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Contacto Directo
            </h3>
            <div className="flex items-center gap-4">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-green-400 transition-colors"
                title="Escríbenos por WhatsApp"
              >
                <span className="text-xl">📱</span>
                <span>WhatsApp</span>
              </a>

              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-pink-400 transition-colors"
                title="Visítanos en Instagram"
              >
                <span className="text-xl">📸</span>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-dark-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Burger House. Todos los derechos reservados.</p>
          <p>Proyecto para Programación Web 2 — Etapa 2</p>
        </div>
      </div>
    </footer>
  );
};
