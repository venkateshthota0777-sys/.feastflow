import React from 'react';
import { 
  UtensilsCrossed, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  ArrowUp,
  ShieldCheck,
  Share2,
  Globe
} from 'lucide-react';

export default function Footer({ onExploreCaterers, onOpenCalculator }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t-4 border-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Column 1: About FeastFlow (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              onClick={scrollToTop}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white flex items-center">
                  Feast<span className="text-orange-500">Flow</span>
                  <span className="ml-1 text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 bg-emerald-900 text-emerald-300 rounded">
                    Exchange
                  </span>
                </span>
                <span className="text-[11px] font-medium text-stone-400 -mt-1">
                  Event Catering Marketplace
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed pr-4">
              FeastFlow connects event organizers with premier, hygiene-certified caterers. Plan custom multi-course menus, compare real-time pricing, book tasting sessions, and download PDF quotes seamlessly.
            </p>

            <div className="flex items-center space-x-2 text-xs text-emerald-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Certified Kitchens & Verified Reviews</span>
            </div>
          </div>

          {/* Column 2: Services (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Catering Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => scrollToSection('event-categories')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Weddings & Royal Banquets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('event-categories')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  College Fests & Student Events
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('event-categories')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Corporate Summits & Box Lunches
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('event-categories')}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Birthday & Private Celebrations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (onOpenCalculator) onOpenCalculator();
                    else scrollToSection('quick-calculator');
                  }}
                  className="hover:text-orange-400 transition-colors text-left text-amber-300 font-semibold flex items-center"
                >
                  <span>Interactive Budget Estimator</span>
                  <span className="ml-1.5 text-[9px] px-1.5 py-0.5 bg-amber-400/20 text-amber-300 rounded">Live</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Support (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact & Support
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>FeastFlow HQ, Innovation Hub, Tech Park Campus</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="mailto:support@feastflow.com" className="hover:text-white transition-colors">
                  support@feastflow.com
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+1 (800) FEAST-EATS / 24/7 Helpline</span>
              </div>
              <div className="pt-1">
                <span className="inline-block px-2.5 py-1 rounded bg-stone-800 text-[11px] text-amber-300 font-medium">
                  ⚡ Response time: Under 15 mins
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Social Media (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Connect With Us
            </h4>
            <p className="text-xs text-stone-400">
              Follow our catering showcases & chef specials:
            </p>
            
            {/* Direct Vector SVG Icons for Social Media */}
            <div className="flex items-center space-x-2 pt-1">
              {/* Instagram */}
              <a 
                href="#instagram" 
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-orange-600 flex items-center justify-center text-stone-300 hover:text-white transition-all"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a 
                href="#twitter" 
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-orange-600 flex items-center justify-center text-stone-300 hover:text-white transition-all"
                title="X / Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="#linkedin" 
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-orange-600 flex items-center justify-center text-stone-300 hover:text-white transition-all"
                title="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="#youtube" 
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-orange-600 flex items-center justify-center text-stone-300 hover:text-white transition-all"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-colors border border-stone-700"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Hackathon Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} FeastFlow: EventEats Exchange. Built with React, Vite & Tailwind CSS.
          </div>
          <div className="flex items-center space-x-1">
            <span>Crafted for Hackathon Excellence with</span>
            <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>and Great Food.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
