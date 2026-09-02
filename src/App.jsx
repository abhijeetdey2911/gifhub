import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/layout/Toast';
import { ContactModal } from './components/layout/ContactModal';
import { AuthModal } from './components/auth/AuthModal';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

const AppContent = () => {
  const { currentRoute } = useShop();

  const renderCurrentPage = () => {
    if (currentRoute === '/') {
      return <HomePage />;
    }
    if (currentRoute === '/explore' || currentRoute.startsWith('/explore?')) {
      return <ExplorePage />;
    }
    if (currentRoute.startsWith('/product/')) {
      const productId = currentRoute.replace('/product/', '').split('?')[0];
      return <ProductDetailPage productId={productId} />;
    }
    if (currentRoute === '/cart') {
      return <CartPage />;
    }
    if (currentRoute === '/checkout') {
      return <CheckoutPage />;
    }

    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-obsidian selection:text-cream-100 font-sans">
      <Navbar />
      <main className="flex-1">{renderCurrentPage()}</main>
      <Footer />
      <Toast />
      <ContactModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </AuthProvider>
  );
}
