import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const FeaturedEdit = () => {
  const { navigate } = useShop();

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto my-12">
      <div className="relative rounded-[3rem] bg-[#F5F2EC] p-8 md:p-16 border border-neutral-900/5 overflow-hidden">
        {/* Soft Background Blurred Orbs */}
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-rose-200/30 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-amber-200/30 rounded-full blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Side: Large Editorial Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-900/10 group">
              <img
                src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1000&auto=format&fit=crop"
                alt="The GIFHUB Edit curated luxury box"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Glass Pill */}
            <div className="absolute -bottom-6 right-6 md:-right-6 glass-panel p-4 rounded-2xl shadow-xl border border-white/50 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-obsidian uppercase tracking-wider">The 2026 Collection</p>
                <p className="text-[11px] text-neutral-500 font-light">GIFHUB embossed artisan boxes</p>
              </div>
            </div>
          </div>

          {/* Right Side: Editorial Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-obsidian text-cream-100 text-[10px] font-bold uppercase tracking-widest">
              <span>THE GIFHUB EDIT</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-obsidian tracking-tighter leading-[0.95] lowercase editorial-heading font-sans">
              small gestures.
              <br />
              big memories.
            </h2>

            <p className="text-base text-neutral-600 font-light leading-relaxed max-w-md">
              We believe the grandest emotions are wrapped in quiet, beautiful details. Each GIFHUB Edit box is hand-assembled with silk-wrapped flowers, single-origin confectionery, and gold wax seals.
            </p>

            <ul className="space-y-3 pt-2 text-xs font-medium text-neutral-700">
              {['GIFHUB printed satin ribbon & gold foil seals', 'Hand-written wax-sealed calligraphic card', 'Insulated temperature-monitored direct city delivery'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button
                onClick={() => navigate('/explore?filter=featured')}
                className="bg-obsidian text-cream-100 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all flex items-center gap-3 group shadow-lg"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
