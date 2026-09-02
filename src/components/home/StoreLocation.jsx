import React from 'react';
import { MapPin, Clock, Navigation, Phone, Sparkles } from 'lucide-react';

export const StoreLocation = () => {
  return (
    <section id="contact" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
              Flagship Atelier
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-obsidian tracking-tighter lowercase font-sans">
              visit us
            </h2>
          </div>

          <div className="space-y-6 text-sm text-neutral-600 font-light">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-obsidian text-cream-100 flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-obsidian">GIFHUB Flagship Store</p>
                <p className="mt-1 leading-relaxed text-neutral-500">
                  42 Rosewood Avenue, Boulevard District<br />
                  Central City, CC 10042
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-900/5 text-obsidian flex items-center justify-center shrink-0 border border-neutral-900/10">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-obsidian">Opening Hours</p>
                <p className="mt-1 leading-relaxed text-neutral-500">
                  Monday – Saturday: 09:00 – 20:00<br />
                  Sunday & Holidays: 10:00 – 18:00
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-neutral-900/5 text-obsidian flex items-center justify-center shrink-0 border border-neutral-900/10">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-obsidian">Concierge & Assistance</p>
                <p className="mt-1 text-neutral-500">+1 (800) 942-6366 • hello@gifhub.com</p>
              </div>
            </div>
          </div>

          <div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-obsidian text-cream-100 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-lg"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* Right Side: Modern Abstract Local Map Visual with Glass Overlay */}
        <div className="lg:col-span-7 relative">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-900/10 bg-[#EFECE6] flex items-center justify-center p-8 group">
            {/* Minimalist Abstract Vector City Grid SVG */}
            <svg
              className="absolute inset-0 w-full h-full opacity-40 text-neutral-400 pointer-events-none"
              viewBox="0 0 800 500"
              fill="none"
            >
              <path d="M-100 150 Q200 180 500 120 T900 160" stroke="currentColor" strokeWidth="18" />
              <path d="M-100 350 Q300 300 600 380 T900 320" stroke="currentColor" strokeWidth="12" />
              <path d="M250 -100 Q220 200 280 600" stroke="currentColor" strokeWidth="14" />
              <path d="M550 -100 Q580 250 520 600" stroke="currentColor" strokeWidth="10" />
              {/* Subtle grid lines */}
              <circle cx="400" cy="250" r="180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
              <circle cx="400" cy="250" r="280" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* GIFHUB Location Pin Marker */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-obsidian text-cream-100 flex items-center justify-center shadow-2xl border-4 border-white">
                  <MapPin className="w-7 h-7 fill-cream-100 text-obsidian" />
                </div>
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
                </span>
              </div>
              <span className="mt-3 glass-pill px-4 py-1.5 rounded-full text-xs font-bold text-obsidian shadow-lg uppercase tracking-wider border border-white">
                GIFHUB Flagship
              </span>
            </div>

            {/* Small Glass Information Card */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs z-10">
              <div className="glass-panel rounded-2xl p-5 shadow-xl border border-white/80 text-obsidian space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-sm font-extrabold tracking-tighter uppercase font-sans">
                    GIFHUB STORE
                  </span>
                </div>
                <p className="text-xs font-bold text-neutral-700">
                  Your gifting destination
                </p>
                <p className="text-[11px] text-neutral-500 font-light leading-relaxed">
                  In-store floral bar, custom wax stamping & personalized gift box assembly atelier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
