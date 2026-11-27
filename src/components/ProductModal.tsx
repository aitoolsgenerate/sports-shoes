import { useEffect, useState } from 'react';
import { Check, Footprints, Heart, ShoppingBag, X } from 'lucide-react';
import { formatRs } from '../data/shoes';
import { ShoeProduct } from '../types/store';

interface ProductModalProps {
  product: ShoeProduct | null;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (id: string) => void;
  onAddToCart: (product: ShoeProduct, size: number) => void;
}

export function ProductModal({
  product,
  isSaved,
  onClose,
  onToggleSave,
  onAddToCart,
}: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [imgError, setImgError] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes.includes(42) ? 42 : product.sizes[0]);
      setImgError(false);
      setAddedFeedback(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const activeSize = selectedSize ?? product.sizes[0];

  const handleAdd = () => {
    onAddToCart(product, activeSize);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-[2px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div
        className="bg-white rounded-xl border border-zinc-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#ECEEEF] relative aspect-[4/3] md:aspect-auto md:min-h-[440px] flex items-center justify-center p-6">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-contain max-h-[380px]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-500">
              <Footprints className="w-12 h-12 mb-2 text-zinc-400" />
              <span className="text-sm font-medium">{product.name}</span>
            </div>
          )}

          {product.isNew && (
            <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-semibold px-2.5 py-1 rounded-sm">
              New
            </span>
          )}
        </div>

        <div className="p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  <span>{product.brand}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.subcategory}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{product.sku}</span>
                </div>
                <h2
                  id="product-modal-title"
                  className="font-display text-2xl font-bold text-zinc-900 mt-1 text-balance"
                >
                  {product.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close product details"
                className="p-2 text-zinc-500 hover:text-zinc-900 rounded-md hover:bg-zinc-100 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-baseline gap-3 tabular-nums">
              <span className="text-2xl font-bold text-zinc-900">
                {formatRs(product.price)}
              </span>
              <span className="text-sm text-zinc-400 line-through">
                {formatRs(product.originalPrice)}
              </span>
              <span className="text-xs font-medium text-emerald-700">
                In Stock
              </span>
            </div>

            <p className="text-sm text-zinc-600 leading-relaxed">
              {product.description}
            </p>

            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                  Select EU Size
                </span>
                <span className="text-xs text-zinc-500 tabular-nums">
                  Selected: EU {activeSize}
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = activeSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 rounded-md border text-sm font-medium tabular-nums transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <dl className="pt-4 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <dt className="font-semibold text-zinc-900">Upper</dt>
                <dd className="text-zinc-600 mt-0.5">{product.specs.upper}</dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-900">Midsole</dt>
                <dd className="text-zinc-600 mt-0.5">{product.specs.midsole}</dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-900">Outsole</dt>
                <dd className="text-zinc-600 mt-0.5">{product.specs.outsole}</dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-900">Weight</dt>
                <dd className="text-zinc-600 mt-0.5 tabular-nums">{product.specs.weight}</dd>
              </div>
            </dl>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleAdd}
              className={`flex-1 h-12 rounded-lg font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                addedFeedback
                  ? 'bg-emerald-700 text-white'
                  : 'bg-zinc-900 text-white hover:bg-orange-600'
              }`}
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added EU {activeSize} to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag · {formatRs(product.price)}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onToggleSave(product.id)}
              aria-label={isSaved ? 'Remove from saved' : 'Save shoe'}
              className="h-12 w-12 rounded-lg border border-zinc-200 hover:border-zinc-400 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Heart
                className={`w-5 h-5 ${
                  isSaved ? 'fill-orange-600 text-orange-600' : 'text-zinc-600'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
