import React from 'react';
import type { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string | null;
  onCategorySelect: (categorySlug: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategorySelect,
}) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-2 flex gap-2 font-sans select-none">
      {/* Botón de "Todos" */}
      <button
        type="button"
        onClick={() => onCategorySelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm shrink-0 border ${
          activeCategory === null
            ? 'bg-brand-orange border-brand-orange text-white shadow-brand-orange/10'
            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
        }`}
      >
        Todos
      </button>

      {/* Categorías dinámicas */}
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onCategorySelect(category.slug)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm shrink-0 border ${
            activeCategory === category.slug
              ? 'bg-brand-orange border-brand-orange text-white shadow-brand-orange/10'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
