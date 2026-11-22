import React, { useState } from 'react';
import { X, Calculator, Users, Calendar, Utensils, CheckCircle, FileText, Sparkles } from 'lucide-react';

export default function QuickQuoteModal({ isOpen, onClose, selectedCaterer }) {
  const [guests, setGuests] = useState(120);
  const [eventType, setEventType] = useState('Weddings');
  const [tier, setTier] = useState('gold'); // silver, gold, platinum
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const caterer = selectedCaterer || {
    name: 'Royal Heritage Banquets & Feasts',
    pricePerPlate: 38,
    currency: '$',
    city: 'Metro City'
  };

  const tierMultipliers = {
    silver: 0.85,
    gold: 1.0,
    platinum: 1.35
  };

  const basePrice = Math.round(caterer.pricePerPlate * tierMultipliers[tier]);
  const foodSubtotal = basePrice * guests;
  const serviceStaffCost = Math.round(guests > 100 ? (guests / 30) * 45 : 90);
  const taxes = Math.round((foodSubtotal + serviceStaffCost) * 0.05);
  const grandTotal = foodSubtotal + serviceStaffCost + taxes;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 text-white p-5 relative border-b border-amber-500/30">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Instant Catering Quotation</span>
          </div>
          <h3 className="text-xl font-bold text-white">{caterer.name}</h3>
          <p className="text-stone-300 text-xs mt-0.5">Custom instant estimate tailored for your event</p>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-stone-900">Quotation Generated!</h4>
              <p className="text-stone-600 text-sm max-w-md mx-auto">
                Your estimated budget of <span className="font-bold text-emerald-700">${grandTotal.toLocaleString()}</span> for {guests} guests has been recorded.
              </p>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-left text-xs text-amber-900 space-y-1">
                <p className="font-semibold">Estimated Package: {tier.toUpperCase()} Feast</p>
                <p>Includes complete buffet setup, chef supervision, and service team.</p>
                <p className="text-stone-500">Official reference: #FF-{Math.floor(100000 + Math.random() * 900000)}</p>
              </div>
              <div className="flex gap-3 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-stone-700 text-sm font-semibold hover:bg-stone-50"
                >
                  Adjust Estimate
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Event Type & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none"
                  >
                    <option value="Weddings">Weddings & Receptions</option>
                    <option value="College Events">College Festivals & Socials</option>
                    <option value="Birthday Parties">Birthday Celebrations</option>
                    <option value="Corporate Events">Corporate Conferences & Galas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Tentative Event Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
                    <input
                      type="date"
                      defaultValue="2026-12-15"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-stone-800 text-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Guest Count Slider */}
              <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center">
                    <Users className="w-4 h-4 mr-1 text-orange-600" /> Number of Guests
                  </span>
                  <span className="text-base font-extrabold text-orange-600 bg-white px-3 py-0.5 rounded-lg border border-orange-200 shadow-sm">
                    {guests} People
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="800"
                  step="10"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                  <span>Intimate (20)</span>
                  <span>Festive (300)</span>
                  <span>Grand Banquet (800)</span>
                </div>
              </div>

              {/* Menu Tier Picker */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Select Menu Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'silver', label: 'Silver Classic', desc: '8 Courses' },
                    { id: 'gold', label: 'Gold Emperor', desc: '14 Courses' },
                    { id: 'platinum', label: 'Platinum Royal', desc: '20+ Courses' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTier(item.id)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        tier === item.id
                          ? 'border-orange-500 bg-orange-50/80 shadow-sm ring-1 ring-orange-500'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className={`text-xs font-bold ${tier === item.id ? 'text-orange-700' : 'text-stone-800'}`}>
                        {item.label}
                      </div>
                      <div className="text-[11px] text-stone-500">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Cost Summary Box */}
              <div className="p-4 bg-stone-900 text-white rounded-xl space-y-2 text-sm shadow-inner">
                <div className="flex justify-between text-stone-300 text-xs">
                  <span>Rate per person ({tier.toUpperCase()} tier):</span>
                  <span className="font-semibold text-white">${basePrice} / plate</span>
                </div>
                <div className="flex justify-between text-stone-300 text-xs">
                  <span>Food Subtotal ({guests} guests × ${basePrice}):</span>
                  <span>${foodSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-300 text-xs">
                  <span>Service Staff & Chafing Equipment:</span>
                  <span>${serviceStaffCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-300 text-xs">
                  <span>Estimated Taxes (5%):</span>
                  <span>${taxes.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between items-baseline font-bold">
                  <span className="text-amber-400">Estimated Total:</span>
                  <span className="text-xl text-emerald-400 font-extrabold">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 border border-stone-300 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Lock in Quotation</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
