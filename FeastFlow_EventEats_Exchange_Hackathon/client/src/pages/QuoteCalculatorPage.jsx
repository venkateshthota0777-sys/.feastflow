import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calculator, 
  Users, 
  Calendar, 
  FileText, 
  Printer, 
  CheckCircle, 
  Sparkles, 
  UtensilsCrossed, 
  ShieldCheck, 
  Layers, 
  ChevronRight,
  Flame,
  Clock,
  Send,
  HelpCircle
} from 'lucide-react';
import { useFeast } from '../context/FeastContext';
import { MENU_CATEGORIES } from '../data/menuItemsData';

export default function QuoteCalculatorPage() {
  const navigate = useNavigate();
  const { eventData, selectedDishes, updateEventData } = useFeast();
  
  const [guests, setGuests] = useState(eventData.guestCount || 120);
  const [servicePackage, setServicePackage] = useState('gold'); // silver, gold, platinum
  const [includeTableware, setIncludeTableware] = useState(true);
  const [includeServiceCaptains, setIncludeServiceCaptains] = useState(true);
  const [specialNote, setSpecialNote] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteId] = useState(() => `FF-QUOTE-${Math.floor(100000 + Math.random() * 900000)}`);

  // Group selected dishes by category
  const categorizedSelections = MENU_CATEGORIES.map(category => ({
    category,
    dishes: selectedDishes.filter(d => (d.category === category || d.course === category))
  })).filter(group => group.dishes.length > 0);

  // Financial calculations
  const totalFoodPerPerson = selectedDishes.reduce((sum, d) => sum + (d.pricePerPerson || d.price || 0), 0);
  
  // Package multiplier
  const packageMultipliers = {
    silver: { name: 'Essential Feast', multiplier: 1.0, description: 'Standard buffet setup, chafing dishes, eco-friendly disposables.' },
    gold: { name: 'Signature Banquet', multiplier: 1.15, description: 'Porcelain dinnerware, brass chafers, linen table skirts, beverage station.' },
    platinum: { name: 'Royal Platinum VIP', multiplier: 1.35, description: 'Fine bone china, uniformed table captains, crystal glassware, live chef theatrics.' }
  };

  const currentPkg = packageMultipliers[servicePackage];

  // Live Food Counter setup fee
  const liveCountersCount = selectedDishes.filter(d => (d.category === 'Live Food Counters' || d.course === 'Live Food Counters')).length;
  const liveCounterSetupFee = liveCountersCount * 120; // $120 per live station technician/gas gear

  // Food Subtotal
  const adjustedFoodRatePerPerson = Math.round(totalFoodPerPerson * currentPkg.multiplier);
  const foodSubtotal = adjustedFoodRatePerPerson * guests;

  // Additional Services
  const tablewareFee = includeTableware ? Math.round(guests * (servicePackage === 'platinum' ? 6 : 3.5)) : 0;
  const captainsCount = Math.max(2, Math.ceil(guests / 30));
  const serviceStaffFee = includeServiceCaptains ? captainsCount * 95 : 0;

  // Taxes & Platform Guarantee
  const preTaxTotal = foodSubtotal + liveCounterSetupFee + tablewareFee + serviceStaffFee;
  const taxAndPlatformFee = Math.round(preTaxTotal * 0.05);
  const grandTotal = preTaxTotal + taxAndPlatformFee;
  const effectiveCostPerPerson = guests > 0 ? (grandTotal / guests).toFixed(2) : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleGuestChange = (newCount) => {
    const val = Math.max(10, Math.min(2000, Number(newCount) || 10));
    setGuests(val);
    updateEventData({ guestCount: val });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Progress Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/menu-builder')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-stone-600 hover:text-orange-600 mb-3 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Menu Builder</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-100 rounded-full text-amber-900 text-xs font-bold uppercase tracking-wider mb-1.5">
                <Calculator className="w-3.5 h-3.5 text-amber-700" />
                <span>Step 3 of 4: Event Quote Calculator</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
                Instant Event <span className="text-orange-600">Cost & Quotation</span>
              </h1>
              <p className="text-stone-600 text-sm mt-1">
                Transparent itemized estimate for your custom menu and event requirements.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-50 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-stone-500" />
                <span>Print / Save Quote</span>
              </button>
            </div>
          </div>
        </div>

        {/* Success Modal / State */}
        {quoteSubmitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-200 text-center max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Official Quote Registered
              </span>
              <h2 className="text-3xl font-black text-stone-900">Quotation Locked!</h2>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Reference ID: <span className="font-mono font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">{quoteId}</span>
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 text-left space-y-3 text-xs text-stone-700">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Event Type:</span>
                <span className="font-bold text-stone-900">{eventData.eventType || 'Celebration'}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Guests Planned:</span>
                <span className="font-bold text-stone-900">{guests} Attendees</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Dishes Selected:</span>
                <span className="font-bold text-orange-600">{selectedDishes.length} Handcrafted Dishes</span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-stone-900 font-bold text-sm">Estimated Grand Total:</span>
                <span className="text-2xl font-black text-emerald-700">${grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-stone-500">
              Our verified caterer partners matching your location and budget are reviewing this quotation. You will receive customized bids within 2 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
              <button
                onClick={() => navigate('/menu-builder')}
                className="px-6 py-3 border border-stone-300 rounded-xl text-stone-700 text-xs font-bold hover:bg-stone-50 cursor-pointer"
              >
                Modify Dishes
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl text-xs font-extrabold shadow-md cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Area (8 cols): Guest Controls, Packages & Selected Dishes Review */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Event Parameter Adjusters */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 space-y-5">
                <h3 className="text-base font-extrabold text-stone-900 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  <span>1. Event Details & Guest Sizing</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                      Event Type
                    </label>
                    <p className="text-sm font-black text-stone-900">{eventData.eventType || 'Celebration'}</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Meal: {eventData.mealType || 'Dinner'}</p>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Guest Count
                      </label>
                      <span className="text-sm font-black text-orange-600">{guests} guests</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="1000"
                      step="10"
                      value={guests}
                      onChange={(e) => handleGuestChange(e.target.value)}
                      className="w-full accent-orange-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                      <span>20</span>
                      <span>250</span>
                      <span>500</span>
                      <span>1000+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Experience Tier Selector */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 space-y-4">
                <h3 className="text-base font-extrabold text-stone-900 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>2. Select Catering Service Tier</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.entries(packageMultipliers).map(([key, pkg]) => {
                    const isSelected = servicePackage === key;
                    return (
                      <div
                        key={key}
                        onClick={() => setServicePackage(key)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected 
                            ? 'border-orange-500 bg-orange-50/40 ring-1 ring-orange-500 shadow-xs' 
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-extrabold text-stone-900 uppercase">
                              {key}
                            </span>
                            {isSelected && (
                              <span className="w-5 h-5 bg-orange-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                                ✓
                              </span>
                            )}
                          </div>
                          <h4 className="font-extrabold text-sm text-stone-900">{pkg.name}</h4>
                          <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                            {pkg.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-stone-100 text-[11px] font-bold text-stone-700">
                          Multiplier: {pkg.multiplier}x
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inclusions & Addons */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 space-y-4">
                <h3 className="text-base font-extrabold text-stone-900 flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  <span>3. Equipment & Service Add-ons</span>
                </h3>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox"
                        checked={includeTableware}
                        onChange={(e) => setIncludeTableware(e.target.checked)}
                        className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600"
                      />
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">
                          Premium Tableware & Cutlery Setup
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Complete ceramic/porcelain plates, forks, spoons, napkins, and water goblets
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-900 ml-4 shrink-0">
                      +${tablewareFee}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3.5 bg-stone-50 rounded-2xl border border-stone-200 cursor-pointer hover:bg-stone-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="checkbox"
                        checked={includeServiceCaptains}
                        onChange={(e) => setIncludeServiceCaptains(e.target.checked)}
                        className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 accent-orange-600"
                      />
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">
                          Uniformed Buffet Captains ({captainsCount} Staff members)
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Professional servers to manage replenishment, food hygiene, and guest assistance
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-900 ml-4 shrink-0">
                      +${serviceStaffFee}
                    </span>
                  </label>

                  {liveCountersCount > 0 && (
                    <div className="flex items-center justify-between p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-900">
                      <div className="flex items-center space-x-2">
                        <Flame className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <span className="font-bold block">
                            Live Food Counter Setup ({liveCountersCount} active stations)
                          </span>
                          <span className="text-[11px] text-amber-800">
                            Includes master chefs, gas cylinders, induction tawas & display gear
                          </span>
                        </div>
                      </div>
                      <span className="font-extrabold text-amber-900 shrink-0">
                        +${liveCounterSetupFee}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Dishes Itemized Review */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center space-x-2">
                    <UtensilsCrossed className="w-5 h-5 text-orange-600" />
                    <div>
                      <h3 className="text-base font-extrabold text-stone-900">
                        4. Menu Breakdown by Category
                      </h3>
                      <p className="text-[11px] text-stone-500">
                        {selectedDishes.length} items chosen from FeastFlow Menu Builder
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/menu-builder')}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 underline cursor-pointer"
                  >
                    Edit Dishes
                  </button>
                </div>

                {selectedDishes.length === 0 ? (
                  <div className="text-center py-8 text-stone-400 space-y-2">
                    <p className="text-xs">No dishes selected yet.</p>
                    <button
                      onClick={() => navigate('/menu-builder')}
                      className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold"
                    >
                      Browse Menu Builder
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {categorizedSelections.map(({ category, dishes }) => (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-extrabold text-stone-800 bg-stone-100 px-3 py-1.5 rounded-xl">
                          <span>{category} ({dishes.length})</span>
                          <span className="text-stone-500 font-semibold text-[11px]">
                            Category Subtotal: ${dishes.reduce((s, d) => s + (d.pricePerPerson || d.price || 0), 0)} / guest
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
                          {dishes.map((dish) => (
                            <div 
                              key={dish.id}
                              className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-200/80 text-xs"
                            >
                              <div className="flex items-center space-x-2 overflow-hidden">
                                <span 
                                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                    dish.isVegetarian || dish.dietary === 'Vegetarian' 
                                      ? 'bg-emerald-500' 
                                      : 'bg-red-500'
                                  }`} 
                                  title={dish.dietary}
                                />
                                <span className="font-semibold text-stone-800 truncate">
                                  {dish.name}
                                </span>
                              </div>
                              <span className="font-bold text-stone-900 shrink-0 ml-2">
                                ${dish.pricePerPerson || dish.price}/p
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Right Sticky Column (4 cols): Quotation Summary Card */}
            <div className="lg:col-span-4 sticky top-24 space-y-4">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-200 space-y-5">
                
                <div className="border-b border-stone-100 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider">
                      Official Quotation
                    </span>
                    <span className="text-[11px] font-mono text-stone-500 font-bold bg-stone-100 px-2 py-0.5 rounded">
                      {quoteId}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-stone-900">Event Food Estimate</h3>
                  <p className="text-xs text-stone-500">
                    Calculated for <span className="font-bold text-stone-800">{guests} Guests</span> • {eventData.eventType || 'Event'}
                  </p>
                </div>

                {/* Line Items */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Base Food Items ({selectedDishes.length} dishes)</span>
                    <span className="font-bold text-stone-900">${totalFoodPerPerson} / person</span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Selected Tier ({currentPkg.name})</span>
                    <span className="font-bold text-stone-900">${adjustedFoodRatePerPerson} / person</span>
                  </div>

                  <div className="flex justify-between text-stone-600 pt-1 border-t border-stone-100">
                    <span>Food Subtotal ({guests} guests)</span>
                    <span className="font-bold text-stone-900">${foodSubtotal.toLocaleString()}</span>
                  </div>

                  {liveCountersCount > 0 && (
                    <div className="flex justify-between text-stone-600">
                      <span>Live Counters Setup ({liveCountersCount} stalls)</span>
                      <span className="font-bold text-stone-900">+${liveCounterSetupFee}</span>
                    </div>
                  )}

                  {includeTableware && (
                    <div className="flex justify-between text-stone-600">
                      <span>Tableware & Chinaware</span>
                      <span className="font-bold text-stone-900">+${tablewareFee}</span>
                    </div>
                  )}

                  {includeServiceCaptains && (
                    <div className="flex justify-between text-stone-600">
                      <span>Service Team ({captainsCount} Captains)</span>
                      <span className="font-bold text-stone-900">+${serviceStaffFee}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-500 pt-1 border-t border-stone-100">
                    <span>GST / Catering Taxes (5%)</span>
                    <span className="font-bold text-stone-800">+${taxAndPlatformFee}</span>
                  </div>

                  {/* Grand Total */}
                  <div className="pt-3 border-t-2 border-stone-900/10 flex justify-between items-baseline">
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">Total Quotation</span>
                      <span className="text-[11px] text-stone-400">All taxes & setup included</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-emerald-700">
                        ${grandTotal.toLocaleString()}
                      </span>
                      <span className="text-[11px] font-bold text-stone-500 block">
                        ~ ${effectiveCostPerPerson} / guest
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Note */}
                <div className="pt-2">
                  <label className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-1">
                    Special Catering Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    placeholder="E.g., No garlic in Jain dishes, separate dessert bar layout..."
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* Submit Action */}
                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setQuoteSubmitted(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold rounded-xl text-sm shadow-lg shadow-orange-600/30 flex items-center justify-center space-x-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Lock Quote & Match Caterers</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('/menu-builder')}
                    className="w-full py-2.5 text-xs text-stone-600 hover:text-stone-900 font-bold border border-stone-200 rounded-xl hover:bg-stone-50 cursor-pointer"
                  >
                    Adjust Menu Dishes
                  </button>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center space-x-2 text-[11px] text-stone-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>FeastFlow Price Guarantee: No hidden catering surcharges.</span>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
