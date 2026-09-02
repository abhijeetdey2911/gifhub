import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/products';
import { Flower2, Cake, Cookie, Gift, Leaf, Sparkles, Package, ArrowRight } from 'lucide-react';

const CATEGORY_IMAGES = {
  flowers: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=600&auto=format&fit=crop',
  cakes: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop',
  chocolates: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=600&auto=format&fit=crop',
  hampers: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
  plants: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=600&auto=format&fit=crop',
  personalized: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
  'gift-boxes': 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop',
};

const ICON_MAP = {
  Flower2,
  Cake,
  Cookie,
  Gift,
  Leaf,
  Sparkles,
  Package,
};

export const ShopByCategory = () => {
  const { navigate } = useShop();

  const handleCategoryClick = (id) => {
    if (id === 'all') {
      navigate('/explore');
    } else {
      navigate(`/explore?category=${id}`);
    }
  };

  const activeCategories = CATEGORIES.filter((cat) => cat.id !== 'all');

  return (
    <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
            Curated Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-obsidian tracking-tighter lowercase font-sans">
            find the right gift
          </h2>
        </div>

        <button
          onClick={() => navigate('/explore')}
          className="text-xs uppercase tracking-widest font-bold text-obsidian flex items-center gap-2 hover:gap-3 transition-all self-start sm:self-auto group"
        >
          <span>View All Categories</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Category Pills/Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        {activeCategories.map((category) => {
          const IconComponent = ICON_MAP[category.icon] || Gift;
          const bgImage = CATEGORY_IMAGES[category.id];

          return (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group relative h-48 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-neutral-900/10 flex flex-col justify-between p-4"
            >
              {/* Background Image */}
              {bgImage && (
                <img
                  src={bgImage}
                  alt={category.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/40 to-obsidian/10 group-hover:from-obsidian/95 transition-colors" />

              {/* Top Icon Pill */}
              <div className="relative z-10 self-start">
                <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-obsidian group-hover:bg-white transition-colors">
                  <IconComponent className="w-4 h-4 stroke-[2]" />
                </div>
              </div>

              {/* Category Label */}
              <div className="relative z-10">
                <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-cream-100 transition-colors">
                  {category.label}
                </h3>
                <span className="text-[10px] text-neutral-300 font-light flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop category <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
