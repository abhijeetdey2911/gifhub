import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  CheckCircle2,
  Lock,
  Gift,
  Check,
  PackageCheck,
  Calendar,
  AlertCircle,
} from 'lucide-react';

export const CheckoutPage = () => {
  const { cart, cartTotal, clearCart, navigate } = useShop();
  const { user, openAuthModal } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliverySlot: 'Morning (09:00 - 13:00)',
    giftMessage: '',
    paymentMethod: 'upi',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || prev.fullName,
        phone: user.phone || prev.phone,
        email: user.email || prev.email,
        address: user.address || prev.address,
        city: user.city || prev.city,
        pincode: user.pincode || prev.pincode,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errs = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter full recipient name.';
    }

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter phone number.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      errs.phone = 'Enter a valid phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please enter email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Enter a valid email address.';
    }

    if (!formData.address.trim()) {
      errs.address = 'Please enter complete delivery address.';
    }

    if (!formData.city.trim()) {
      errs.city = 'Please enter city.';
    }

    if (!formData.pincode.trim()) {
      errs.pincode = 'Please enter PIN/ZIP code.';
    }

    if (!formData.deliveryDate) {
      errs.deliveryDate = 'Please select preferred delivery date.';
    }

    return errs;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `GH-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#111111', '#D4AF37', '#FAF8F5', '#E11D48'],
      });

      clearCart();
    }, 1500);
  };

  if (cart.length === 0 && !orderConfirmed) {
    return (
      <div className="pt-36 pb-24 px-6 md:px-12 max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-obsidian">No Items in Checkout</h1>
        <p className="text-xs text-neutral-500">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/explore')}
          className="bg-obsidian text-cream-100 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider"
        >
          Explore Gifts
        </button>
      </div>
    );
  }

  if (orderConfirmed) {
    return (
      <div className="pt-36 pb-24 px-6 md:px-12 max-w-2xl mx-auto text-center space-y-6 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xl animate-bounce-subtle">
          <CheckCircle2 className="w-10 h-10 stroke-[2]" />
        </div>

        <span className="glass-pill px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-obsidian">
          Order Confirmed • #{orderId}
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-obsidian tracking-tighter lowercase editorial-heading font-sans">
          gifts are on their way.
        </h1>

        <p className="text-sm text-neutral-600 font-light max-w-md leading-relaxed">
          Thank you for choosing GIFHUB, <strong className="font-semibold">{formData.fullName}</strong>. We have dispatched confirmation details to <span className="underline font-medium">{formData.email}</span>.
        </p>

        {/* Live Delivery Timeline */}
        <div className="w-full glass-panel rounded-3xl p-6 border border-neutral-900/10 text-left space-y-4 my-4">
          <p className="text-xs font-bold uppercase tracking-wider text-obsidian">
            Order Status & Delivery Timeline
          </p>
          <div className="grid grid-cols-3 gap-2 text-center pt-2">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-obsidian text-cream-100 flex items-center justify-center text-xs font-bold mb-1">
                1
              </div>
              <span className="text-[10px] font-bold text-obsidian uppercase">Received</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-700 flex items-center justify-center text-xs font-bold mb-1">
                2
              </div>
              <span className="text-[10px] font-bold text-neutral-500 uppercase">GIFHUB Assembly</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-400 flex items-center justify-center text-xs font-bold mb-1">
                3
              </div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase">Out for Delivery</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="bg-obsidian text-cream-100 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-lg"
        >
          Return to Home Page
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8 pb-6 border-b border-neutral-900/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
            Secure GIFHUB Checkout
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-obsidian tracking-tighter lowercase editorial-heading font-sans">
            checkout & delivery.
          </h1>
        </div>

        {!user && (
          <button
            onClick={() => openAuthModal('login')}
            className="text-xs font-bold text-obsidian underline hover:opacity-80 self-start sm:self-auto"
          >
            Have an account? Sign in for fast checkout
          </button>
        )}
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT SIDE: Customer & Delivery Inputs */}
        <div className="lg:col-span-7 space-y-8">
          {/* Contact Details */}
          <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] border border-neutral-900/10 space-y-4">
            <h2 className="text-lg font-bold text-obsidian tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-obsidian text-cream-100 text-xs flex items-center justify-center font-sans">
                1
              </span>
              Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Eleanor Vance"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-2xl px-4 py-3 text-xs text-obsidian focus:outline-none font-medium ${
                    errors.fullName ? 'border-rose-500' : 'border-neutral-900/10 focus:border-obsidian'
                  }`}
                />
                {errors.fullName && <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-2xl px-4 py-3 text-xs text-obsidian focus:outline-none font-medium ${
                    errors.phone ? 'border-rose-500' : 'border-neutral-900/10 focus:border-obsidian'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="eleanor@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-2xl px-4 py-3 text-xs text-obsidian focus:outline-none font-medium ${
                    errors.email ? 'border-rose-500' : 'border-neutral-900/10 focus:border-obsidian'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Delivery Address & Schedule */}
          <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] border border-neutral-900/10 space-y-4">
            <h2 className="text-lg font-bold text-obsidian tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-obsidian text-cream-100 text-xs flex items-center justify-center font-sans">
                2
              </span>
              Recipient Address & Delivery Schedule
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                  Street Address & Apartment *
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="House No, Street name, Landmark"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-2xl px-4 py-3 text-xs text-obsidian focus:outline-none font-medium ${
                    errors.address ? 'border-rose-500' : 'border-neutral-900/10 focus:border-obsidian'
                  }`}
                />
                {errors.address && <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.address}</p>}
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Mumbai / Delhi / Bengaluru"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-2xl px-4 py-3 text-xs text-obsidian focus:outline-none font-medium ${
                    errors.city ? 'border-rose-500' : 'border-neutral-900/10 focus:border-obsidian'
                  }`}
                />
                {errors.city && <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.city}</p>}
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                  PIN/ZIP Code *
                </label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="400001"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-2xl px-4 py-3 text-xs text-obsidian focus:outline-none font-medium ${
                    errors.pincode ? 'border-rose-500' : 'border-neutral-900/10 focus:border-obsidian'
                  }`}
                />
                {errors.pincode && <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.pincode}</p>}
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-600" /> Delivery Date *
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-2xl px-4 py-3 text-xs text-obsidian focus:outline-none font-medium ${
                    errors.deliveryDate ? 'border-rose-500' : 'border-neutral-900/10 focus:border-obsidian'
                  }`}
                />
                {errors.deliveryDate && <p className="text-[10px] text-rose-600 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.deliveryDate}</p>}
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                  Preferred Time Window
                </label>
                <select
                  name="deliverySlot"
                  value={formData.deliverySlot}
                  onChange={handleChange}
                  className="w-full bg-white border border-neutral-900/10 rounded-2xl px-4 py-3 text-xs text-obsidian focus:outline-none font-medium cursor-pointer"
                >
                  <option>Morning (09:00 - 13:00)</option>
                  <option>Afternoon (13:00 - 17:00)</option>
                  <option>Evening Express (17:00 - 21:00)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block flex items-center gap-1">
                  <Gift className="w-3 h-3 text-rose-500" /> GIFHUB Wax-Sealed Note Card Message
                </label>
                <textarea
                  rows={2}
                  name="giftMessage"
                  placeholder="Enter message for recipient..."
                  value={formData.giftMessage}
                  onChange={handleChange}
                  className="w-full bg-white border border-neutral-900/10 rounded-2xl p-3 text-xs text-obsidian focus:outline-none font-medium"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] border border-neutral-900/10 space-y-4">
            <h2 className="text-lg font-bold text-obsidian tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-obsidian text-cream-100 text-xs flex items-center justify-center font-sans">
                3
              </span>
              Select Payment Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'upi', label: 'UPI / QR Code', icon: QrCode, sub: 'Google Pay, PhonePe, Paytm' },
                { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, sub: 'Visa, Mastercard, Amex' },
                { id: 'cod', label: 'Cash on Delivery', icon: Truck, sub: 'Pay upon doorstep receipt' },
              ].map((pm) => {
                const isSelected = formData.paymentMethod === pm.id;
                const IconComp = pm.icon;
                return (
                  <div
                    key={pm.id}
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: pm.id }))}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-obsidian bg-white shadow-md'
                        : 'border-neutral-900/10 bg-white/50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <IconComp className="w-5 h-5 text-obsidian" />
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
                    </div>
                    <p className="text-xs font-bold text-obsidian">{pm.label}</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">{pm.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Summary & Action */}
        <div className="lg:col-span-5">
          <div className="glass-panel p-8 rounded-[2.5rem] border border-neutral-900/10 shadow-xl space-y-6 sticky top-28">
            <h2 className="text-xl font-extrabold text-obsidian tracking-tight">
              Order Summary ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h2>

            <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 py-2 border-b border-neutral-900/5 text-xs">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-bold text-obsidian">{item.name}</p>
                    <p className="text-[10px] text-neutral-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-obsidian">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-baseline justify-between border-t border-neutral-900/10">
              <span className="text-xs font-bold text-obsidian uppercase">Total Payable</span>
              <span className="text-2xl font-extrabold text-obsidian font-sans">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-obsidian text-cream-100 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Securing Order...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Place Order</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-400 pt-2">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-emerald-600" /> Encrypted Payment</span>
              <span>•</span>
              <span className="flex items-center gap-1"><PackageCheck className="w-3 h-3 text-amber-600" /> GIFHUB Guarantee</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
