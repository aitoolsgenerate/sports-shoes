import { useState } from 'react';
import { Footprints, Heart, Plus } from 'lucide-react';
import { formatRs } from '../data/shoes';
import { ShoeProduct } from '../types/store';

interface ProductCardProps {
  product: ShoeProduct;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectProduct: (product: ShoeProduct) => void;
  onQuickAdd: (product: ShoeProduct, size: number) => void;
}

export function ProductCard({
  product,
  isSaved,
  onToggleSave,
  onSelectProduct,
  onQuickAdd,
}: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const defaultSize = product.sizes.includes(42) ? 42 : product.sizes[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, defaultSize);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="group bg-white border border-zinc-200 rounded-lg overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelectProduct(product)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelectProduct(product);
          }
        }}
        className="relative aspect-[4/3] bg-[#ECEEEF] overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-600"
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-500 p-4 text-center">
            <Footprints className="w-8 h-8 mb-2 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-600">{product.name}</span>
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(product.id);
          }}
          aria-label={isSaved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
          aria-pressed={isSaved}
          className="absolute top-2.5 left-2.5 w-9 h-9 rounded-md bg-white/95 hover:bg-white border border-zinc-200/80 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'fill-orange-600 text-orange-600' : 'text-zinc-600'
            }`}
          />
        </button>

        {product.isNew && (
          <span className="absolute top-2.5 right-2.5 bg-orange-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-sm">
            New
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div
          onClick={() => onSelectProduct(product)}
          className="cursor-pointer space-y-1.5"
        >
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="text-xs text-zinc-400 line-through">
              {formatRs(product.originalPrice)}
            </span>
            <span className="text-base font-bold text-zinc-900">
              {formatRs(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase text-zinc-500">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.subcategory}</span>
          </div>

          <h3 className="text-[15px] font-semibold text-zinc-900 leading-snug truncate">
            {product.name}
          </h3>
        </div>

        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onSelectProduct(product)}
            className="text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer whitespace-nowrap"
          >
            EU {product.sizes[0]}–{product.sizes[product.sizes.length - 1]}
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-zinc-900 text-white hover:bg-orange-600'
            }`}
          >
            {justAdded ? (
              <span>Added (EU {defaultSize})</span>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add EU {defaultSize}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
