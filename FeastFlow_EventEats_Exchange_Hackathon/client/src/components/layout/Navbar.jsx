import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Menu as MenuIcon, X, User, ChevronRight, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenLogin, currentUser, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateOrScroll = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md border-b border-amber-200/50 py-3' 
          : 'bg-[#FAF7F2] border-b border-stone-200/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-stone-900 flex items-center">
                Feast<span className="text-orange-600">Flow</span>
                <span className="ml-1 text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  Exchange
                </span>
              </span>
              <span className="text-[11px] font-medium text-stone-500 -mt-1 hidden sm:block">
                Event Catering Marketplace
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/70 px-4 py-1.5 rounded-full border border-stone-200/80 shadow-xs">
            <button
              onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer ${
                location.pathname === '/' 
                  ? 'text-orange-600 font-bold bg-orange-50' 
                  : 'text-stone-800 hover:text-orange-600 hover:bg-orange-50/50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateOrScroll('featured-caterers')}
              className="px-3 py-1.5 text-sm font-medium text-stone-800 hover:text-orange-600 transition-colors rounded-full hover:bg-orange-50/50 cursor-pointer"
            >
              Explore Caterers
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/menu-builder');
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors flex items-center cursor-pointer ${
                location.pathname === '/menu-builder'
                  ? 'text-orange-600 font-bold bg-orange-50' 
                  : 'text-stone-800 hover:text-orange-600 hover:bg-orange-50/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" />
              Menu Builder
            </button>
            <button
              onClick={() => navigateOrScroll('how-it-works')}
              className="px-3 py-1.5 text-sm font-medium text-stone-800 hover:text-orange-600 transition-colors rounded-full hover:bg-orange-50/50 cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => navigateOrScroll('about-section')}
              className="px-3 py-1.5 text-sm font-medium text-stone-800 hover:text-orange-600 transition-colors rounded-full hover:bg-orange-50/50 cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Right Action / Login */}
          <div className="hidden md:flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 py-1.5 px-3 rounded-full text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-emerald-800">{currentUser.name}</span>
                <button
                  onClick={onLogout}
                  className="text-stone-400 hover:text-stone-700 ml-1 text-[11px] underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center space-x-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 rounded-xl shadow-md shadow-orange-600/20 hover:shadow-lg transition-all cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => navigate('/select-event')}
              className="hidden lg:flex items-center space-x-1 px-4 py-2 text-sm font-semibold text-emerald-900 bg-emerald-100/70 hover:bg-emerald-200/80 rounded-xl transition-colors border border-emerald-300/60 cursor-pointer"
            >
              <span>Plan Event Food</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenLogin}
              className="p-2 text-orange-600 font-semibold text-xs border border-orange-200 rounded-lg bg-orange-50"
            >
              Login
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-200/60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <button
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 font-semibold text-stone-800 hover:text-orange-600 hover:bg-orange-50 rounded-lg text-sm"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate('/select-event');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 font-semibold text-orange-600 hover:bg-orange-50 rounded-lg text-sm flex items-center justify-between"
          >
            <span>Plan Event & Select Diet</span>
            <span className="text-[10px] px-2 py-0.5 bg-orange-100 rounded-full font-bold">Step 1</span>
          </button>
          <button
            onClick={() => {
              navigate('/menu-builder');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 font-semibold text-stone-800 hover:text-orange-600 hover:bg-orange-50 rounded-lg text-sm flex items-center justify-between"
          >
            <span>Menu Builder</span>
            <span className="text-[10px] px-2 py-0.5 bg-orange-100 rounded-full font-bold">Step 2</span>
          </button>
          <button
            onClick={() => {
              navigate('/quote-calculator');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 font-semibold text-stone-800 hover:text-orange-600 hover:bg-orange-50 rounded-lg text-sm flex items-center justify-between"
          >
            <span>Quote Calculator</span>
            <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-900 rounded-full font-bold">Step 3</span>
          </button>
          <button
            onClick={() => navigateOrScroll('featured-caterers')}
            className="w-full text-left py-2 px-3 font-semibold text-stone-800 hover:text-orange-600 hover:bg-orange-50 rounded-lg text-sm"
          >
            Explore Caterers
          </button>
          <button
            onClick={() => navigateOrScroll('how-it-works')}
            className="w-full text-left py-2 px-3 font-semibold text-stone-800 hover:text-orange-600 hover:bg-orange-50 rounded-lg text-sm"
          >
            How It Works
          </button>
          <button
            onClick={() => navigateOrScroll('about-section')}
            className="w-full text-left py-2 px-3 font-semibold text-stone-800 hover:text-orange-600 hover:bg-orange-50 rounded-lg text-sm"
          >
            About FeastFlow
          </button>

          <div className="pt-2 border-t border-stone-200">
            {currentUser ? (
              <div className="flex items-center justify-between py-2 px-3 bg-emerald-50 rounded-lg">
                <span className="text-xs font-semibold text-emerald-800">{currentUser.name}</span>
                <button onClick={onLogout} className="text-xs text-stone-500 underline">Logout</button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-2.5 bg-orange-600 text-white font-semibold rounded-xl text-center shadow-sm text-sm"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
