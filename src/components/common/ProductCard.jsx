import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Heart, Plus, Minus, Star, ShoppingBag } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { navigate, addToCart, updateQuantity, getItemQuantity, toggleWishlist, isInWishlist } = useShop();

  const isFavorite = isInWishlist(product.id);
  const cartQty = getItemQuantity(product.id);

  const handleCardClick = (e) => {
    // Prevent navigation if clicking interactive action buttons
    if (e.target.closest('.action-btn')) return;
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-[#FAF8F5] rounded-[2rem] p-3.5 md:p-4 border border-neutral-900/10 hover:border-neutral-900/20 transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col justify-between"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full rounded-[1.5rem] overflow-hidden bg-neutral-100 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-obsidian shadow-sm">
              Best Seller
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-obsidian text-cream-100 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase">
              Save ₹{product.originalPrice - product.price}
            </span>
          )}
        </div>

        {/* Wishlist Button Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`action-btn absolute top-3 right-3 w-9 h-9 rounded-full glass-panel flex items-center justify-center transition-all z-10 ${
            isFavorite
              ? 'text-rose-500 bg-white shadow-md scale-105'
              : 'text-neutral-700 hover:text-rose-500 hover:bg-white'
          }`}
          title={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>

        {/* QUICK CART ACTIONS OVERLAY AT BOTTOM RIGHT OF IMAGE */}
        <div className="absolute bottom-3 right-3 z-10">
          {cartQty > 0 ? (
            <div className="action-btn glass-panel rounded-full px-2 py-1 flex items-center gap-2 border border-neutral-900/20 shadow-lg bg-white/95">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(product.id, cartQty - 1);
                }}
                className="w-6 h-6 rounded-full bg-neutral-100 hover:bg-neutral-200 text-obsidian flex items-center justify-center font-bold text-xs"
                title="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-bold text-obsidian px-1">{cartQty}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(product.id, cartQty + 1);
                }}
                className="w-6 h-6 rounded-full bg-obsidian text-cream-100 hover:bg-neutral-800 flex items-center justify-center font-bold text-xs"
                title="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="action-btn w-10 h-10 rounded-full bg-obsidian text-cream-100 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg"
              title="Add to Cart"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="px-1 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-700">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        <h3 className="text-base font-bold text-obsidian tracking-tight group-hover:text-neutral-700 transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-neutral-500 font-light line-clamp-1">
          {product.shortDescription}
        </p>

        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-obsidian font-sans">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through font-light">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Additional Inline Add to Cart Button if quantity == 0 */}
          {cartQty === 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="action-btn text-[11px] font-bold uppercase tracking-wider text-obsidian hover:text-neutral-600 flex items-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
