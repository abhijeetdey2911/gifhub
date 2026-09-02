import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowUpRight, Globe } from 'lucide-react';

export const Footer = () => {
  const { navigate, openContactModal } = useShop();

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <footer className="bg-obsidian text-cream-100 pt-20 pb-12 px-6 md:px-12 rounded-t-[2.5rem] mt-24 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase font-sans">
              GIFHUB
            </h2>
            <p className="text-sm md:text-base text-neutral-400 max-w-md font-light leading-relaxed">
              Thoughtful gifting, made memorable. Curated luxury floral arrangements, artisanal treats, and eternal keepsakes for life’s most precious moments.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram SVG */}
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white hover:bg-white/10 transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Twitter X SVG */}
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white hover:bg-white/10 transition-all"
                aria-label="X Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Facebook SVG */}
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white hover:bg-white/10 transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>

              {/* Globe */}
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white hover:border-white hover:bg-white/10 transition-all"
                aria-label="Global Store"
              >
                <Globe className="w-4 h-4 stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Quick Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: Explore */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">
                Explore
              </h3>
              <ul className="space-y-3 text-xs md:text-sm text-neutral-300">
                {['All Gifts', 'Best Sellers', 'New Arrivals', 'Featured Edit'].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleLinkClick('/explore')}
                      className="hover:text-white transition-colors flex items-center gap-1 group text-left"
                    >
                      {link}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Occasions */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">
                Occasions
              </h3>
              <ul className="space-y-3 text-xs md:text-sm text-neutral-300">
                {['Birthday', 'Anniversary', 'Celebration', 'Thank You', 'Just Because', 'Congratulations'].map((occ) => (
                  <li key={occ}>
                    <button
                      onClick={() => handleLinkClick(`/explore?occasion=${occ.toLowerCase().replace(' ', '-')}`)}
                      className="hover:text-white transition-colors text-left"
                    >
                      {occ}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Categories */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">
                Categories
              </h3>
              <ul className="space-y-3 text-xs md:text-sm text-neutral-300">
                {['Flowers', 'Cakes', 'Chocolates', 'Hampers', 'Plants', 'Personalized Gifts', 'Gift Boxes'].map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => handleLinkClick(`/explore?category=${cat.toLowerCase().replace(' ', '-').replace('-gifts', '')}`)}
                      className="hover:text-white transition-colors text-left"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Support */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-4">
                Support
              </h3>
              <ul className="space-y-3 text-xs md:text-sm text-neutral-300">
                <li>
                  <button onClick={openContactModal} className="hover:text-white transition-colors text-left">
                    Contact Us
                  </button>
                </li>
                <li><a href="#contact" className="hover:text-white transition-colors">Store Locator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Care Instructions</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 GIFHUB Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
