import React, { useState } from 'react';
import { 
  Star, 
  Users, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  Utensils, 
  FileText, 
  CalendarCheck,
  Check,
  Sparkles,
  Info
} from 'lucide-react';
import { featuredCaterers } from '../../data/caterersData';

export default function FeaturedCaterers({ activeCategory, onSelectCategory, onOpenQuoteModal }) {
  const [selectedTag, setSelectedTag] = useState('All');
  const [expandedMenuId, setExpandedMenuId] = useState(null);
  const [tastingBookedId, setTastingBookedId] = useState(null);

  const categories = ['All', 'Weddings', 'College Events', 'Birthday Parties', 'Corporate Events'];

  // Filter caterers based on selected category / activeCategory
  const currentCategory = activeCategory || selectedTag;

  const filteredCaterers = featuredCaterers.filter((caterer) => {
    if (currentCategory === 'All') return true;
    return caterer.categories.includes(currentCategory);
  });

  const handleTastingClick = (catererId) => {
    setTastingBookedId(catererId);
    setTimeout(() => {
      setTastingBookedId(null);
    }, 3000);
  };

  return (
    <section id="featured-caterers" className="py-20 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Verified Top Caterers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Featured <span className="text-emerald-800">Catering Partners</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Handpicked culinary experts with transparent per-plate pricing, food tasting options, and certified hygiene ratings.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedTag(cat);
                  if (onSelectCategory) onSelectCategory(cat === 'All' ? null : cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  currentCategory === cat
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCaterers.map((caterer) => {
            const isMenuExpanded = expandedMenuId === caterer.id;
            const isTastingSuccess = tastingBookedId === caterer.id;

            return (
              <div
                key={caterer.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-stone-200/90 transition-all duration-300 flex flex-col group"
              >
                {/* Food Image with Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                  <img
                    src={caterer.image}
                    alt={caterer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl flex items-center space-x-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-extrabold text-stone-900">{caterer.rating}</span>
                    <span className="text-[10px] text-stone-500">({caterer.reviewCount})</span>
                  </div>

                  {/* Hygiene Badge */}
                  <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-md text-emerald-300 px-2.5 py-1 rounded-xl flex items-center space-x-1 text-[11px] font-semibold border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{caterer.hygieneRating}</span>
                  </div>

                  {/* Pricing Overlay at bottom of image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg">
                      <span className="text-[10px] uppercase font-bold text-stone-300 block">Starting From</span>
                      <span className="text-lg font-extrabold text-amber-300">
                        {caterer.currency}{caterer.pricePerPlate}
                      </span>
                      <span className="text-xs text-stone-200 font-medium"> / plate</span>
                    </div>

                    <div className="text-right bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-stone-300" />
                      <span>{caterer.minGuests} - {caterer.maxGuests} guests</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    
                    {/* Categories Pill */}
                    <div className="flex flex-wrap gap-1.5">
                      {caterer.categories.map((c, i) => (
                        <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-50 text-orange-700">
                          {c}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                      {caterer.name}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2">
                      {caterer.tagline}
                    </p>

                    {/* Specialty & Dietary */}
                    <div className="text-xs space-y-1.5 pt-1">
                      <div className="flex items-start text-stone-600">
                        <Utensils className="w-3.5 h-3.5 mr-1.5 text-orange-600 shrink-0 mt-0.5" />
                        <span className="text-[11px]"><strong>Cuisine:</strong> {caterer.specialty}</span>
                      </div>
                      <div className="flex items-center text-stone-500 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-emerald-700 shrink-0" />
                        <span>{caterer.city} • {caterer.experienceYears} yrs experience</span>
                      </div>
                    </div>

                    {/* Dietary Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {caterer.dietary.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-[10px] font-medium px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Signature Menu Preview */}
                  <div className="border-t border-stone-100 pt-3">
                    <button
                      type="button"
                      onClick={() => setExpandedMenuId(isMenuExpanded ? null : caterer.id)}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center justify-between w-full py-1"
                    >
                      <span>{isMenuExpanded ? 'Hide Signature Menu' : 'View Signature Dishes'}</span>
                      <ChevronRight className={`w-4 h-4 transform transition-transform ${isMenuExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    {isMenuExpanded && (
                      <div className="mt-2 p-3 bg-amber-50/60 rounded-xl space-y-1.5 text-xs text-stone-700 border border-amber-200/50 animate-fade-in">
                        <div className="font-bold text-[11px] text-amber-900 uppercase tracking-wide">
                          Chef's Top Selections:
                        </div>
                        {caterer.featuredMenu.map((dish, i) => (
                          <div key={i} className="flex items-center space-x-1.5 text-stone-600 text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                            <span>{dish}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenQuoteModal(caterer)}
                      className="py-2.5 px-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Get Quote</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTastingClick(caterer.id)}
                      className={`py-2.5 px-3 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all ${
                        isTastingSuccess
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#14532D] hover:bg-[#166534] text-white'
                      }`}
                    >
                      {isTastingSuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Slot Requested!</span>
                        </>
                      ) : (
                        <>
                          <CalendarCheck className="w-3.5 h-3.5 text-amber-300" />
                          <span>Book Tasting</span>
                        </>
                      )}
                    </button>
                  </div>

                  {isTastingSuccess && (
                    <div className="text-[11px] text-center text-emerald-700 font-semibold bg-emerald-50 py-1 rounded-lg animate-fade-in">
                      ✓ Free tasting slot requested for {caterer.name}!
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between shadow-xl gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">Need a Custom Wedding or Festival Menu?</h3>
            <p className="text-amber-100 text-xs sm:text-sm">Our catering concierges negotiate bulk rates and customize menus for 500+ guests for free.</p>
          </div>
          <button
            onClick={() => onOpenQuoteModal(featuredCaterers[0])}
            className="px-6 py-3 bg-white text-stone-900 hover:bg-amber-50 font-bold text-sm rounded-xl shadow-md whitespace-nowrap cursor-pointer transition-colors"
          >
            Request Custom Menu
          </button>
        </div>

      </div>
    </section>
  );
}
