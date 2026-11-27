import { useState } from 'react';
import { ArrowDownRight, Footprints } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data/shoes';

interface HeroBannerProps {
  onShopClick: () => void;
}

export function HeroBanner({ onShopClick }: HeroBannerProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      aria-label="Sports Shoes Featured Collection"
      className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6"
    >
      <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-200 min-h-[260px] sm:min-h-[340px] lg:min-h-[400px] flex items-end lg:items-center">
        {!imgError ? (
          <img
            src={HERO_BANNER_IMAGE}
            alt="Sports Shoes Black and Navy Blue Athletic Collection"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-slate-900 to-zinc-950 flex items-center justify-end pr-16">
            <Footprints className="w-24 h-24 text-zinc-700" />
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/55 to-zinc-950/20 lg:bg-gradient-to-r lg:from-zinc-950/90 lg:via-zinc-950/55 lg:to-transparent"
        />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-xl space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.08] text-balance">
            Sports Shoes
          </h2>

          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-md">
            Engineered running, turf football, basketball, and court shoes finished in stealth black and midnight navy blue.
          </p>

          <div className="pt-1">
            <button
              type="button"
              onClick={onShopClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>Shop Collection</span>
              <ArrowDownRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
