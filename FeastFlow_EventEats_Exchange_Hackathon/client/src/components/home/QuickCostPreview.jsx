import React, { useState } from 'react';
import { 
  Calculator, 
  Users, 
  Sparkles, 
  Check, 
  FileDown, 
  DollarSign, 
  UtensilsCrossed, 
  Flame,
  Coffee,
  ShieldCheck
} from 'lucide-react';

export default function QuickCostPreview({ onOpenQuoteModal }) {
  const [guestCount, setGuestCount] = useState(150);
  const [selectedTier, setSelectedTier] = useState('deluxe'); // 'smart', 'deluxe', 'royal'
  const [addons, setAddons] = useState({
    liveBarbecue: false,
    mocktailBar: true,
    dessertFondue: false,
    premiumCutlery: true
  });

  const packages = {
    smart: {
      name: 'Smart Fest',
      price: 18,
      items: '6 Courses (2 Starters, 3 Mains, 1 Dessert)',
      tag: 'Ideal for College Events & Birthdays'
    },
    deluxe: {
      name: 'Grand Gala',
      price: 32,
      items: '12 Courses (4 Starters, 5 Mains, 3 Desserts)',
      tag: 'Best Seller for Receptions & Corporate'
    },
    royal: {
      name: 'Royal Heritage',
      price: 52,
      items: '20+ Courses (Unlimited Live Counters & Desserts)',
      tag: 'Luxury Weddings & VIP Galas'
    }
  };

  const addonPrices = {
    liveBarbecue: 6,
    mocktailBar: 4,
    dessertFondue: 5,
    premiumCutlery: 3
  };

  const toggleAddon = (key) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const currentPkg = packages[selectedTier];
  let calculatedAddonPerPerson = 0;
  if (addons.liveBarbecue) calculatedAddonPerPerson += addonPrices.liveBarbecue;
  if (addons.mocktailBar) calculatedAddonPerPerson += addonPrices.mocktailBar;
  if (addons.dessertFondue) calculatedAddonPerPerson += addonPrices.dessertFondue;
  if (addons.premiumCutlery) calculatedAddonPerPerson += addonPrices.premiumCutlery;

  const totalPerPlate = currentPkg.price + calculatedAddonPerPerson;
  const foodTotal = totalPerPlate * guestCount;
  const estimatedStaffCost = guestCount > 100 ? Math.round(guestCount * 2.5) : 250;
  const estimatedTaxes = Math.round((foodTotal + estimatedStaffCost) * 0.05);
  const totalBudget = foodTotal + estimatedStaffCost + estimatedTaxes;

  return (
    <section id="quick-calculator" className="py-20 bg-gradient-to-b from-[#FFFDF9] to-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Cost Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Calculate Your <span className="text-emerald-800">Catering Budget</span> in Real Time
          </h2>
          <p className="text-stone-600 text-base">
            No guessing or waiting for callbacks. Adjust your guest count and menu tier to see immediate estimates.
          </p>
        </div>

        {/* Calculator Widget Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200/90 overflow-hidden max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12">
          
          {/* Controls Side */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            
            {/* Guest Count Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center">
                  <Users className="w-4 h-4 mr-1.5 text-orange-600" /> Number of Guests
                </label>
                <span className="text-lg font-black text-orange-600 bg-orange-50 px-3.5 py-1 rounded-xl border border-orange-200">
                  {guestCount} Guests
                </span>
              </div>
              <input
                type="range"
                min="25"
                max="1000"
                step="25"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-[11px] font-semibold text-stone-400">
                <span>25 Guests</span>
                <span>250 Guests</span>
                <span>500 Guests</span>
                <span>1,000+ Guests</span>
              </div>
            </div>

            {/* Package Tier Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                Choose Menu Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(packages).map(([key, pkg]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedTier(key)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative ${
                      selectedTier === key
                        ? 'border-orange-500 bg-orange-50/70 ring-2 ring-orange-500 shadow-sm'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <div className="text-xs font-bold text-stone-900">{pkg.name}</div>
                    <div className="text-sm font-extrabold text-orange-600 mt-0.5">
                      ${pkg.price} <span className="text-[10px] text-stone-500 font-normal">/ plate</span>
                    </div>
                    <div className="text-[10px] text-stone-500 mt-1 line-clamp-2 leading-tight">
                      {pkg.items}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Live Counters & Add-ons */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                Popular Live Counter Add-Ons
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { key: 'mocktailBar', label: 'Craft Mocktail Bar', price: '+$4/pp', icon: Coffee },
                  { key: 'liveBarbecue', label: 'Live Barbecue / Grill', price: '+$6/pp', icon: Flame },
                  { key: 'dessertFondue', label: 'Belgian Chocolate Fondue', price: '+$5/pp', icon: Sparkles },
                  { key: 'premiumCutlery', label: 'Ceramic Cutlery & Linens', price: '+$3/pp', icon: UtensilsCrossed }
                ].map((item) => {
                  const ItemIcon = item.icon;
                  const active = addons[item.key];
                  return (
                    <div
                      key={item.key}
                      onClick={() => toggleAddon(item.key)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer text-xs transition-colors ${
                        active 
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold' 
                          : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <ItemIcon className={`w-3.5 h-3.5 ${active ? 'text-emerald-700' : 'text-stone-400'}`} />
                        <span className="text-[11px]">{item.label}</span>
                      </div>
                      <span className={`text-[10px] font-bold ${active ? 'text-emerald-700' : 'text-stone-400'}`}>
                        {item.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Real-time Summary Card (Dark Green & Slate Luxury) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#14532D] via-[#0F3E2E] to-stone-900 text-white p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-emerald-900">
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 block">
                  Live Quotation Preview
                </span>
                <h3 className="text-2xl font-black text-white mt-0.5">Budget Breakdown</h3>
                <p className="text-xs text-stone-300">
                  Calculated based on {guestCount} guests and {currentPkg.name} package.
                </p>
              </div>

              {/* Line Items */}
              <div className="space-y-2.5 text-xs text-stone-200 border-t border-b border-emerald-800/80 py-4">
                <div className="flex justify-between items-center">
                  <span>Price Per Guest:</span>
                  <span className="font-bold text-amber-300 text-sm">${totalPerPlate} / plate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Base Food Subtotal:</span>
                  <span>${foodTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Uniformed Service Staff:</span>
                  <span>${estimatedStaffCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Estimated Event Tax (5%):</span>
                  <span>${estimatedTaxes.toLocaleString()}</span>
                </div>
              </div>

              {/* Total Figure */}
              <div>
                <div className="text-[11px] text-emerald-300 uppercase tracking-wider font-semibold">
                  Estimated Total Investment:
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 mt-1">
                  ${totalBudget.toLocaleString()}
                </div>
                <div className="text-[11px] text-stone-300 mt-1">
                  Average ${Math.round(totalBudget / guestCount)} per attendee all-inclusive
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 space-y-3">
              <button
                type="button"
                onClick={() => onOpenQuoteModal({
                  name: `Custom ${currentPkg.name} Feast`,
                  pricePerPlate: totalPerPlate,
                  currency: '$'
                })}
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-lg flex items-center justify-center space-x-2 transition-transform active:scale-95 cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Save & Generate PDF Quote</span>
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% price lock guarantee upon contract confirmation</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
