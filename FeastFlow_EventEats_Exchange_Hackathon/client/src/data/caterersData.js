// FeastFlow EventEats Exchange - Mock Data & Categories
// Curated high quality food & catering photography from Unsplash

export const eventCategories = [
  {
    id: 'college',
    name: 'College Events',
    slug: 'college-events',
    tagline: 'High-energy, budget-friendly food stations & fest bites',
    icon: 'GraduationCap',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    popularItems: ['Live Burger & Pizza Grills', 'Chaat & Street Food Stalls', 'Midnight Snack Boxes', 'Mocktail Bars'],
    avgPrice: '$12 - $22 / person',
    catererCount: 14,
    badge: 'Popular with Students'
  },
  {
    id: 'birthday',
    name: 'Birthday Parties',
    slug: 'birthday-parties',
    tagline: 'Fun finger foods, interactive live counters & gourmet desserts',
    icon: 'Cake',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    popularItems: ['Artisanal Cupcake Towers', 'Pasta & Taco Stations', 'Kids & Adult Custom Menus', 'Gourmet Sliders'],
    avgPrice: '$18 - $35 / person',
    catererCount: 22,
    badge: 'Family Favorite'
  },
  {
    id: 'wedding',
    name: 'Weddings',
    slug: 'weddings',
    tagline: 'Opulent multi-course banquets, royal buffets & live dessert spreads',
    icon: 'HeartHandshake',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    popularItems: ['Royal Multi-Course Feast', 'Live Tandoor & Barbecue', 'Exotic Sweet & Dessert Bar', 'Welcome Drink Pavilions'],
    avgPrice: '$35 - $85 / person',
    catererCount: 18,
    badge: 'Premium & Luxury'
  },
  {
    id: 'corporate',
    name: 'Corporate Events',
    slug: 'corporate-events',
    tagline: 'Professional executive lunches, networking buffets & artisanal coffee',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    popularItems: ['Bento Box Luncheons', 'Gourmet Continental Buffet', 'Healthy Grain Bowls', 'Specialty Espresso Bar'],
    avgPrice: '$20 - $45 / person',
    catererCount: 27,
    badge: 'Executive Choice'
  }
];

export const featuredCaterers = [
  {
    id: 'caterer-1',
    name: 'Royal Heritage Banquets & Feasts',
    tagline: 'Grand royal wedding banquets & signature multi-course spreads',
    rating: 4.9,
    reviewCount: 342,
    pricePerPlate: 42,
    currency: '$',
    minGuests: 100,
    maxGuests: 2500,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    categories: ['Weddings', 'Corporate Events'],
    specialty: 'North & South Royal Indian, Awadhi & Continental',
    dietary: ['Vegetarian', 'Non-Veg', 'Halal', 'Jain Options'],
    hygieneRating: '5/5 Gold Certified',
    city: 'Metro City & Suburbs',
    experienceYears: 16,
    featuredMenu: [
      'Saffron Infused Biryani',
      'Smoked Butter Paneer / Chicken Tikka',
      'Dal Bukhara Slow Cooked 24hrs',
      'Artisanal Kulfi & Gulab Jamun Fondue'
    ],
    samplePackages: [
      { name: 'Silver Grand', price: 38, items: 14 },
      { name: 'Gold Emperor', price: 48, items: 22 },
      { name: 'Platinum Royal', price: 65, items: 32 }
    ]
  },
  {
    id: 'caterer-2',
    name: 'CampusGrill & Fest Eats',
    tagline: 'Budget-friendly, ultra-flavorful live food bars for student festivals',
    rating: 4.8,
    reviewCount: 218,
    pricePerPlate: 16,
    currency: '$',
    minGuests: 30,
    maxGuests: 1200,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    categories: ['College Events', 'Birthday Parties'],
    specialty: 'Smash Burgers, Loaded Fries, Woodfire Pizzas & Boba',
    dietary: ['Vegetarian', 'Vegan Friendly', 'Custom Spiciness'],
    hygieneRating: '4.9/5 Certified',
    city: 'University Town',
    experienceYears: 6,
    featuredMenu: [
      'Gourmet Brioche Sliders (Veg & Chicken)',
      'Live Woodfire Thin-Crust Pizzas',
      'Chili Lime Nacho & Guacamole Bar',
      'Craft Mocktails & Iced Boba Tea'
    ],
    samplePackages: [
      { name: 'Fest Basic', price: 14, items: 8 },
      { name: 'Campus Favorite', price: 18, items: 12 },
      { name: 'All-Nighter Mega', price: 24, items: 16 }
    ]
  },
  {
    id: 'caterer-3',
    name: 'The Green Leaf Artisanal Kitchen',
    tagline: 'Farm-to-table organic, gluten-free & vegan culinary delights',
    rating: 4.95,
    reviewCount: 189,
    pricePerPlate: 28,
    currency: '$',
    minGuests: 25,
    maxGuests: 600,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    categories: ['Corporate Events', 'Birthday Parties', 'Weddings'],
    specialty: 'Mediterranean, Farm Fresh Salads, Vegan Desserts',
    dietary: ['100% Organic', 'Gluten-Free', 'Vegan', 'Eco-Packaging'],
    hygieneRating: '5/5 Green Star',
    city: 'Downtown Eco District',
    experienceYears: 9,
    featuredMenu: [
      'Heirloom Tomato & Burrata Platter',
      'Wild Mushroom & Truffle Risotto',
      'Grilled Mediterranean Vegetable Skewers',
      'Vegan Dark Chocolate Avocado Mousse'
    ],
    samplePackages: [
      { name: 'Organic Light', price: 25, items: 10 },
      { name: 'Green Gourmet', price: 32, items: 16 },
      { name: 'Earth Luxury', price: 45, items: 24 }
    ]
  },
  {
    id: 'caterer-4',
    name: 'Fiesta & Flavors Celebration Caterers',
    tagline: 'Vibrant, colorful street-food counters & joyful party gastronomy',
    rating: 4.85,
    reviewCount: 275,
    pricePerPlate: 22,
    currency: '$',
    minGuests: 20,
    maxGuests: 800,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=1200&q=80',
    categories: ['Birthday Parties', 'College Events'],
    specialty: 'Live Mexican Taco Bar, Dim Sum Steamers & Cotton Candy',
    dietary: ['Vegetarian', 'Nut-Free', 'Kids Special'],
    hygieneRating: '4.8/5 Certified',
    city: 'Central Valley',
    experienceYears: 8,
    featuredMenu: [
      'Custom DIY Street Taco Bar',
      'Steamed Crystal Truffle Dim Sums',
      'Crispy Churros with Belgian Chocolate',
      'Signature Sparkling Citrus Punches'
    ],
    samplePackages: [
      { name: 'Party Pop', price: 20, items: 10 },
      { name: 'Carnival Feast', price: 26, items: 15 },
      { name: 'VIP Birthday Extravaganza', price: 34, items: 20 }
    ]
  },
  {
    id: 'caterer-5',
    name: 'Executive Epicure Hospitality',
    tagline: 'Precision culinary execution for AGMs, galas & tech summits',
    rating: 4.9,
    reviewCount: 410,
    pricePerPlate: 32,
    currency: '$',
    minGuests: 40,
    maxGuests: 3000,
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
    categories: ['Corporate Events', 'Weddings'],
    specialty: 'Pan-Asian & Continental Fine Dining, Barista Counters',
    dietary: ['Executive Diets', 'Keto', 'Halal Certified', 'Allergen Labeled'],
    hygieneRating: '5/5 ISO 22000',
    city: 'Financial District & Tech Corridor',
    experienceYears: 14,
    featuredMenu: [
      'Smoked Salmon Canapes & Herb Bruschetta',
      'Sous-Vide Herb Crusted Medallions / Cottage Cheese',
      'Artisanal Cheese & Charcuterie Grazing Table',
      'Single-Origin Pour-over Coffee Bar'
    ],
    samplePackages: [
      { name: 'Summit Lunch', price: 30, items: 12 },
      { name: 'Boardroom Gala', price: 42, items: 18 },
      { name: 'Global Delegate Dinner', price: 58, items: 26 }
    ]
  },
  {
    id: 'caterer-6',
    name: 'Saffron & Spice Traditional Banqueting',
    tagline: 'Authentic regional recipes passed through three generations of master chefs',
    rating: 4.92,
    reviewCount: 360,
    pricePerPlate: 26,
    currency: '$',
    minGuests: 50,
    maxGuests: 4000,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    coverImage: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80',
    categories: ['Weddings', 'Birthday Parties'],
    specialty: 'Authentic Dum Biryanis, Live Chaat Bazaar & Traditional Sweets',
    dietary: ['Pure Veg Available', 'Halal Certified', 'Jain Specialty'],
    hygieneRating: '4.9/5 Certified',
    city: 'Heritage Quarter',
    experienceYears: 28,
    featuredMenu: [
      'Hyderabadi Dum Biryani with Mirchi ka Salan',
      'Live Chandni Chowk Chaat Counter',
      'Hand-churned Malai Rabdi with Jalebi',
      'Rose Petal & Cardamom Thandai'
    ],
    samplePackages: [
      { name: 'Tradition Classic', price: 24, items: 12 },
      { name: 'Utsav Special', price: 32, items: 18 },
      { name: 'Maharaja Royal', price: 46, items: 28 }
    ]
  }
];

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Select Event',
    description: 'Pick your celebration type—college fest, birthday, wedding, or corporate conference—and tell us your guest count and date.',
    icon: 'CalendarDays',
    color: 'from-orange-500 to-amber-500',
    tip: 'Filter caterers with verified guest capacity from 20 to 5,000+'
  },
  {
    step: '02',
    title: 'Choose Menu',
    description: 'Browse curated multi-course menus or custom build your courses with appetizers, mains, desserts, live food counters & drinks.',
    icon: 'UtensilsCrossed',
    color: 'from-amber-500 to-emerald-600',
    tip: 'Filter by Veg, Vegan, Halal, Jain, or Gluten-Free in one click'
  },
  {
    step: '03',
    title: 'Calculate Budget',
    description: 'Get instant, 100% transparent cost calculations per plate with staffing, cutlery, and taxes with zero surprise hidden charges.',
    icon: 'Calculator',
    color: 'from-emerald-600 to-green-700',
    tip: 'Interactive cost slider updates prices dynamically in real time'
  },
  {
    step: '04',
    title: 'Book Caterer',
    description: 'Schedule a food tasting session at your doorstep or venue, review custom PDF quotations, and lock in your caterer with confidence.',
    icon: 'CheckCircle2',
    color: 'from-green-700 to-teal-800',
    tip: 'Free tasting sessions available for events over 75 guests'
  }
];

export const customerReviews = [
  {
    id: 1,
    name: 'Ananya Sharma',
    role: 'College Cultural Fest Secretary',
    event: 'College Mega Fest (850 Guests)',
    rating: 5,
    comment: 'FeastFlow saved our annual fest! Finding a caterer who could do live burger stations, pizzas, and mocktails within our tight student council budget was a breeze. The transparency is unreal.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    catererHired: 'CampusGrill & Fest Eats'
  },
  {
    id: 2,
    name: 'David & Sarah Chen',
    role: 'Newlyweds',
    event: 'Wedding Reception (350 Guests)',
    rating: 5,
    comment: 'The food tasting booking was seamless. We tasted 6 dishes before committing, and on our wedding day, the Royal Heritage team delivered an unforgettable 5-star royal banquet!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    catererHired: 'Royal Heritage Banquets'
  },
  {
    id: 3,
    name: 'Vikramaditya Rao',
    role: 'VP People & Operations',
    event: 'Tech Annual Summit (600 Guests)',
    rating: 5,
    comment: 'Instant PDF quotation with itemized tax and staffing breakdown made corporate finance approval take less than 15 minutes. Executive Epicure was flawless.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    catererHired: 'Executive Epicure Hospitality'
  }
];
