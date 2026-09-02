import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Gift, Sparkles, Tag } from 'lucide-react';

export const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    discountAmount,
    deliveryFee,
    cartTotal,
    navigate,
    applyPromoCode,
    promoCode,
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');
  const [includeGiftWrap, setIncludeGiftWrap] = useState(true);

  const finalTotal = cartTotal + (includeGiftWrap && cart.length > 0 ? 199 : 0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyPromoCode(inputCoupon.trim());
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-36 pb-24 px-6 md:px-12 max-w-3xl mx-auto text-center space-y-6 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-neutral-900/5 flex items-center justify-center text-neutral-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-extrabold text-obsidian tracking-tighter lowercase editorial-heading font-sans">
          your gift cart is empty.
        </h1>
        <p className="text-sm text-neutral-500 font-light max-w-sm">
          Discover our curated collection of GIFHUB floral arrangements, artisanal cakes, and luxury hampers.
        </p>
        <button
          onClick={() => navigate('/explore')}
          className="bg-obsidian text-cream-100 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all flex items-center gap-3 shadow-lg"
        >
          <span>Explore Gifts</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10 pb-6 border-b border-neutral-900/10">
        <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
          Review Selection
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-obsidian tracking-tighter lowercase editorial-heading font-sans">
          your gift cart.
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-7 space-y-6">
          {cart.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="glass-panel p-4 md:p-6 rounded-[2rem] border border-neutral-900/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
            >
              {/* Product Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-900/10">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Product Info */}
              <div className="flex-1 space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-obsidian tracking-tight">{item.name}</h3>
                <p className="text-xs text-neutral-500 font-light line-clamp-1">
                  {item.shortDescription}
                </p>

                {item.options?.deliveryDate && (
                  <p className="text-[11px] text-amber-700 font-medium pt-1">
                    Delivery: {item.options.deliveryDate}
                  </p>
                )}
              </div>

              {/* Quantity Adjuster & Controls */}
              <div className="flex flex-col items-end gap-3 shrink-0">
                <span className="text-base font-extrabold text-obsidian font-sans">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-neutral-900/15 rounded-full bg-white px-2 py-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.options)}
                      className="px-2 py-0.5 text-xs font-bold text-neutral-600 hover:text-obsidian"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-bold text-obsidian">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.options)}
                      className="px-2 py-0.5 text-xs font-bold text-neutral-600 hover:text-obsidian"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.options)}
                    className="p-2 text-neutral-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Gift Wrap Addon Card */}
          <div className="glass-panel p-5 rounded-2xl border border-neutral-900/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-obsidian uppercase tracking-wider">
                  Signature GIFHUB Ribbon & Wax Seal Wrap
                </p>
                <p className="text-[11px] text-neutral-500 font-light">
                  Hand-crafted gold-lettered ribbon, dried botanical sprig & custom wax seal (+₹199)
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={includeGiftWrap}
              onChange={(e) => setIncludeGiftWrap(e.target.checked)}
              className="w-5 h-5 accent-obsidian cursor-pointer"
            />
          </div>
        </div>

        {/* RIGHT SIDE: Order Summary */}
        <div className="lg:col-span-5">
          <div className="glass-panel p-8 rounded-[2.5rem] border border-neutral-900/10 shadow-xl space-y-6 sticky top-28">
            <h2 className="text-2xl font-extrabold text-obsidian tracking-tight font-sans">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Promo code (e.g. GIFHUB10)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="w-full bg-white border border-neutral-900/10 rounded-full pl-9 pr-3 py-2.5 text-xs text-obsidian focus:outline-none focus:border-obsidian font-medium uppercase placeholder:normal-case"
                />
              </div>
              <button
                type="submit"
                className="bg-obsidian text-cream-100 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Apply
              </button>
            </form>

            {promoCode && (
              <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                <span>Code {promoCode} Active</span>
                <span className="font-bold">10% Off</span>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-3 pt-2 text-xs border-t border-b border-neutral-900/10 py-4 font-medium text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-obsidian font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span className="font-bold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {includeGiftWrap && (
                <div className="flex justify-between text-neutral-700">
                  <span>Signature GIFHUB Gift Wrapping</span>
                  <span className="font-bold">+₹199</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span>
                  {deliveryFee === 0 ? (
                    <strong className="text-emerald-600">FREE</strong>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-baseline justify-between pt-2">
              <span className="text-sm font-bold text-obsidian uppercase tracking-wider">
                Total Amount
              </span>
              <span className="text-3xl font-extrabold text-obsidian font-sans">
                ₹{finalTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-obsidian text-cream-100 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              <span>Continue to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <span className="text-[10px] text-neutral-400 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Guaranteed fresh delivery & GIFHUB luxury packaging
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
