import React from 'react';
import { 
  GraduationCap, 
  Cake, 
  HeartHandshake, 
  Briefcase, 
  ArrowRight, 
  Sparkles,
  Users
} from 'lucide-react';
import { eventCategories } from '../../data/caterersData';

const iconMap = {
  GraduationCap,
  Cake,
  HeartHandshake,
  Briefcase
};

export default function EventCategories({ onSelectCategory, activeCategory }) {
  return (
    <section id="event-categories" className="py-20 bg-[#FAF7F2] border-t border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Curated Event Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Catering for Every <span className="text-orange-600">Celebration</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Whether you are hosting 50 students or a 2,000-guest wedding banquet, FeastFlow has verified caterers ready for you.
          </p>
        </div>

        {/* Categories Grid - 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {eventCategories.map((category) => {
            const IconComponent = iconMap[category.icon] || Sparkles;
            const isSelected = activeCategory === category.name;

            return (
              <div
                key={category.id}
                onClick={() => onSelectCategory(category.name)}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border flex flex-col cursor-pointer transform hover:-translate-y-1.5 ${
                  isSelected 
                    ? 'border-orange-500 ring-2 ring-orange-400 shadow-md' 
                    : 'border-stone-200/80 hover:border-orange-300'
                }`}
              >
                {/* Image Container with Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-stone-900 shadow-xs">
                      {category.badge}
                    </span>
                  </div>

                  {/* Icon & Title Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-600/90 flex items-center justify-center text-white">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-lg text-white group-hover:text-amber-200 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {category.tagline}
                    </p>

                    {/* Popular items teaser */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                        Popular Menu Highlights:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {category.popularItems.slice(0, 2).map((item, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Price & Action */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block font-medium">Estimated Range</span>
                      <span className="text-xs font-bold text-emerald-800">{category.avgPrice}</span>
                    </div>

                    <button
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition-colors ${
                        isSelected
                          ? 'bg-orange-600 text-white'
                          : 'bg-orange-50 text-orange-700 group-hover:bg-orange-600 group-hover:text-white'
                      }`}
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
