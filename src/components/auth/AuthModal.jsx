import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Lock, User, Phone, Mail, MapPin, Building, Hash, Sparkles } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (authMode === 'login') {
      if (!formData.email.trim()) {
        setErrors({ email: 'Please enter your email.' });
        return;
      }
      if (!formData.password) {
        setErrors({ password: 'Please enter your password.' });
        return;
      }
      login(formData.email, formData.password);
    } else {
      const res = register(formData);
      if (!res.success) {
        setErrors(res.errors);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-obsidian/60 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in overflow-y-auto">
      <div className="bg-[#FAF8F5] w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-neutral-900/10 relative my-8">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900/5 hover:bg-neutral-900/10 text-neutral-600 hover:text-obsidian transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian text-cream-100 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>GIFHUB Member Concierge</span>
          </div>
          <h2 className="text-3xl font-extrabold text-obsidian tracking-tighter uppercase font-sans">
            GIFHUB
          </h2>
          <p className="text-xs text-neutral-500 font-light">
            {authMode === 'login' ? 'Sign in to access your saved gifts & fast checkout.' : 'Create an account for seamless gifting & order tracking.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-neutral-200/60 rounded-full p-1 mb-6 text-xs font-bold">
          <button
            onClick={() => {
              setAuthMode('login');
              setErrors({});
            }}
            className={`flex-1 py-2 rounded-full transition-all ${
              authMode === 'login' ? 'bg-obsidian text-cream-100 shadow-md' : 'text-neutral-600 hover:text-obsidian'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setAuthMode('register');
              setErrors({});
            }}
            className={`flex-1 py-2 rounded-full transition-all ${
              authMode === 'register' ? 'bg-obsidian text-cream-100 shadow-md' : 'text-neutral-600 hover:text-obsidian'
            }`}
          >
            Register Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {authMode === 'register' && (
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Eleanor Vance"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-2xl pl-10 pr-4 py-2.5 text-xs text-obsidian focus:outline-none font-medium ${
                    errors.fullName ? 'border-rose-500 focus:border-rose-600' : 'border-neutral-900/10 focus:border-obsidian'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{errors.fullName}</p>}
            </div>
          )}

          {authMode === 'register' && (
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-2xl pl-10 pr-4 py-2.5 text-xs text-obsidian focus:outline-none font-medium ${
                    errors.phone ? 'border-rose-500 focus:border-rose-600' : 'border-neutral-900/10 focus:border-obsidian'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{errors.phone}</p>}
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                name="email"
                placeholder="eleanor@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-white border rounded-2xl pl-10 pr-4 py-2.5 text-xs text-obsidian focus:outline-none font-medium ${
                  errors.email ? 'border-rose-500 focus:border-rose-600' : 'border-neutral-900/10 focus:border-obsidian'
                }`}
              />
            </div>
            {errors.email && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{errors.email}</p>}
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-white border rounded-2xl pl-10 pr-4 py-2.5 text-xs text-obsidian focus:outline-none font-medium ${
                  errors.password ? 'border-rose-500 focus:border-rose-600' : 'border-neutral-900/10 focus:border-obsidian'
                }`}
              />
            </div>
            {errors.password && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{errors.password}</p>}
          </div>

          {authMode === 'register' && (
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-white border rounded-2xl pl-10 pr-4 py-2.5 text-xs text-obsidian focus:outline-none font-medium ${
                    errors.confirmPassword ? 'border-rose-500 focus:border-rose-600' : 'border-neutral-900/10 focus:border-obsidian'
                  }`}
                />
              </div>
              {errors.confirmPassword && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{errors.confirmPassword}</p>}
            </div>
          )}

          {authMode === 'register' && (
            <>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                  Default Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-neutral-400" />
                  <input
                    type="text"
                    name="address"
                    placeholder="House No, Street, Landmark"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full bg-white border rounded-2xl pl-10 pr-4 py-2.5 text-xs text-obsidian focus:outline-none font-medium ${
                      errors.address ? 'border-rose-500' : 'border-neutral-900/10'
                    }`}
                  />
                </div>
                {errors.address && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                    City *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      name="city"
                      placeholder="Mumbai"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full bg-white border rounded-2xl pl-10 pr-4 py-2.5 text-xs text-obsidian focus:outline-none font-medium ${
                        errors.city ? 'border-rose-500' : 'border-neutral-900/10'
                      }`}
                    />
                  </div>
                  {errors.city && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{errors.city}</p>}
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1 block">
                    PIN/ZIP Code *
                  </label>
                  <div className="relative">
                    <Hash className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      name="pincode"
                      placeholder="400001"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full bg-white border rounded-2xl pl-10 pr-4 py-2.5 text-xs text-obsidian focus:outline-none font-medium ${
                        errors.pincode ? 'border-rose-500' : 'border-neutral-900/10'
                      }`}
                    />
                  </div>
                  {errors.pincode && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{errors.pincode}</p>}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-obsidian text-cream-100 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-lg mt-4"
          >
            {authMode === 'login' ? 'Sign In to Account' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};
