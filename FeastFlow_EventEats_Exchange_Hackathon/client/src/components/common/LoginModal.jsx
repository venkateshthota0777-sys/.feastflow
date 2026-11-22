import React, { useState } from 'react';
import { X, Lock, Mail, UserCheck, Utensils, CheckCircle, ArrowRight } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [userType, setUserType] = useState('customer'); // 'customer' | 'vendor'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDemoFill = (type) => {
    setUserType(type);
    if (type === 'customer') {
      setEmail('ananya.host@feastflow.com');
      setPassword('demoHost123');
    } else {
      setEmail('partner@royalheritage.com');
      setPassword('demoCaterer123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        if (onLoginSuccess) {
          onLoginSuccess({
            name: userType === 'customer' ? 'Ananya (Event Host)' : 'Royal Heritage Partner',
            email,
            type: userType
          });
        }
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-amber-100 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-800 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 mb-2">
            <span className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
              <Utensils className="w-5 h-5 text-amber-200" />
            </span>
            <span className="font-bold tracking-wide text-lg">FeastFlow Portal</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Welcome Back</h3>
          <p className="text-amber-100 text-sm mt-1">Sign in to manage catering bookings & quotes</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User Role Switcher */}
          <div className="grid grid-cols-2 p-1 mb-6 bg-stone-100 rounded-xl">
            <button
              type="button"
              onClick={() => setUserType('customer')}
              className={`flex items-center justify-center py-2 text-sm font-semibold rounded-lg transition-all ${
                userType === 'customer'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Event Host
            </button>
            <button
              type="button"
              onClick={() => setUserType('vendor')}
              className={`flex items-center justify-center py-2 text-sm font-semibold rounded-lg transition-all ${
                userType === 'vendor'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Utensils className="w-4 h-4 mr-2" />
              Caterer Partner
            </button>
          </div>

          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-stone-800">Successfully Signed In!</h4>
              <p className="text-sm text-stone-500">Redirecting to your FeastFlow dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={userType === 'customer' ? 'youremail@example.com' : 'catering@vendor.com'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-stone-800 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-orange-600 hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-3 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-stone-800 text-sm transition-all"
                  />
                </div>
              </div>

              {/* One-click Demo Account helper for Hackathon Judges */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs space-y-2">
                <div className="flex items-center justify-between font-semibold text-amber-900">
                  <span>⚡ Quick Demo Login (Hackathon Mode):</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoFill('customer')}
                    className="flex-1 py-1 px-2 bg-white hover:bg-orange-50 text-orange-700 border border-orange-200 rounded-lg text-xs font-medium text-center transition-colors"
                  >
                    Demo Host
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoFill('vendor')}
                    className="flex-1 py-1 px-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium text-center transition-colors"
                  >
                    Demo Caterer
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In to FeastFlow'}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              <p className="text-center text-xs text-stone-500 pt-2">
                New to FeastFlow?{' '}
                <a 
                  href="#register" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleDemoFill(userType);
                  }}
                  className="font-semibold text-orange-600 hover:text-orange-700"
                >
                  Create free account
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
