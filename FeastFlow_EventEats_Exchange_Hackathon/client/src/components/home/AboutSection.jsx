import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Heart, 
  TrendingUp, 
  Sparkles, 
  Quote, 
  Star,
  CheckCircle 
} from 'lucide-react';
import { customerReviews } from '../../data/caterersData';

export default function AboutSection() {
  return (
    <section id="about-section" className="py-20 bg-[#FAF7F2] border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* About FeastFlow Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Montage */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80" 
                alt="FeastFlow Event Catering Showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="px-2.5 py-1 bg-emerald-700 text-emerald-100 rounded text-[10px] font-extrabold uppercase tracking-wider">
                  Our Mission
                </span>
                <h4 className="text-xl font-bold text-white">Culinary Excellence Made Transparent</h4>
                <p className="text-xs text-stone-200">
                  Empowering event organizers to feast without financial guesswork.
                </p>
              </div>
            </div>

            {/* Overlapping Stat Box */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-4 rounded-2xl shadow-xl border border-stone-200 text-stone-900 max-w-[200px]">
              <div className="text-3xl font-black text-orange-600">50,000+</div>
              <div className="text-xs font-semibold text-stone-700">Happy Event Guests Catered</div>
            </div>
          </div>

          {/* Right Column: Mission and Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>About FeastFlow</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              The Event Catering Marketplace Built for <span className="text-orange-600">Trust & Transparency</span>
            </h2>

            <p className="text-stone-600 text-base leading-relaxed">
              FeastFlow was founded with a singular conviction: planning event catering should be as effortless and joyful as the celebration itself. Traditional catering is bogged down by vague quotes, delayed email chains, hidden venue fees, and anxiety about food quality.
            </p>

            <p className="text-stone-600 text-base leading-relaxed">
              We bridge the gap between discerning hosts—from college festival committees and wedding couples to corporate event leads—and verified culinary artisans through transparent pricing, live tastings, and instant PDF estimates.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-stone-200/80 shadow-xs flex items-start space-x-3">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Verified Hygiene Standards</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Every caterer undergoes strict kitchen inspection and health licensing checks.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200/80 shadow-xs flex items-start space-x-3">
                <div className="p-2 bg-orange-100 text-orange-700 rounded-lg shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Zero Hidden Markup</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Direct caterer rates with itemized costs for staff, food, and taxes.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200/80 shadow-xs flex items-start space-x-3">
                <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Taste Before You Lock In</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Schedule sample food tasting sessions before finalizing your contract.</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200/80 shadow-xs flex items-start space-x-3">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Dedicated Event Support</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Our catering concierges support your order from tasting to last call.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Customer Testimonials Carousel/Grid */}
        <div className="pt-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              Loved by Event Organizers & Foodies
            </h3>
            <p className="text-stone-600 text-sm">
              See how student leaders, newlyweds, and enterprise managers organize catering with FeastFlow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerReviews.map((review) => (
              <div 
                key={review.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-stone-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center space-x-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-200"
                  />
                  <div>
                    <div className="text-xs font-bold text-stone-900">{review.name}</div>
                    <div className="text-[11px] text-stone-500">{review.role}</div>
                    <div className="text-[10px] text-orange-600 font-semibold mt-0.5">
                      Hired: {review.catererHired}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
