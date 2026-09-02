import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('gifhub_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('gifhub_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('gifhub_user');
      }
    } catch (e) {
      console.error('User sync error', e);
    }
  }, [user]);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email, password) => {
    const existing = user || {
      fullName: 'Valued Guest',
      email,
      phone: '+91 98765 43210',
      address: '42 Rosewood Avenue',
      city: 'Mumbai',
      pincode: '400001',
    };
    setUser(existing);
    closeAuthModal();
    return { success: true };
  };

  const register = (userData) => {
    const errors = {};

    // Name Validation
    if (!userData.fullName || !userData.fullName.trim()) {
      errors.fullName = 'Please enter your full name.';
    } else if (userData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters.';
    }

    // Phone Validation
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!userData.phone || !userData.phone.trim()) {
      errors.phone = 'Please enter your phone number.';
    } else if (!phoneRegex.test(userData.phone.trim())) {
      errors.phone = 'Enter a valid phone number.';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email || !userData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(userData.email.trim())) {
      errors.email = 'Enter a valid email address.';
    }

    // Password Validation
    if (!userData.password) {
      errors.password = 'Please enter a password.';
    } else if (userData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    // Confirm Password Validation
    if (userData.password !== userData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    // Address & City Validation
    if (!userData.address || !userData.address.trim()) {
      errors.address = 'Please enter your delivery address.';
    }
    if (!userData.city || !userData.city.trim()) {
      errors.city = 'Please enter your city.';
    }
    if (!userData.pincode || !userData.pincode.trim()) {
      errors.pincode = 'Please enter your PIN/ZIP code.';
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // If valid
    const newUser = {
      fullName: userData.fullName.trim(),
      phone: userData.phone.trim(),
      email: userData.email.trim(),
      address: userData.address.trim(),
      city: userData.city.trim(),
      pincode: userData.pincode.trim(),
    };

    setUser(newUser);
    closeAuthModal();
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        setAuthMode,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
