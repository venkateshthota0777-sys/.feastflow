import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import EventCategories from '../components/home/EventCategories';
import FeaturedCaterers from '../components/home/FeaturedCaterers';
import QuickCostPreview from '../components/home/QuickCostPreview';
import HowItWorks from '../components/home/HowItWorks';
import AboutSection from '../components/home/AboutSection';
import QuickQuoteModal from '../components/common/QuickQuoteModal';

export default function HomePage({ onOpenLogin }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedCatererForQuote, setSelectedCatererForQuote] = useState(null);

  const handleSelectCategory = (categoryName) => {
    setActiveCategory(categoryName);
    // Smooth scroll down to Featured Caterers
    const el = document.getElementById('featured-caterers');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOpenQuoteModal = (caterer) => {
    setSelectedCatererForQuote(caterer);
    setQuoteModalOpen(true);
  };

  const handleExploreCaterers = () => {
    const el = document.getElementById('featured-caterers');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCreateMenu = () => {
    // Navigate straight to Event Selection page
    navigate('/select-event');
  };

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <HeroSection 
        onExploreCaterers={handleExploreCaterers}
        onCreateMenu={handleCreateMenu}
        onFilterCategory={setActiveCategory}
      />

      {/* Event Categories */}
      <EventCategories 
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Featured Caterers */}
      <FeaturedCaterers 
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* How It Works */}
      <HowItWorks 
        onStartPlanning={handleCreateMenu}
        onOpenCalculator={handleCreateMenu}
      />

      {/* Interactive Budget Estimator Widget */}
      <QuickCostPreview 
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      {/* About & Trust Section */}
      <AboutSection />

      {/* Instant Quote Modal */}
      <QuickQuoteModal 
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        selectedCaterer={selectedCatererForQuote}
      />
    </div>
  );
}
