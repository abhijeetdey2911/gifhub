import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Phone, Mail, MapPin, Clock, X, Sparkles } from 'lucide-react';

export const ContactModal = () => {
  const { isContactModalOpen, closeContactModal } = useShop();

  if (!isContactModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-obsidian/60 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-[#FAF8F5] w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-neutral-900/10 relative space-y-6">
        {/* Close Button */}
        <button
          onClick={closeContactModal}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-neutral-900/5 hover:bg-neutral-900/10 text-neutral-600 hover:text-obsidian transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-obsidian text-cream-100 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Concierge & Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-obsidian tracking-tighter uppercase font-sans">
            GIFHUB
          </h2>
          <p className="text-lg font-bold text-neutral-700 font-sans">How can we help?</p>
        </div>

        {/* Info Grid */}
        <div className="space-y-4 text-xs md:text-sm text-neutral-600 font-light border-t border-b border-neutral-900/10 py-5">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-neutral-900/5 text-obsidian flex items-center justify-center shrink-0 border border-neutral-900/10">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-obsidian">Phone Support</p>
              <p className="text-neutral-500 mt-0.5">+1 (800) 942-6366 / +91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-neutral-900/5 text-obsidian flex items-center justify-center shrink-0 border border-neutral-900/10">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-obsidian">Direct Email</p>
              <p className="text-neutral-500 mt-0.5">hello@gifhub.com / concierge@gifhub.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-neutral-900/5 text-obsidian flex items-center justify-center shrink-0 border border-neutral-900/10">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-obsidian">Atelier Address</p>
              <p className="text-neutral-500 mt-0.5 leading-relaxed">
                42 Rosewood Avenue, Boulevard District<br />
                Central City, CC 10042
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-neutral-900/5 text-obsidian flex items-center justify-center shrink-0 border border-neutral-900/10">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-obsidian">Business Hours</p>
              <p className="text-neutral-500 mt-0.5">
                Monday – Saturday: 09:00 – 20:00<br />
                Sunday & Holidays: 10:00 – 18:00
              </p>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-2 text-center">
          <button
            onClick={closeContactModal}
            className="w-full bg-obsidian text-cream-100 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
