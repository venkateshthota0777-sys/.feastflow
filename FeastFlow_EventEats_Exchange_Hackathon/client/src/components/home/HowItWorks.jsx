import React from 'react';
import { 
  CalendarDays, 
  UtensilsCrossed, 
  Calculator, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { howItWorksSteps } from '../../data/caterersData';

const iconMap = {
  CalendarDays,
  UtensilsCrossed,
  Calculator,
  CheckCircle2
};

export default function HowItWorks({ onStartPlanning, onOpenCalculator }) {
  return (
    <section id="how-it-works" className="py-20 bg-[#FAF7F2] border-t border-stone-200/60 relative overflow-hidden">
      
      {/* Decorative background shapes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Effortless Planning</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            How <span className="text-orange-600">FeastFlow</span> Works
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Say goodbye to calling 10 different caterers for rough estimates. Follow four simple steps to lock in world-class catering.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-16 left-12 right-12 h-0.5 bg-gradient-to-r from-orange-400 via-amber-400 to-emerald-600 -z-0 opacity-40" />

          {howItWorksSteps.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles;

            return (
              <div 
                key={item.step}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl border border-stone-200/80 transition-all duration-300 flex flex-col justify-between relative group z-10"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-4xl font-black text-stone-200 group-hover:text-orange-200 transition-colors">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tip Pill at bottom */}
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md font-medium block">
                    💡 {item.tip}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner beneath How It Works */}
        <div className="mt-16 text-center">
          <button
            onClick={onStartPlanning}
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-600/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Start Planning Your Event</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
