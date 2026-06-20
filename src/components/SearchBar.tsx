import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  value?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar producto...',
  onSearch,
  value = '',
}) => {
  const [localValue, setLocalValue] = useState(value);

  // Sincronizar valor local si el prop cambia
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setLocalValue(newVal);
    onSearch(newVal);
  };

  const handleClear = () => {
    setLocalValue('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-lg mx-auto font-sans">
      {/* Icono lupa */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all shadow-sm text-slate-800"
      />

      {/* Botón limpiar (X) */}
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
