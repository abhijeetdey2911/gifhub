import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Search, ArrowRight } from 'lucide-react';

export const DiscoveryStrip = () => {
  const { navigate } = useShop();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/explore?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <section className="py-12 px-6 md:px-12 max-w-5xl mx-auto my-8">
      <div className="glass-panel rounded-[2.5rem] p-8 md:p-10 border border-neutral-900/10 shadow-lg text-center flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-left max-w-sm">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1 block">
            Custom Curator
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-obsidian tracking-tight">
            Looking for something specific?
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-auto flex-1 max-w-md relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search flowers, cakes, hampers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white border border-neutral-900/10 rounded-full pl-11 pr-14 py-3.5 text-xs text-obsidian focus:outline-none focus:border-obsidian shadow-inner font-medium placeholder:text-neutral-400"
            />
            <button
              type="submit"
              className="absolute right-1.5 w-9 h-9 rounded-full bg-obsidian text-cream-100 flex items-center justify-center hover:scale-105 transition-transform"
              title="Search"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
