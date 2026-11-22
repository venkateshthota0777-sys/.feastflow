import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Utensils, 
  Check, 
  Plus, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  Clock,
  Layers,
  ChefHat,
  Search,
  Filter,
  Flame,
  CheckSquare,
  Square,
  AlertCircle,
  HelpCircle,
  X
} from 'lucide-react';
import { useFeast } from '../context/FeastContext';
import { sampleDishes, MENU_CATEGORIES } from '../data/menuItemsData';

export default function MenuBuilderPage() {
  const navigate = useNavigate();
  const { eventData, selectedDishes, toggleDishSelection, setSelectedDishes, updateEventData } = useFeast();

  // Filter States
  const [activeCategory, setActiveCategory] = useState('All');
  const [dietaryFilter, setDietaryFilter] = useState('All'); // 'All', 'Vegetarian', 'Non-Vegetarian'
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  // Five required categories
  const categoriesList = ['All', ...MENU_CATEGORIES];

  // Guest count from eventData or default to 100
  const guestCount = eventData.guestCount || 100;

  // Filter dishes based on Category, Dietary, and Search Query
  const filteredDishes = useMemo(() => {
    return sampleDishes.filter((dish) => {
      // 1. Category filter
      const matchesCategory = activeCategory === 'All' || 
        dish.category === activeCategory || 
        dish.course === activeCategory;

      // 2. Dietary filter
      const matchesDiet = dietaryFilter === 'All' || dish.dietary === dietaryFilter;

      // 3. Search query
      const matchesSearch = searchQuery.trim() === '' || 
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDiet && matchesSearch;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  // Dish count per category
  const categoryCounts = useMemo(() => {
    const counts = { All: sampleDishes.length };
    MENU_CATEGORIES.forEach(cat => {
      counts[cat] = sampleDishes.filter(d => d.category === cat).length;
    });
    return counts;
  }, []);

  // Selected count per category
  const selectedCounts = useMemo(() => {
    const counts = { All: selectedDishes.length };
    MENU_CATEGORIES.forEach(cat => {
      counts[cat] = selectedDishes.filter(d => (d.category === cat || d.course === cat)).length;
    });
    return counts;
  }, [selectedDishes]);

  // Cost calculation
  // Total price per person is the sum of pricePerPerson for all selected dishes
  const totalPricePerPerson = useMemo(() => {
    return selectedDishes.reduce((sum, d) => sum + (d.pricePerPerson || d.price || 0), 0);
  }, [selectedDishes]);

  const totalEventCost = totalPricePerPerson * guestCount;

  // Helper to check if a dish is selected
  const isDishSelected = (dishId) => {
    return selectedDishes.some((d) => d.id === dishId);
  };

  // Bulk actions for current category
  const handleSelectAllInCurrentCategory = () => {
    const dishesToAdd = filteredDishes.filter(dish => !isDishSelected(dish.id));
    if (dishesToAdd.length > 0) {
      setSelectedDishes(prev => [...prev, ...dishesToAdd]);
    }
  };

  const handleDeselectAllInCurrentCategory = () => {
    const idsToRemove = new Set(filteredDishes.map(d => d.id));
    setSelectedDishes(prev => prev.filter(d => !idsToRemove.has(d.id)));
  };

  const handleClearAll = () => {
    setSelectedDishes([]);
    setShowClearConfirm(false);
  };

  // Select all 5 recommended starter feast if empty
  const handleQuickPresetSelection = () => {
    // Select one signature item from each of the 5 categories
    const preset = MENU_CATEGORIES.map(category => {
      return sampleDishes.find(d => d.category === category && d.isChefSpecial) ||
             sampleDishes.find(d => d.category === category);
    }).filter(Boolean);
    
    setSelectedDishes(preset);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-24 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step 2 Navigation & Title Banner */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/select-event')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-stone-600 hover:text-orange-600 mb-3 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Event Selection</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-orange-100 text-orange-900 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5">
                <ChefHat className="w-3.5 h-3.5 text-orange-700" />
                <span>Step 2 of 4: Custom Menu Builder</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                FeastFlow <span className="text-orange-600">Menu Builder</span>
              </h1>
              <p className="text-stone-600 text-sm mt-1 max-w-2xl">
                Explore 30 handcrafted culinary creations across 5 courses. Select multiple dishes with instant price-per-person calculation.
              </p>
            </div>

            {/* Event Summary Pill */}
            <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-stone-200 flex flex-wrap items-center gap-2">
              <div className="text-xs font-bold text-stone-900 bg-orange-100 text-orange-800 px-3 py-1 rounded-lg">
                🎉 {eventData.eventType || 'College Fest'}
              </div>
              <div className="text-xs font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-lg">
                👥 {guestCount} Guests
              </div>
              <div className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                🍽️ {selectedDishes.length} Items Selected
              </div>
              <button
                onClick={() => navigate('/select-event')}
                className="text-[11px] font-bold text-orange-600 underline hover:text-orange-700 ml-1 cursor-pointer"
              >
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Categories Bar & Filters */}
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-stone-200 mb-8 space-y-4">
          
          {/* Top row: 5 Required Categories Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-stone-400">
                Menu Categories (5 Essential Courses):
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Showing {filteredDishes.length} of 30 dishes
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categoriesList.map((category) => {
                const isSelected = activeCategory === category;
                const count = categoryCounts[category];
                const selectedInCat = selectedCounts[category] || 0;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-white shadow-md'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <span>{category}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelected ? 'bg-orange-500 text-white' : 'bg-stone-200 text-stone-600'
                    }`}>
                      {count}
                    </span>
                    {selectedInCat > 0 && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title={`${selectedInCat} selected`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom row: Dietary Toggle, Search & Quick Actions */}
          <div className="pt-3 border-t border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            
            {/* Dietary Preference Filter */}
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="font-bold text-stone-400 uppercase tracking-wider text-[11px]">
                Dietary:
              </span>
              <button
                onClick={() => setDietaryFilter('All')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                  dietaryFilter === 'All' ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All (30)
              </button>
              <button
                onClick={() => setDietaryFilter('Vegetarian')}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  dietaryFilter === 'Vegetarian' 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block border border-white"></span>
                <span>Vegetarian Only</span>
              </button>
              <button
                onClick={() => setDietaryFilter('Non-Vegetarian')}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  dietaryFilter === 'Non-Vegetarian' 
                    ? 'bg-red-600 text-white shadow-xs' 
                    : 'bg-red-50 text-red-800 hover:bg-red-100 border border-red-200/60'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block border border-white"></span>
                <span>Non-Vegetarian Only</span>
              </button>
            </div>

            {/* Search Input & Bulk Category Select */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dishes or ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Select All visible button */}
              <button
                onClick={handleSelectAllInCurrentCategory}
                className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl whitespace-nowrap cursor-pointer transition-colors"
                title="Select all items in current view"
              >
                Select All ({filteredDishes.length})
              </button>
            </div>

          </div>
        </div>

        {/* Main Grid: Food Cards (8 Cols) + Sticky Cart Summary (4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Dishes Selection Grid (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {filteredDishes.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
                <AlertCircle className="w-10 h-10 text-stone-300 mx-auto" />
                <h3 className="text-base font-bold text-stone-800">No dishes match your filter</h3>
                <p className="text-xs text-stone-500">
                  Try switching back to 'All' categories or clearing your search query.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setDietaryFilter('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredDishes.map((dish) => {
                  const isSelected = isDishSelected(dish.id);

                  return (
                    <div
                      key={dish.id}
                      onClick={() => toggleDishSelection(dish)}
                      className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border-2 transition-all flex flex-col justify-between group cursor-pointer ${
                        isSelected 
                          ? 'border-orange-500 ring-2 ring-orange-200 shadow-orange-100/50' 
                          : 'border-stone-200 hover:border-orange-300'
                      }`}
                    >
                      {/* Image Area with Badges */}
                      <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                        <img 
                          src={dish.image} 
                          alt={dish.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Top Left: Vegetarian / Non-Vegetarian Label & Icon Badge */}
                        <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                          {dish.isVegetarian || dish.dietary === 'Vegetarian' ? (
                            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wide bg-emerald-600 text-white shadow-sm">
                              {/* Standard Green Veg Dot Icon */}
                              <span className="w-3 h-3 bg-white rounded-xs flex items-center justify-center p-0.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                              </span>
                              <span>Vegetarian</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wide bg-red-600 text-white shadow-sm">
                              {/* Standard Red Non-Veg Triangle/Dot Icon */}
                              <span className="w-3 h-3 bg-white rounded-xs flex items-center justify-center p-0.5">
                                <span className="w-2 h-2 rounded-full bg-red-600" />
                              </span>
                              <span>Non-Vegetarian</span>
                            </span>
                          )}
                        </div>

                        {/* Top Right: Chef Special Badge */}
                        {dish.isChefSpecial && (
                          <span className="absolute top-3 right-3 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-amber-400 text-amber-950 flex items-center space-x-1 shadow-sm">
                            <Sparkles className="w-3 h-3" />
                            <span>Chef Special</span>
                          </span>
                        )}

                        {/* Bottom Floating Info */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                          <span className="text-[11px] font-bold bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md text-stone-200">
                            {dish.category}
                          </span>
                          <span className="text-xs font-black text-amber-300 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                            ${dish.pricePerPerson} / person
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-base font-extrabold text-stone-900 group-hover:text-orange-600 transition-colors leading-snug">
                              {dish.name}
                            </h4>
                          </div>
                          
                          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                            {dish.description}
                          </p>
                        </div>

                        {/* Details Pills: Serving Size & Spice */}
                        <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-500">
                          {dish.servingSize && (
                            <span className="bg-stone-100 px-2 py-0.5 rounded-md text-stone-600">
                              🍴 {dish.servingSize}
                            </span>
                          )}
                          {dish.spiceLevel && (
                            <span className="bg-orange-50 px-2 py-0.5 rounded-md text-orange-700 font-medium">
                              🌶️ {dish.spiceLevel}
                            </span>
                          )}
                        </div>

                        {/* Card Footer: Add to Menu Checkbox & Price */}
                        <div 
                          className="pt-3 border-t border-stone-100 flex items-center justify-between"
                          onClick={(e) => e.stopPropagation()} // Let button or checkbox handle directly
                        >
                          <div>
                            <span className="text-xs text-stone-400 block -mb-0.5">Price per guest:</span>
                            <span className="text-sm font-black text-emerald-700">
                              ${dish.pricePerPerson} <span className="text-[10px] text-stone-500 font-normal">/ person</span>
                            </span>
                          </div>

                          {/* Add to Menu Checkbox & Button */}
                          <label 
                            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all select-none ${
                              isSelected
                                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20 hover:bg-orange-700'
                                : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleDishSelection(dish)}
                              className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer"
                            />
                            <span>{isSelected ? 'Added to Menu' : 'Add to Menu'}</span>
                          </label>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Sticky Menu Summary Sidebar (lg:col-span-4) */}
          <div className="lg:col-span-4 sticky top-24 space-y-5">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-200 space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-stone-900">Your Event Menu</h3>
                    <p className="text-[11px] text-stone-400 font-medium">
                      {selectedDishes.length} dishes curated
                    </p>
                  </div>
                </div>

                {selectedDishes.length > 0 && (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="text-stone-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Clear selected dishes"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Confirm Clear Alert */}
              {showClearConfirm && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-2 text-xs">
                  <p className="font-bold text-red-900">Remove all dishes from your menu?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleClearAll}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg font-bold"
                    >
                      Yes, Clear All
                    </button>
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="px-3 py-1 bg-stone-200 text-stone-700 rounded-lg font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Category Breakdown Badges */}
              <div className="flex flex-wrap gap-1.5">
                {MENU_CATEGORIES.map(category => {
                  const count = selectedCounts[category] || 0;
                  return (
                    <span 
                      key={category} 
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        count > 0 
                          ? 'bg-orange-100 text-orange-900 border border-orange-200' 
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      {category}: {count}
                    </span>
                  );
                })}
              </div>

              {/* Selected Dishes List with Individual Prices */}
              <div className="py-2 space-y-2 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
                {selectedDishes.length === 0 ? (
                  <div className="text-center py-8 text-stone-400 text-xs space-y-3">
                    <ChefHat className="w-10 h-10 mx-auto text-stone-300" />
                    <p className="leading-relaxed">
                      Your catering tray is empty.<br />
                      Check "Add to Menu" on any dish to construct your feast!
                    </p>
                    <button
                      onClick={handleQuickPresetSelection}
                      className="px-3 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      ✨ Load Chef's 5-Course Preset
                    </button>
                  </div>
                ) : (
                  selectedDishes.map((dish) => (
                    <div 
                      key={dish.id} 
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs group hover:bg-orange-50/50 transition-colors"
                    >
                      <div className="flex items-center space-x-2.5 overflow-hidden pr-2">
                        {/* Veg / Non-Veg Indicator Dot */}
                        <span 
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            dish.isVegetarian || dish.dietary === 'Vegetarian' 
                              ? 'bg-emerald-500' 
                              : 'bg-red-500'
                          }`} 
                          title={dish.dietary}
                        />
                        <div className="truncate">
                          <span className="font-bold text-stone-900 block truncate">
                            {dish.name}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {dish.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="font-bold text-stone-900">
                          ${dish.pricePerPerson}/p
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleDishSelection(dish)}
                          className="w-5 h-5 rounded-md hover:bg-red-100 text-stone-400 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer"
                          title="Remove dish"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Dynamic Cost Projection Breakdown */}
              <div className="pt-4 border-t border-stone-100 space-y-2.5 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Guest Count:</span>
                  <span className="font-bold text-stone-900">{guestCount} Guests</span>
                </div>

                <div className="flex justify-between text-stone-500">
                  <span>Food Price per Person:</span>
                  <span className="font-extrabold text-orange-600 text-sm">
                    ${totalPricePerPerson} / person
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold">
                  <div>
                    <span className="text-stone-900 text-sm block">Estimated Food Total:</span>
                    <span className="text-[10px] text-stone-400 font-normal">
                      ${totalPricePerPerson} × {guestCount} guests
                    </span>
                  </div>
                  <span className="text-2xl text-emerald-700 font-black">
                    ${totalEventCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Required Continue Button to Quote Calculator */}
              <div className="pt-3 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedDishes.length === 0) {
                      if (window.confirm('You have not selected any dishes yet. Would you like us to load the recommended 5-course feast and continue?')) {
                        handleQuickPresetSelection();
                        setTimeout(() => navigate('/quote-calculator'), 100);
                      }
                    } else {
                      navigate('/quote-calculator');
                    }
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold rounded-xl text-sm shadow-lg shadow-orange-600/30 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <span>Continue to Quote Calculator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/select-event')}
                  className="w-full py-2 text-xs text-stone-500 hover:text-stone-800 font-bold hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                >
                  Change Event Details
                </button>
              </div>

              {/* FeastFlow Guarantee */}
              <div className="pt-2 border-t border-stone-100 flex items-center space-x-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Price Transparency: Real-time caterer per-head calculations.</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Floating Bottom Bar for Mobile Screen with Continue Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 p-4 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-stone-500 block">
              {selectedDishes.length} dishes selected:
            </span>
            <span className="text-base font-black text-emerald-700">
              ${totalPricePerPerson}/p <span className="text-xs text-stone-500 font-normal">(${totalEventCost.toLocaleString()})</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (selectedDishes.length === 0) {
                handleQuickPresetSelection();
              }
              navigate('/quote-calculator');
            }}
            className="px-5 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5"
          >
            <span>Continue to Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
