import { useState } from 'react';
import { ChevronDown, RotateCcw } from 'lucide-react';
import {
  AVAILABLE_COLORS,
  AVAILABLE_SIZES,
  BRAND_LINES,
  PRICE_TIERS,
  SHOES_CATALOG,
  SUBCATEGORIES,
  formatRs,
} from '../data/shoes';
import { BrandLine, FilterState, PriceTier, ShoeColor, Subcategory } from '../types/store';

interface FilterSidebarProps {
  filters: FilterState;
  onTogglePrice: (price: PriceTier) => void;
  onToggleSubcategory: (sub: Subcategory) => void;
  onToggleBrand: (brand: BrandLine) => void;
  onToggleSize: (size: number) => void;
  onToggleColor: (color: ShoeColor) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

interface AccordionSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function AccordionSection({ title, defaultOpen = true, children }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-200 py-4 first:pt-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between text-sm font-semibold text-zinc-900 cursor-pointer py-1"
      >
        <span>{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-zinc-500 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

export function FilterSidebar({
  filters,
  onTogglePrice,
  onToggleSubcategory,
  onToggleBrand,
  onToggleSize,
  onToggleColor,
  onResetFilters,
  activeFilterCount,
}: FilterSidebarProps) {
  return (
    <div className="w-full select-none">
      {activeFilterCount > 0 && (
        <div className="pb-4 mb-4 border-b border-zinc-200 flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-600 tabular-nums">
            {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filters'} active
          </span>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset all
          </button>
        </div>
      )}

      <AccordionSection title="Price" defaultOpen>
        {PRICE_TIERS.map((tier) => {
          const checked = filters.prices.includes(tier);
          const count = SHOES_CATALOG.filter((s) => s.price === tier).length;
          return (
            <label
              key={tier}
              className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                checked ? 'bg-orange-50 text-zinc-900' : 'hover:bg-zinc-50 text-zinc-700'
              }`}
            >
              <span className="flex items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onTogglePrice(tier)}
                  className="w-4 h-4 rounded border-zinc-300 accent-orange-600 cursor-pointer"
                />
                <span className="font-medium tabular-nums">{formatRs(tier)}</span>
              </span>
              <span className="text-xs text-zinc-400 tabular-nums">{count}</span>
            </label>
          );
        })}
      </AccordionSection>

      <AccordionSection title="Size (EU)" defaultOpen>
        <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
          {AVAILABLE_SIZES.map((size) => {
            const checked = filters.sizes.includes(size);
            const count = SHOES_CATALOG.filter((s) => s.sizes.includes(size)).length;
            return (
              <label
                key={size}
                className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                  checked ? 'bg-orange-50 text-zinc-900' : 'hover:bg-zinc-50 text-zinc-700'
                }`}
              >
                <span className="flex items-center gap-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleSize(size)}
                    className="w-4 h-4 rounded border-zinc-300 accent-orange-600 cursor-pointer"
                  />
                  <span className="tabular-nums">{size}</span>
                </span>
                <span className="text-xs text-zinc-400 tabular-nums">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </label>
            );
          })}
        </div>
      </AccordionSection>

      <AccordionSection title="Subcategory" defaultOpen>
        {SUBCATEGORIES.map((sub) => {
          const checked = filters.subcategories.includes(sub);
          const count = SHOES_CATALOG.filter((s) => s.subcategory === sub).length;
          return (
            <label
              key={sub}
              className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                checked ? 'bg-orange-50 text-zinc-900' : 'hover:bg-zinc-50 text-zinc-700'
              }`}
            >
              <span className="flex items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleSubcategory(sub)}
                  className="w-4 h-4 rounded border-zinc-300 accent-orange-600 cursor-pointer"
                />
                <span>{sub}</span>
              </span>
              <span className="text-xs text-zinc-400 tabular-nums">{count}</span>
            </label>
          );
        })}
      </AccordionSection>

      <AccordionSection title="Brand" defaultOpen>
        {BRAND_LINES.map((brand) => {
          const checked = filters.brands.includes(brand);
          const count = SHOES_CATALOG.filter((s) => s.brand === brand).length;
          return (
            <label
              key={brand}
              className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                checked ? 'bg-orange-50 text-zinc-900' : 'hover:bg-zinc-50 text-zinc-700'
              }`}
            >
              <span className="flex items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleBrand(brand)}
                  className="w-4 h-4 rounded border-zinc-300 accent-orange-600 cursor-pointer"
                />
                <span>{brand}</span>
              </span>
              <span className="text-xs text-zinc-400 tabular-nums">{count}</span>
            </label>
          );
        })}
      </AccordionSection>

      <AccordionSection title="Color" defaultOpen>
        {AVAILABLE_COLORS.map((color) => {
          const checked = filters.colors.includes(color);
          const count = SHOES_CATALOG.filter((s) => s.colors.includes(color)).length;
          return (
            <label
              key={color}
              className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer transition-colors ${
                checked ? 'bg-orange-50 text-zinc-900' : 'hover:bg-zinc-50 text-zinc-700'
              }`}
            >
              <span className="flex items-center gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleColor(color)}
                  className="w-4 h-4 rounded border-zinc-300 accent-orange-600 cursor-pointer"
                />
                <span>{color}</span>
              </span>
              <span className="text-xs text-zinc-400 tabular-nums">{count}</span>
            </label>
          );
        })}
      </AccordionSection>
    </div>
  );
}
