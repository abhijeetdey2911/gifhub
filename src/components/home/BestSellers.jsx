import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight } from 'lucide-react';

export const BestSellers = () => {
  const { PRODUCTS, navigate } = useShop();

  const bestSellerProducts = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
            Most Cherished
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-obsidian tracking-tighter lowercase font-sans">
            best sellers
          </h2>
        </div>

        <button
          onClick={() => navigate('/explore?filter=bestsellers')}
          className="text-xs uppercase tracking-widest font-bold text-obsidian flex items-center gap-2 hover:gap-3 transition-all self-start sm:self-auto group"
        >
          <span>View All Best Sellers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestSellerProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
