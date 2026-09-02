import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TickerBanner } from '../components/layout/TickerBanner';
import { ShopByOccasion } from '../components/home/ShopByOccasion';
import { ShopByCategory } from '../components/home/ShopByCategory';
import { BestSellers } from '../components/home/BestSellers';
import { FeaturedEdit } from '../components/home/FeaturedEdit';
import { DiscoveryStrip } from '../components/home/DiscoveryStrip';
import { StoreLocation } from '../components/home/StoreLocation';

export const HomePage = () => {
  return (
    <div className="space-y-4">
      <HeroSection />
      <TickerBanner />
      <ShopByOccasion />
      <ShopByCategory />
      <BestSellers />
      <FeaturedEdit />
      <DiscoveryStrip />
      <StoreLocation />
    </div>
  );
};
