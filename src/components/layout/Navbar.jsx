import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { Search, ShoppingBag, User, X, Heart, Sparkles, PhoneCall, Check } from 'lucide-react';

export const Navbar = () => {
  const { currentRoute, navigate, cartCount, wishlist, searchQuery, setSearchQuery, openContactModal } = useShop();
  const { user, openAuthModal, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/85 backdrop-blur-md border-b border-neutral-900/5 py-3.5 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: GIFHUB Wordmark */}
          <button
            onClick={() => handleNavClick('/')}
            className="group flex items-center gap-2 text-left focus:outline-none"
          >
            <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-obsidian uppercase font-sans group-hover:opacity-80 transition-opacity">
              GIFHUB
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-obsidian inline-block"></span>
          </button>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {[
              { label: 'Home', path: '/' },
              { label: 'Explore', path: '/explore' },
              { label: 'Best Sellers', path: '/explore?filter=bestsellers' },
              { label: 'Contact', action: openContactModal },
              { label: 'Cart', path: '/cart' },
            ].map((link) => {
              const isActive = link.path && (currentRoute === link.path || (link.path !== '/' && currentRoute.startsWith(link.path.split('?')[0])));
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.action) {
                      link.action();
                    } else {
                      handleNavClick(link.path);
                    }
                  }}
                  className={`text-xs uppercase tracking-widest font-semibold transition-all relative py-1 ${
                    isActive
                      ? 'text-obsidian font-bold'
                      : 'text-neutral-500 hover:text-obsidian'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-obsidian rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full hover:bg-neutral-900/5 transition-colors text-obsidian focus:outline-none"
              title="Search Gifts"
            >
              <Search className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => handleNavClick('/explore?filter=wishlist')}
              className="relative p-2.5 rounded-full hover:bg-neutral-900/5 transition-colors text-obsidian focus:outline-none hidden sm:flex"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4 stroke-[2]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => handleNavClick('/cart')}
              className="relative p-2.5 rounded-full hover:bg-neutral-900/5 transition-colors text-obsidian focus:outline-none flex items-center gap-1.5"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2]" />
              {cartCount > 0 && (
                <span className="bg-obsidian text-cream-100 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center -translate-y-1 -translate-x-1">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Small circular profile/menu button */}
            <div className="relative">
              <button
                onClick={() => {
                  if (user) {
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  } else {
                    openAuthModal('login');
                  }
                }}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all focus:outline-none ml-1 ${
                  user
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-obsidian text-cream-100 hover:opacity-90'
                }`}
                title={user ? `Logged in as ${user.fullName}` : 'Account Sign In'}
              >
                {user ? (
                  <span className="text-xs font-bold uppercase">{user.fullName.charAt(0)}</span>
                ) : (
                  <User className="w-4 h-4 stroke-[2.5]" />
                )}
              </button>

              {/* User Dropdown */}
              {user && isProfileDropdownOpen && (
                <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl p-4 shadow-xl border border-neutral-900/10 space-y-3 z-50">
                  <div className="pb-2 border-b border-neutral-900/10">
                    <p className="text-xs font-bold text-obsidian">{user.fullName}</p>
                    <p className="text-[10px] text-neutral-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleNavClick('/checkout');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full text-left text-xs text-neutral-700 hover:text-obsidian font-medium flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> Saved Delivery Address
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full text-left text-xs text-rose-600 font-semibold pt-1 border-t border-neutral-900/5"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-neutral-900/5 text-obsidian md:hidden"
            >
              <X className={`w-5 h-5 ${isMobileMenuOpen ? 'block' : 'hidden'}`} />
              <span className={`text-xs font-bold uppercase ${!isMobileMenuOpen ? 'block' : 'hidden'}`}>MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian/40 backdrop-blur-md md:hidden flex justify-end">
          <div className="w-4/5 max-w-sm bg-[#FAF8F5] h-full p-8 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-900/10">
                <span className="text-2xl font-bold tracking-tighter text-obsidian uppercase">
                  GIFHUB
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-900/5 text-obsidian"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Explore Gifts', path: '/explore' },
                  { label: 'Best Sellers', path: '/explore?filter=bestsellers' },
                  {
                    label: 'Contact Support',
                    action: () => {
                      setIsMobileMenuOpen(false);
                      openContactModal();
                    },
                  },
                  { label: 'Saved Wishlist', path: '/explore?filter=wishlist' },
                  { label: 'Shopping Cart', path: '/cart' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else {
                        handleNavClick(item.path);
                      }
                    }}
                    className="text-left text-lg font-medium text-obsidian hover:pl-2 transition-all"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-900/10 text-xs text-neutral-500 space-y-2">
              <p className="font-semibold text-obsidian">GIFHUB Luxury Gifting</p>
              <p>Thoughtfully chosen gifts for every moment, person and feeling.</p>
              <p className="pt-2">© 2026 GIFHUB</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-obsidian/60 backdrop-blur-md flex items-start justify-center pt-24 px-6 animate-fade-in">
          <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl border border-neutral-900/10 relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-900/5 text-neutral-500 hover:text-obsidian"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-xs uppercase tracking-widest font-semibold text-neutral-500">
                Search GIFHUB Catalog
              </span>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search flowers, chocolates, hampers, cakes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-white border border-neutral-900/10 rounded-full pl-12 pr-4 py-3.5 text-sm text-obsidian focus:outline-none focus:border-obsidian shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="bg-obsidian text-cream-100 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0"
              >
                Search
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-neutral-900/10">
              <span className="text-xs text-neutral-400 font-medium">Popular Searches:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Roses', 'Dark Chocolate', 'Birthday Hampers', 'Tiramisu Cake', 'Eternal Rose', 'Monstera Plant'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      navigate(`/explore?search=${encodeURIComponent(tag)}`);
                      setIsSearchOpen(false);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-neutral-200/60 hover:bg-obsidian hover:text-cream-100 transition-colors text-neutral-700 font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
