import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Sparkles, Star, Heart } from 'lucide-react';

export const HeroSection = () => {
  const { navigate, userRating, setUserRating } = useShop();

  const handleStarClick = (ratingValue) => {
    setUserRating(ratingValue);
  };

  return (
    <section className="relative pt-20 pb-12 md:pt-24 md:pb-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Background Soft Blurred Orbs */}
      <div className="absolute top-5 left-1/4 w-[400px] h-[400px] bg-amber-200/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-5 right-10 w-[350px] h-[350px] bg-rose-100/30 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Side: Editorial Typography & Actions */}
        <div className="lg:col-span-6 space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-neutral-900/5 border border-neutral-900/10 text-[11px] font-semibold uppercase tracking-widest text-neutral-600 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>GIFHUB Luxury Gifting</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold text-obsidian tracking-tighter leading-[0.92] editorial-heading lowercase font-sans">
            gifts
            <br />
            worth
            <br />
            remembering.
          </h1>

          <p className="text-base text-neutral-600 font-light max-w-md leading-relaxed">
            Thoughtfully chosen gifts for every moment, person and feeling.
          </p>

          {/* Minimal Pill Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={() => navigate('/explore')}
              className="bg-obsidian text-cream-100 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-lg flex items-center gap-3 group"
            >
              <span>Explore Gifts</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/explore?filter=bestsellers')}
              className="bg-transparent border border-neutral-900/20 text-obsidian px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-900/5 transition-all"
            >
              Shop Best Sellers
            </button>
          </div>

          {/* INTERACTIVE RATING STRIP (Visible immediately without scrolling) */}
          <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-neutral-900/10 text-xs text-neutral-600">
            {/* Interactive Stars Selection */}
            <div className="flex items-center gap-1">
              <span className="font-bold text-obsidian mr-1">Rate Experience:</span>
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  key={starIndex}
                  onClick={() => handleStarClick(starIndex)}
                  className="p-1 hover:scale-125 transition-transform focus:outline-none"
                  title={`Rate ${starIndex} out of 5 stars`}
                >
                  <Star
                    className={`w-4 h-4 transition-colors ${
                      starIndex <= userRating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-transparent text-neutral-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-neutral-900/10 shadow-xs">
              <span className="font-extrabold text-obsidian">{userRating}.0/5</span>
              <span className="text-[10px] text-neutral-400 font-medium">(Selected Rating)</span>
            </div>

            <span className="w-1 h-1 rounded-full bg-neutral-300 hidden sm:inline-block"></span>
            <span className="hidden sm:inline-block font-medium">Same-Day Express Delivery</span>
          </div>
        </div>

        {/* Right Side: NEW FRESH LUXURY GIFT IMAGE WITH FLOATING GLASS BADGE */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
          {/* Main Hero Image Container */}
          <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-900/10 bg-neutral-100">
            <img
              src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1200&auto=format&fit=crop"
              alt="GIFHUB luxury eternal rose & candle gift box arrangement"
              className="w-full h-full object-cover"
            />
            {/* Subtle Inner Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 via-transparent to-transparent pointer-events-none" />

            {/* Bottom Inner Left Badge */}
            <div className="absolute bottom-6 left-6 max-w-[210px] hidden sm:block">
              <div className="glass-panel rounded-2xl p-3.5 text-obsidian shadow-lg border border-white/60">
                <p className="text-xs font-bold uppercase tracking-wider text-obsidian">Curated Hampers</p>
                <p className="text-[10px] text-neutral-500 font-medium">Bespoke arrangements & treats</p>
              </div>
            </div>
          </div>

          {/* FLOATING GLASS BADGE FROM SCREENSHOT ("THE 2026 COLLECTION") */}
          <div className="absolute -bottom-5 right-4 md:-right-4 glass-panel p-4 rounded-2xl shadow-xl border border-white/70 flex items-center gap-3.5 z-20 bg-white/85 backdrop-blur-md">
            <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-600 shrink-0">
              <Sparkles className="w-5 h-5 text-amber-600 fill-amber-500/20" />
            </div>
            <div>
              <p className="text-xs font-bold text-obsidian uppercase tracking-wider font-sans">
                THE 2026 COLLECTION
              </p>
              <p className="text-[11px] text-neutral-500 font-light">
                GIFHUB embossed artisan boxes
              </p>
            </div>
          </div>

          {/* Top Circular Floating Image Tag */}
          <div className="absolute -top-3 -right-2 md:right-4 w-18 h-18 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-[#FAF8F5] shadow-lg z-20">
            <img
              src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=400&auto=format&fit=crop"
              alt="Rose detail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
