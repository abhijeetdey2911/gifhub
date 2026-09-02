import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Heart,
  ShoppingBag,
  Star,
  CheckCircle2,
  Calendar,
  Gift,
  Truck,
  ShieldCheck,
  ChevronDown,
  ArrowLeft,
  Share2,
} from 'lucide-react';

export const ProductDetailPage = ({ productId }) => {
  const { PRODUCTS, addToCart, getItemQuantity, toggleWishlist, isInWishlist, navigate } = useShop();

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const existingQty = getItemQuantity(product.id);

  const [selectedImage, setSelectedImage] = useState(
    product.gallery?.[0] || product.image
  );
  const [quantity, setQuantity] = useState(existingQty > 0 ? existingQty : 1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [openAccordion, setOpenAccordion] = useState('inclusions');

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      deliveryDate,
      giftMessage,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, {
      deliveryDate,
      giftMessage,
    });
    navigate('/cart');
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/explore')}
          className="text-xs uppercase tracking-widest font-semibold text-neutral-500 hover:text-obsidian flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </button>

        <div className="flex items-center gap-4 text-neutral-400">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2 rounded-full border border-neutral-900/10 hover:border-neutral-900/30 transition-all ${
              isFavorite ? 'text-rose-500 bg-rose-50 border-rose-200' : 'text-neutral-600'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>
          <button className="p-2 rounded-full border border-neutral-900/10 hover:border-neutral-900/30 transition-all text-neutral-600">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT SIDE: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden bg-neutral-100 border border-neutral-900/10 shadow-xl group">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {product.isBestSeller && (
              <span className="absolute top-5 left-5 glass-pill px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-obsidian shadow-sm">
                Best Seller
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {product.gallery.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === imgUrl
                      ? 'border-obsidian scale-105 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} preview ${index}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: Product Info & Actions */}
        <div className="lg:col-span-5 space-y-7">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
                {product.category}
              </span>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-1 text-xs font-bold text-obsidian">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-neutral-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-obsidian tracking-tighter leading-tight font-sans">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-obsidian font-sans">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-neutral-400 line-through font-light">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                Taxes included
              </span>
            </div>
          </div>

          <p className="text-sm text-neutral-600 font-light leading-relaxed">
            {product.description}
          </p>

          {/* Delivery Date Picker */}
          <div className="glass-panel rounded-2xl p-4 border border-neutral-900/10 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-obsidian flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Preferred Delivery Date</span>
            </label>
            <input
              type="date"
              value={deliveryDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full bg-white border border-neutral-900/10 rounded-xl px-4 py-2.5 text-xs text-obsidian focus:outline-none focus:border-obsidian font-medium"
            />
            <p className="text-[11px] text-neutral-500">{product.deliveryNotice}</p>
          </div>

          {/* Optional Personalization Message */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-obsidian flex items-center gap-2">
              <Gift className="w-4 h-4 text-rose-500" />
              <span>Personalized GIFHUB Wax-Sealed Note (Optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Write your custom gift message here..."
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              className="w-full bg-white border border-neutral-900/10 rounded-2xl p-3.5 text-xs text-obsidian focus:outline-none focus:border-obsidian font-medium shadow-inner placeholder:text-neutral-400"
            />
          </div>

          {/* Quantity & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-obsidian">
                Quantity:
              </span>
              <div className="flex items-center border border-neutral-900/15 rounded-full bg-white px-3 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-sm font-bold text-neutral-600 hover:text-obsidian"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-obsidian">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 text-sm font-bold text-neutral-600 hover:text-obsidian"
                >
                  +
                </button>
              </div>

              {existingQty > 0 && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {existingQty} in cart
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="bg-obsidian text-cream-100 px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{existingQty > 0 ? 'Update Cart' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-amber-600 text-white px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-amber-700 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Features Accordion */}
          <div className="border-t border-neutral-900/10 pt-6 space-y-3">
            {/* Inclusions */}
            <div className="border border-neutral-900/10 rounded-2xl overflow-hidden bg-white">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'inclusions' ? '' : 'inclusions')}
                className="w-full px-5 py-3.5 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-obsidian"
              >
                <span>Box Inclusions & Branding</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'inclusions' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'inclusions' && (
                <div className="px-5 pb-4 text-xs text-neutral-600 space-y-2 border-t border-neutral-900/5 pt-3">
                  {product.inclusions?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Shipping & Returns */}
            <div className="border border-neutral-900/10 rounded-2xl overflow-hidden bg-white">
              <button
                onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                className="w-full px-5 py-3.5 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-obsidian"
              >
                <span>Shipping & Guarantee</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'shipping' && (
                <div className="px-5 pb-4 text-xs text-neutral-600 space-y-2 border-t border-neutral-900/5 pt-3">
                  <p className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-obsidian" /> Hand-delivered with temperature control.
                  </p>
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-obsidian" /> 100% GIFHUB Quality Guarantee or instant replacement.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
