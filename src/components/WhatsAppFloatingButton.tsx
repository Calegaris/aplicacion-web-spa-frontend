import React from 'react';

export const WhatsAppFloatingButton: React.FC = () => {
  const whatsappNumber = '549112345678';
  const message = encodeURIComponent('¡Hola! Quiero hacer un pedido por WhatsApp.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
      title="Hacer pedido por WhatsApp"
    >
      {/* Icono de WhatsApp hecho con SVG */}
      <svg
        className="w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.388 2.083 13.91 1.058 11.278 1.058c-5.437 0-9.862 4.371-9.866 9.8.001 1.662.44 3.284 1.272 4.72L1.697 21.03l5.803-1.516zM17.15 14.1c-.287-.144-1.7-.84-1.962-.936-.263-.096-.454-.144-.646.144-.192.288-.744.936-.912 1.129-.167.192-.335.216-.622.072-2.736-1.37-3.805-2.007-5.328-4.617-.4-.689.4-.64 1.144-2.127.12-.24.06-.454-.03-.598-.09-.144-.744-1.792-1.02-2.464-.269-.647-.544-.56-.744-.57l-.63-.01c-.216 0-.57.08-.87.41-.3.33-1.146 1.12-1.146 2.73s1.17 3.17 1.33 3.39c.16.22 2.302 3.516 5.576 4.93 2.734 1.18 3.336.94 4.54.83.612-.055 1.7-.696 1.942-1.37.24-.674.24-1.25.17-1.37-.07-.12-.26-.19-.54-.34z" />
      </svg>
      {/* Tooltip en hover */}
      <span className="absolute right-16 scale-0 transition-all rounded bg-brand-dark-card border border-brand-dark-border px-3 py-1.5 text-xs text-white group-hover:scale-100 font-semibold whitespace-nowrap shadow-xl">
        ¿Hablamos por WhatsApp? 💬
      </span>
    </a>
  );
};
