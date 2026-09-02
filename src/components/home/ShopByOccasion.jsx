import React from 'react';
import { useShop } from '../../context/ShopContext';
import { OCCASIONS } from '../../data/products';
import { ArrowUpRight } from 'lucide-react';

export const ShopByOccasion = () => {
  const { navigate } = useShop();

  const handleOccasionClick = (id) => {
    navigate(`/explore?occasion=${id}`);
  };

  return (
    <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
            Occasion Collections
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-obsidian tracking-tighter lowercase font-sans">
            made for the moment
          </h2>
        </div>
        <p className="text-sm text-neutral-500 max-w-sm leading-relaxed font-light">
          Whether celebrating major life milestones or spontaneous days of gratitude, explore gifts curated by emotion.
        </p>
      </div>

      {/* Editorial Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {OCCASIONS.map((occasion) => (
          <div
            key={occasion.id}
            onClick={() => handleOccasionClick(occasion.id)}
            className="group relative h-80 rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1.5 border border-neutral-900/10"
          >
            {/* Image */}
            <img
              src={occasion.image}
              alt={occasion.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Dark Translucent Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/30 to-transparent group-hover:from-obsidian/90 transition-colors duration-300" />

            {/* Top Tagline Badge */}
            <div className="absolute top-5 left-5">
              <span className="glass-pill px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-obsidian">
                {occasion.tagline}
              </span>
            </div>

            {/* Arrow Button Top Right */}
            <div className="absolute top-5 right-5 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-obsidian opacity-80 group-hover:opacity-100 group-hover:bg-white group-hover:scale-110 transition-all">
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            {/* Card Bottom Content */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <h3 className="text-2xl font-bold tracking-tight group-hover:text-cream-100 transition-colors">
                {occasion.name}
              </h3>
              <p className="text-xs text-neutral-300 line-clamp-2 font-light opacity-90">
                {occasion.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
