import React, { useState, useEffect, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES, OCCASIONS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Search, SlidersHorizontal, X, Heart, Sparkles, RotateCcw } from 'lucide-react';

export const ExplorePage = () => {
  const { PRODUCTS, routeParams, wishlist } = useShop();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [isWishlistOnly, setIsWishlistOnly] = useState(false);

  useEffect(() => {
    if (routeParams.category) {
      setSelectedCategory(routeParams.category);
    } else {
      setSelectedCategory('all');
    }

    if (routeParams.occasion) {
      setSelectedOccasion(routeParams.occasion);
    } else {
      setSelectedOccasion('all');
    }

    if (routeParams.search) {
      setSearchFilter(routeParams.search);
    }

    if (routeParams.filter === 'wishlist') {
      setIsWishlistOnly(true);
    } else {
      setIsWishlistOnly(false);
    }
  }, [routeParams]);

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (isWishlistOnly) {
      return wishlist;
    }

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedOccasion !== 'all') {
      list = list.filter((p) => p.occasion === selectedOccasion);
    }

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.occasion.toLowerCase().includes(q)
      );
    }

    if (routeParams.filter === 'bestsellers') {
      list = list.filter((p) => p.isBestSeller);
    } else if (routeParams.filter === 'featured') {
      list = list.filter((p) => p.isFeatured);
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [PRODUCTS, selectedCategory, selectedOccasion, searchFilter, sortBy, isWishlistOnly, wishlist, routeParams]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedOccasion('all');
    setSearchFilter('');
    setSortBy('recommended');
    setIsWishlistOnly(false);
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Top Banner */}
      <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-900/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
            {isWishlistOnly ? 'Saved Favorites' : 'The GIFHUB Catalog'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-obsidian tracking-tighter lowercase editorial-heading font-sans">
            {isWishlistOnly ? 'saved wishlist.' : 'explore gifts.'}
          </h1>
        </div>

        {/* Search Bar Input */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search GIFHUB gifts..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-white border border-neutral-900/10 rounded-full pl-11 pr-10 py-3 text-xs text-obsidian focus:outline-none focus:border-obsidian shadow-sm font-medium"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-obsidian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* FILTER PILLS BAR */}
      <div className="space-y-5 mb-8">
        {/* Categories Pills */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2 block">
            Category
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id && !isWishlistOnly;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setIsWishlistOnly(false);
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-obsidian text-cream-100 shadow-md scale-105'
                      : 'bg-white text-neutral-700 hover:bg-neutral-200/70 border border-neutral-900/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Occasion Filter Pills */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2 block">
            Occasion
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setIsWishlistOnly(false);
                setSelectedOccasion('all');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedOccasion === 'all' && !isWishlistOnly
                  ? 'bg-neutral-800 text-cream-100'
                  : 'bg-neutral-200/60 text-neutral-600 hover:bg-neutral-300'
              }`}
            >
              All Occasions
            </button>

            {OCCASIONS.map((occ) => {
              const isActive = selectedOccasion === occ.id && !isWishlistOnly;
              return (
                <button
                  key={occ.id}
                  onClick={() => {
                    setIsWishlistOnly(false);
                    setSelectedOccasion(occ.id);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-obsidian text-cream-100 shadow-sm'
                      : 'bg-neutral-200/60 text-neutral-600 hover:bg-neutral-300'
                  }`}
                >
                  {occ.name}
                </button>
              );
            })}

            {/* Wishlist Quick Pill */}
            <button
              onClick={() => setIsWishlistOnly(!isWishlistOnly)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isWishlistOnly
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlistOnly ? 'fill-white' : ''}`} />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>
        </div>

        {/* Sorting & Filter Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-neutral-900/5 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-obsidian">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'gift item' : 'gift items'}
            </span>
            {(selectedCategory !== 'all' || selectedOccasion !== 'all' || searchFilter || isWishlistOnly) && (
              <button
                onClick={resetFilters}
                className="text-rose-600 hover:underline flex items-center gap-1 ml-3 font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> Reset Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-neutral-900/10 rounded-full px-3 py-1.5 text-xs font-semibold text-obsidian focus:outline-none cursor-pointer"
            >
              <option value="recommended">Featured / Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-[2.5rem] border border-neutral-900/10 max-w-md mx-auto space-y-4">
          <Sparkles className="w-10 h-10 text-neutral-400 mx-auto" />
          <h3 className="text-xl font-bold text-obsidian">No gifts matched your filters</h3>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto">
            Try adjusting your search terms, choosing a different category, or resetting active filters.
          </p>
          <button
            onClick={resetFilters}
            className="bg-obsidian text-cream-100 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
