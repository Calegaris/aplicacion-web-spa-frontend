import React from 'react';

interface StatusFilterProps {
  activeStatus: string | null;
  onStatusSelect: (status: string | null) => void;
}

const FILTERS = [
  { key: null, label: 'Todas' },
  { key: 'pendiente', label: 'Pendientes 🔴' },
  { key: 'en preparación', label: 'En preparación 🟠' },
  { key: 'listo', label: 'Listos 🟢' },
  { key: 'entregado', label: 'Entregados ⚪' },
];

export const StatusFilter: React.FC<StatusFilterProps> = ({
  activeStatus,
  onStatusSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-2 py-2 font-sans select-none">
      {FILTERS.map((filter) => (
        <button
          key={filter.label}
          type="button"
          onClick={() => onStatusSelect(filter.key)}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all shadow-sm shrink-0 ${
            activeStatus === filter.key
              ? 'bg-brand-orange border-brand-orange text-white'
              : 'bg-brand-dark-card border-brand-dark-border text-slate-400 hover:bg-brand-dark-hover hover:text-white'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
