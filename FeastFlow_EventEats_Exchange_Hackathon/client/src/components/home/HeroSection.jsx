import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Star, 
  Clock, 
  ChefHat, 
  Users, 
  Calendar,
  Utensils
} from 'lucide-react';

export default function HeroSection({ onExploreCaterers, onCreateMenu, onFilterCategory }) {
  const [selectedEventType, setSelectedEventType] = useState('All');
  const [guestCount, setGuestCount] = useState('150');
  const [budgetPerPlate, setBudgetPerPlate] = useState('any');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onFilterCategory) {
      onFilterCategory(selectedEventType === 'All' ? null : selectedEventType);
    }
    if (onExploreCaterers) {
      onExploreCaterers();
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FFFDF9] to-[#FAF7F2]">
      {/* Decorative culinary glow accents */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-orange-400/10 via-amber-300/15 to-emerald-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-40 right-[-100px] w-80 h-80 bg-orange-300/10 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headings & Dual CTA */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-900 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-orange-600 animate-pulse"></span>
              <span className="text-orange-800">Event Catering Marketplace & Exchange</span>
              <span className="text-stone-400">|</span>
              <span className="text-emerald-700 font-bold flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                Verified Hygiene
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.12]">
              Plan Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500">Perfect Feast</span>
            </h1>

            {/* Exact Required Description */}
            <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover trusted caterers and plan your event food within your budget.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreCaterers}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-base shadow-lg shadow-orange-600/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Explore Caterers</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onCreateMenu}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#14532D] hover:bg-[#166534] text-white font-bold text-base shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-amber-300" />
                <span>Create Your Menu</span>
              </button>
            </div>

            {/* Interactive Search Bar Widget */}
            <div className="pt-6">
              <form 
                onSubmit={handleSearch}
                className="bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-left"
              >
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-orange-600" /> Event Type
                  </label>
                  <select 
                    value={selectedEventType}
                    onChange={(e) => setSelectedEventType(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-stone-800 focus:outline-none focus:border-orange-500"
                  >
                    <option value="All">All Event Types</option>
                    <option value="College Events">College Events</option>
                    <option value="Birthday Parties">Birthday Parties</option>
                    <option value="Weddings">Weddings</option>
                    <option value="Corporate Events">Corporate Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1 flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Expected Guests
                  </label>
                  <select 
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-stone-800 focus:outline-none focus:border-orange-500"
                  >
                    <option value="50">25 - 50 Guests</option>
                    <option value="150">50 - 150 Guests</option>
                    <option value="350">150 - 350 Guests</option>
                    <option value="800">350 - 800+ Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1 flex items-center">
                    <ChefHat className="w-3.5 h-3.5 mr-1 text-amber-600" /> Budget / Plate
                  </label>
                  <select 
                    value={budgetPerPlate}
                    onChange={(e) => setBudgetPerPlate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-stone-800 focus:outline-none focus:border-orange-500"
                  >
                    <option value="any">Flexible Budget</option>
                    <option value="budget">Under $20 (Budget)</option>
                    <option value="standard">$20 - $40 (Standard)</option>
                    <option value="luxury">$40+ (Royal/Luxury)</option>
                  </select>
                </div>

                <div className="sm:col-span-3 lg:col-span-1 flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 px-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg font-bold text-xs flex items-center justify-center space-x-1 shadow-md transition-all h-[34px]"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Find Caterers</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-500 font-medium">
              <div className="flex items-center space-x-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span><strong className="text-stone-800">4.9/5</strong> Vendor Rating</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ChefHat className="w-4 h-4 text-orange-600" />
                <span><strong className="text-stone-800">500+</strong> Top Caterers</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span><strong className="text-stone-800">Instant</strong> PDF Quotations</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Food Montage & Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main featured catering image with rounded elegance */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] group">
                <img 
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80" 
                  alt="Royal Event Catering Buffet Spread"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2.5 py-1 bg-orange-600 text-white text-[11px] font-bold rounded-md uppercase tracking-wider">
                    Wedding & Gala Feasts
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">Royal Banquets & Live Stations</h3>
                  <p className="text-xs text-stone-200">Starting from $38 / plate with full buffet setup</p>
                </div>
              </div>

              {/* Floating Card 1: Top Right - Taste Test Badge */}
              <div className="absolute -top-6 -right-4 sm:-right-6 bg-white p-3 sm:p-3.5 rounded-2xl shadow-xl border border-stone-100 flex items-center space-x-3 max-w-[210px] animate-bounce-slow">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Food Tasting</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">Book tasting session</div>
                </div>
              </div>

              {/* Floating Card 2: Bottom Left - Instant Quote Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-stone-100 flex items-center space-x-3 max-w-[240px]">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Dynamic Budget</div>
                  <div className="text-[11px] text-stone-500">Calculate in 30 seconds</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
