import { useState } from "react";
import { useStore } from "@nanostores/react";
import { $lang } from "@/stores/langStore";
import { SlidersHorizontal, X, Check, RotateCcw } from "lucide-react";

interface CategoryOption {
  key: string;
  label: { en: string; es: string };
}

interface HoodOption {
  key: string;
  label: { en: string; es: string };
}

interface MobileFilterSheetProps {
  categories: CategoryOption[];
  hoods: HoodOption[];
  activeCategory: string;
  onSelectCategory: (key: string) => void;
  activeHood: string;
  onSelectHood: (key: string) => void;
  hasPatioOnly: boolean;
  onTogglePatio: () => void;
  bilingualStaffOnly: boolean;
  onToggleBilingual: () => void;
  getCategoryCount: (key: string) => number;
  getHoodCount: (key: string) => number;
  onReset: () => void;
}

export const MobileFilterSheet = ({
  categories,
  hoods,
  activeCategory,
  onSelectCategory,
  activeHood,
  onSelectHood,
  hasPatioOnly,
  onTogglePatio,
  bilingualStaffOnly,
  onToggleBilingual,
  getCategoryCount,
  getHoodCount,
  onReset,
}: MobileFilterSheetProps) => {
  const lang = useStore($lang);
  const isEs = lang === "es";
  const [isOpen, setIsOpen] = useState(false);

  const activeFiltersCount =
    (activeCategory !== "all" ? 1 : 0) +
    (activeHood !== "all" ? 1 : 0) +
    (hasPatioOnly ? 1 : 0) +
    (bilingualStaffOnly ? 1 : 0);

  return (
    <div className="md:hidden mb-6">
      {/* Mobile Filter Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 px-4 rounded-xl bg-muted border border-border text-foreground font-label text-xs font-bold uppercase tracking-wider flex items-center justify-between shadow-sm hover:border-primary/50 transition-all"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-primary" />
          <span>{isEs ? "Filtros y Búsqueda" : "Filter Options"}</span>
        </div>
        {activeFiltersCount > 0 && (
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary text-primary-foreground font-bold">
            {activeFiltersCount} {isEs ? "Activos" : "Active"}
          </span>
        )}
      </button>

      {/* Bottom Sheet Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full bg-card border-t border-border rounded-t-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto animate-slide-up text-card-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-primary" />
                <h3 className="font-display text-xl uppercase text-foreground">
                  {isEs ? "Filtros de Búsqueda" : "Search Filters"}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 font-label">
                {isEs ? "Categoría" : "Category"}
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const count = getCategoryCount(cat.key);
                  const isSelected = activeCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => onSelectCategory(cat.key)}
                      className={`filter-chip ${isSelected ? "filter-chip-active" : ""}`}
                    >
                      <span>{isEs ? cat.label.es : cat.label.en}</span>
                      <span className="text-[10px] opacity-75">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Neighborhoods */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 font-label">
                {isEs ? "Barrio" : "Neighborhood"}
              </p>
              <div className="flex flex-wrap gap-2">
                {hoods.map((h) => {
                  const count = getHoodCount(h.key);
                  const isSelected = activeHood === h.key;
                  return (
                    <button
                      key={h.key}
                      onClick={() => onSelectHood(h.key)}
                      className={`filter-chip ${isSelected ? "filter-chip-active" : ""}`}
                    >
                      <span>{isEs ? h.label.es : h.label.en}</span>
                      <span className="text-[10px] opacity-75">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 font-label">
                {isEs ? "Características" : "Features"}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={onTogglePatio}
                  className={`filter-chip ${hasPatioOnly ? "filter-chip-active" : ""}`}
                >
                  🌳 {isEs ? "Terrazas y Patios" : "Patios & Outdoor"}
                </button>
                <button
                  onClick={onToggleBilingual}
                  className={`filter-chip ${bilingualStaffOnly ? "filter-chip-active" : ""}`}
                >
                  💬 {isEs ? "Personal Bilingüe" : "Bilingual Staff"}
                </button>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <button
                onClick={onReset}
                className="py-3 px-4 rounded-xl border border-border text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 font-label"
              >
                <RotateCcw size={14} />
                <span>{isEs ? "Limpiar" : "Reset"}</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 glow-primary font-label"
              >
                <Check size={16} />
                <span>{isEs ? "Aplicar Filtros" : "Apply Filters"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
