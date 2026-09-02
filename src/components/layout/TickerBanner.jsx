import React from 'react';
import { Sparkles } from 'lucide-react';

export const TickerBanner = () => {
  const items = [
    'MAKE THEM SMILE',
    'CELEBRATE THE MOMENT',
    'SEND SOMETHING SPECIAL',
    'GIFHUB LUXURY GIFTING',
    'CRAFTED WITH CARE',
    'MEMORABLE MOMENTS',
  ];

  return (
    <div className="w-full border-y border-neutral-900/10 py-3.5 bg-[#FAF8F5] overflow-hidden select-none relative">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 px-4">
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-neutral-800 font-sans">
              {text}
            </span>
            <Sparkles className="w-3 h-3 text-neutral-400 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
