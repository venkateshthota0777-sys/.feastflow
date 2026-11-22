import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Cake, 
  HeartHandshake, 
  Briefcase, 
  Check, 
  ArrowRight, 
  Users, 
  Calendar, 
  Clock, 
  Sparkles, 
  Utensils, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useFeast } from '../context/FeastContext';

const eventOptions = [
  {
    id: 'college-fest',
    title: 'College Fest',
    tagline: 'High-energy food stations, street food fests & midnight snacks',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80',
    popularBadge: 'Popular for Student Budgets',
    avgCost: '$12 - $20 / guest',
    defaultGuests: 250,
    highlights: ['Live Burger & Pizza Grills', 'Chaat Counters', 'Mocktail Bars', 'Fast Self-Service']
  },
  {
    id: 'birthday',
    title: 'Birthday',
    tagline: 'Fun finger foods, interactive live counters & gourmet dessert bars',
    icon: Cake,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=700&q=80',
    popularBadge: 'All Ages Celebrations',
    avgCost: '$18 - $32 / guest',
    defaultGuests: 60,
    highlights: ['DIY Taco/Pasta Stations', 'Cupcake & Fondue Bars', 'Kids & Adult Menus', 'Party Mocktails']
  },
  {
    id: 'wedding',
    title: 'Wedding',
    tagline: 'Opulent multi-course royal banquets, live counters & heritage sweets',
    icon: HeartHandshake,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
    popularBadge: 'Royal & Luxury Feasts',
    avgCost: '$35 - $75 / guest',
    defaultGuests: 350,
    highlights: ['Multi-Course Royal Dining', 'Tandoori Live Kebabs', 'Traditional Sweet Bazaar', 'Fine Porcelain Service']
  },
  {
    id: 'corporate-event',
    title: 'Corporate Event',
    tagline: 'Executive lunches, networking high teas & gourmet plated conferences',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=700&q=80',
    popularBadge: 'Executive Choice',
    avgCost: '$22 - $45 / guest',
    defaultGuests: 120,
    highlights: ['Bento Box Luncheons', 'Continental Buffets', 'Espresso & Artisan Tea Bar', 'Dietary Labeled Stations']
  }
];

const dietaryOptions = [
  {
    id: 'Vegetarian',
    label: 'Vegetarian',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    iconBg: 'bg-emerald-600',
    subtitle: '100% Meat-Free & Plant-Rich',
    description: 'Delectable cottage cheese specialties, slow-simmered lentils, farm fresh produce, and rich gravies.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    stat: '98% caterers support'
  },
  {
    id: 'Non-Vegetarian',
    label: 'Non-Vegetarian',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    iconBg: 'bg-orange-600',
    subtitle: 'Tender Poultry, Seafood & Meats',
    description: 'Charcoal grilled kebabs, slow-cooked dum biryanis, curries, and roasted coastal delicacies.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    stat: 'Halal options available'
  },
  {
    id: 'Jain',
    label: 'Jain',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    iconBg: 'bg-amber-600',
    subtitle: 'Satvik (No Onion, Garlic or Root Veg)',
    description: 'Pure satvik culinary mastery with fox nuts, almond gravies, crisp corn, and seasonal gourds.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80',
    stat: 'Separate kitchen prep'
  }
];

export default function EventSelectionPage() {
  const navigate = useNavigate();
  const { eventData, updateEventData, toggleDietaryPreference } = useFeast();

  const [selectedEventType, setSelectedEventType] = useState(eventData.eventType || 'College Fest');
  const [guestCount, setGuestCount] = useState(eventData.guestCount || 150);
  const [eventDate, setEventDate] = useState(eventData.eventDate || '2026-12-20');
  const [mealType, setMealType] = useState(eventData.mealType || 'Dinner');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Event Type click
  const handleEventSelect = (option) => {
    setSelectedEventType(option.title);
    setGuestCount(option.defaultGuests);
    updateEventData({
      eventType: option.title,
      eventId: option.id,
      guestCount: option.defaultGuests
    });
  };

  // Continue to Menu Builder
  const handleContinue = () => {
    if (!eventData.dietaryPreferences || eventData.dietaryPreferences.length === 0) {
      setErrorMessage('Please select at least one dietary preference to proceed.');
      return;
    }
    setErrorMessage('');
    
    // Persist all selections into React state & context
    updateEventData({
      eventType: selectedEventType,
      guestCount: Number(guestCount),
      eventDate,
      mealType
    });

    // Navigate to Menu Builder page
    navigate('/menu-builder');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-100 rounded-full text-orange-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Step 1 of 4: Event & Dietary Setup</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            Select Your <span className="text-orange-600">Event</span> & <span className="text-emerald-800">Dietary Preferences</span>
          </h1>
          
          <p className="text-stone-600 text-base sm:text-lg">
            Tell us about your celebration so our Menu Builder can tailor chef-crafted dishes and calculate accurate costs.
          </p>

          {/* Stepper Progress Bar */}
          <div className="pt-4 flex items-center justify-center space-x-2 sm:space-x-4 text-xs font-bold">
            <div className="flex items-center space-x-1.5 text-orange-600">
              <span className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-[11px]">1</span>
              <span>Event & Diet</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-stone-300" />
            <div className="flex items-center space-x-1.5 text-stone-400">
              <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[11px]">2</span>
              <span>Menu Builder</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-stone-300" />
            <div className="flex items-center space-x-1.5 text-stone-400">
              <span className="w-6 h-6 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-[11px]">3</span>
              <span>Cost Calculator</span>
            </div>
          </div>
        </div>

        {/* Section 1: Event Type Selection */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-stone-900 flex items-center">
                <Utensils className="w-5 h-5 mr-2 text-orange-600" />
                1. Choose Event Type
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Select your occasion to unlock specialized event menus and station setups.
              </p>
            </div>
            <span className="text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 px-3 py-1 rounded-lg">
              Selected: {selectedEventType}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedEventType === option.title;

              return (
                <div
                  key={option.id}
                  onClick={() => handleEventSelect(option)}
                  className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-2 cursor-pointer flex flex-col justify-between transform hover:-translate-y-1 ${
                    isSelected 
                      ? 'border-orange-500 ring-2 ring-orange-300 shadow-lg' 
                      : 'border-stone-200 hover:border-orange-300'
                  }`}
                >
                  {/* Image with Selection Checkmark */}
                  <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                    <img 
                      src={option.image} 
                      alt={option.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/90 text-stone-800 shadow-xs uppercase tracking-wider">
                        {option.popularBadge}
                      </span>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                        isSelected ? 'bg-orange-600 text-white' : 'bg-white/80 text-stone-400 group-hover:text-stone-700'
                      }`}>
                        <Check className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Title with Icon */}
                    <div className="absolute bottom-3 left-3 right-3 text-white flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-lg text-white">
                        {option.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {option.tagline}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1">
                        {option.highlights.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex items-center text-[11px] text-stone-600 space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Pricing & Select Button */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400 block font-medium">Avg Catering Range</span>
                        <span className="text-xs font-bold text-emerald-800">{option.avgCost}</span>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                        isSelected ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {isSelected ? 'Selected' : 'Select'}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Dietary Preferences Selection */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <h2 className="text-2xl font-black text-stone-900 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-emerald-700" />
                2. Select Dietary Preferences
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Pick all dietary requirements that apply to your guests (multi-select supported).
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-stone-500">Active Diets:</span>
              <div className="flex gap-1.5">
                {(eventData.dietaryPreferences || []).map((diet) => (
                  <span key={diet} className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                    ✓ {diet}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dietaryOptions.map((diet) => {
              const isSelected = (eventData.dietaryPreferences || []).includes(diet.id);

              return (
                <div
                  key={diet.id}
                  onClick={() => toggleDietaryPreference(diet.id)}
                  className={`bg-white rounded-2xl overflow-hidden p-6 border-2 shadow-sm hover:shadow-lg transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected 
                      ? 'border-emerald-600 ring-2 ring-emerald-300/60 bg-emerald-50/20' 
                      : 'border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  {/* Top Bar with Icon & Toggle Box */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl ${diet.iconBg} text-white flex items-center justify-center font-bold text-lg shadow-sm`}>
                        {diet.label[0]}
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold text-stone-900 flex items-center">
                          {diet.label}
                        </h3>
                        <span className="text-xs font-semibold text-emerald-800">
                          {diet.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                      isSelected 
                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                        : 'border-stone-300 bg-white text-transparent'
                    }`}>
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>

                  {/* Food Thumbnail preview & Description */}
                  <div className="space-y-3 flex-1">
                    <div className="h-32 w-full rounded-xl overflow-hidden relative">
                      <img 
                        src={diet.image} 
                        alt={diet.label} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                        {diet.stat}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {diet.description}
                    </p>
                  </div>

                  {/* Toggle Status Pill */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-stone-400">Status for this event:</span>
                    <span className={isSelected ? 'text-emerald-700 font-bold' : 'text-stone-400'}>
                      {isSelected ? '✓ Included in Menu' : '+ Click to Include'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Event Logistics Details (Guests, Date, Meal Time) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200/90 mb-10">
          <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center">
            <Users className="w-5 h-5 mr-2 text-orange-600" />
            3. Event Details & Guest Count
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Guest Count Slider & Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Expected Attendees
                </label>
                <span className="text-base font-extrabold text-orange-600 bg-orange-50 px-3 py-0.5 rounded-lg border border-orange-200">
                  {guestCount} Guests
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="1000"
                step="10"
                value={guestCount}
                onChange={(e) => {
                  setGuestCount(Number(e.target.value));
                  updateEventData({ guestCount: Number(e.target.value) });
                }}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-medium">
                <span>Intimate (20)</span>
                <span>Medium (250)</span>
                <span>Grand (1,000+)</span>
              </div>
            </div>

            {/* Tentative Event Date */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
                Tentative Event Date
              </label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => {
                  setEventDate(e.target.value);
                  updateEventData({ eventDate: e.target.value });
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none"
              />
            </div>

            {/* Meal Time / Slot */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                Meal Slot
              </label>
              <select
                value={mealType}
                onChange={(e) => {
                  setMealType(e.target.value);
                  updateEventData({ mealType: e.target.value });
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none"
              >
                <option value="Lunch">Lunch Service (12:00 PM – 3:30 PM)</option>
                <option value="Dinner">Dinner Feast (7:00 PM – 11:30 PM)</option>
                <option value="High Tea">High Tea & Evening Snacks (4:00 PM – 7:00 PM)</option>
                <option value="Full Day">Full Day Multi-Meal Catering</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-3 text-red-700 text-sm mb-6 animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Bottom Sticky Action Bar / Summary */}
        <div className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ready for Custom Course Selection</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {selectedEventType} • {guestCount} Guests
            </h3>
            <p className="text-xs text-stone-300">
              Dietary Profiles Selected:{' '}
              <span className="text-amber-300 font-bold">
                {(eventData.dietaryPreferences || []).join(' + ') || 'None selected'}
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 md:flex-none px-5 py-3.5 border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800 rounded-xl font-bold text-sm transition-colors text-center cursor-pointer"
            >
              Back to Home
            </button>

            <button
              type="button"
              onClick={handleContinue}
              className="flex-1 md:flex-none px-8 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-orange-600/30 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <span>Continue to Menu Builder</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
