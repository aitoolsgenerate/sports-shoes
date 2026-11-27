import { ShoppingBag, X } from 'lucide-react';
import { Subcategory } from '../types/store';

interface HeaderProps {
  activeSubcategory: Subcategory | null;
  onSelectCategory: (subcategory: Subcategory | null) => void;
  cartCount: number;
  onOpenCart: () => void;
  showBanner: boolean;
  onDismissBanner: () => void;
}

const NAV_CATEGORIES: { label: string; value: Subcategory | null }[] = [
  { label: 'All Shoes', value: null },
  { label: 'Running', value: 'Running' },
  { label: 'Football', value: 'Football & Soccer' },
  { label: 'Basketball', value: 'Basketball' },
  { label: 'Court', value: 'Tennis & Indoor Court' },
];

export function Header({
  activeSubcategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  showBanner,
  onDismissBanner,
}: HeaderProps) {
  return (
    <div className="sticky top-0 z-30 bg-white">
      {showBanner && (
        <div className="bg-orange-600 text-white h-8 px-4 flex items-center justify-center relative text-xs font-medium">
          <p className="truncate pr-6">
            Free nationwide delivery on orders of Rs 7,000 or more
          </p>
          <button
            type="button"
            onClick={onDismissBanner}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <header className="border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#catalog"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory(null);
            }}
            className="font-display text-xl font-bold tracking-tight text-zinc-900 whitespace-nowrap shrink-0"
          >
            Sports Shoes
          </a>

          <nav
            aria-label="Primary categories"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600"
          >
            {NAV_CATEGORIES.map((item) => {
              const isActive = activeSubcategory === item.value;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onSelectCategory(item.value)}
                  className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'border-orange-600 text-zinc-900 font-semibold'
                      : 'border-transparent hover:text-zinc-900 hover:border-zinc-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag</span>
              <span className="font-mono tabular-nums text-xs bg-orange-600 text-white px-1.5 py-0.5 rounded">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
