import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Navigation / Routing State
  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.pathname || '/';
  });

  const [routeParams, setRouteParams] = useState({});

  // Cart State (stored in localStorage if available)
  const [cart, setCart] = useState(() => {
    try {
      const localData = localStorage.getItem('gifhub_cart');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const localData = localStorage.getItem('gifhub_wishlist');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  // Active search query
  const [searchQuery, setSearchQuery] = useState('');

  // Toast Notification State
  const [toast, setToast] = useState(null);

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Contact Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Interactive Session Hero Rating (1 to 5 stars)
  const [userRating, setUserRating] = useState(5);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('gifhub_cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Cart sync error', err);
    }
  }, [cart]);

  // Save wishlist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('gifhub_wishlist', JSON.stringify(wishlist));
    } catch (err) {
      console.error('Wishlist sync error', err);
    }
  }, [wishlist]);

  // Custom Navigate Function
  const navigate = (path, params = {}) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (path.includes('?')) {
      const [basePath, queryString] = path.split('?');
      const searchParams = new URLSearchParams(queryString);
      const extractedParams = {};
      for (const [key, value] of searchParams.entries()) {
        extractedParams[key] = value;
      }
      setCurrentRoute(basePath);
      setRouteParams({ ...extractedParams, ...params });
      window.history.pushState({}, '', path);
    } else {
      setCurrentRoute(path);
      setRouteParams(params);
      window.history.pushState({}, '', path);
    }
  };

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const extractedParams = {};
      for (const [key, value] of searchParams.entries()) {
        extractedParams[key] = value;
      }
      setCurrentRoute(path);
      setRouteParams(extractedParams);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Show Toast Message
  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Helper to get total quantity of a product in cart
  const getItemQuantity = (productId) => {
    return cart
      .filter((item) => item.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  // Cart Functions
  const addToCart = (product, quantity = 1, options = {}) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options)
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { ...product, quantity, options }];
      }
    });

    showToast(`Added "${product.name}" to cart`, 'success');
  };

  const removeFromCart = (productId, options = {}) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === productId && (Object.keys(options).length === 0 || JSON.stringify(item.options) === JSON.stringify(options)))
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, quantity, options = {}) => {
    if (quantity <= 0) {
      removeFromCart(productId, options);
      return;
    }
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === productId && (Object.keys(options).length === 0 || JSON.stringify(item.options) === JSON.stringify(options))
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity = quantity;
        return updated;
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Functions
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const isFav = prev.some((item) => item.id === product.id);
      if (isFav) {
        showToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Promo code validation
  const applyPromoCode = (code) => {
    if (code.toUpperCase() === 'GIFHUB10' || code.toUpperCase() === 'MEMORA10') {
      setDiscountPercent(10);
      setPromoCode('GIFHUB10');
      showToast('10% Discount Applied!', 'success');
      return true;
    } else if (code.toUpperCase() === 'WELCOME20') {
      setDiscountPercent(20);
      setPromoCode('WELCOME20');
      showToast('20% Welcome Discount Applied!', 'success');
      return true;
    } else {
      showToast('Invalid promo code. Try GIFHUB10', 'error');
      return false;
    }
  };

  // Calculate Subtotal & Totals
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const deliveryFee = cartSubtotal > 1500 || cartSubtotal === 0 ? 0 : 149;
  const cartTotal = cartSubtotal - discountAmount + deliveryFee;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigate,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        clearCart,
        cartSubtotal,
        discountAmount,
        deliveryFee,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        toast,
        showToast,
        promoCode,
        discountPercent,
        applyPromoCode,
        isContactModalOpen,
        openContactModal: () => setIsContactModalOpen(true),
        closeContactModal: () => setIsContactModalOpen(false),
        userRating,
        setUserRating,
        PRODUCTS,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
