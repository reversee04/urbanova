import React from 'react';

interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  url?: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Climate-resilient land use and flood zoning work under UNEP funding in Malawi',
    date: 'Ongoing 2025',
    category: 'Projects',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Environmental and social assessment for Caála Logistics Platform Feasibility Study in Angola',
    date: '2025',
    category: 'Projects',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Environmental and social safeguards for Salima - Lilongwe Water Project',
    date: '2024',
    category: 'Projects',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Resettlement Action Plan leadership for Shire Valley Transformation Programme',
    date: '2024',
    category: 'Projects',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Fuel retail & energy regulatory compliance support for Brighto Filling Station MEPA clearance',
    date: '2025',
    category: 'Energy',
    image: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Resettlement, land acquisition, and social development for Nacala Corridor Railway Project',
    date: '2023',
    category: 'Projects',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop',
  },
];

export const LatestNewsGrid: React.FC = () => {
  return (
    <section className="w-full bg-slate-50 text-slate-900 py-16 px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0C2A38] tracking-tight">
            Selected Project Experience
          </h2>
          <div className="w-10 h-[3px] bg-[#10B981] mt-2" />
        </div>

        {/* Masonry / Custom Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Column 1 */}
          <div className="space-y-6 flex flex-col">
            {/* Top Card - EAD Malawi */}
            <ArticleCard article={articles[0]} className="h-72" />
            
            {/* Bottom Card - Shire Valley */}
            <ArticleCard article={articles[3]} className="h-72" />
          </div>

          {/* Column 2 */}
          <div className="space-y-6 flex flex-col">
            {/* Tall Middle Card - Angola Logistics */}
            <ArticleCard article={articles[1]} className="h-[430px]" />
            
            {/* Wide Bottom Card - Brighto Energy */}
            <ArticleCard article={articles[4]} className="h-44" />
          </div>

          {/* Column 3 */}
          <div className="space-y-6 flex flex-col">
            {/* Top Right Card - Salima Water */}
            <ArticleCard article={articles[2]} className="h-60" />
            
            {/* Bottom Right Card - Nacala Railway */}
            <ArticleCard article={articles[5]} className="h-[370px]" />
          </div>

        </div>
      </div>
    </section>
  );
};

/* Reusable Article Card Component */
interface ArticleCardProps {
  article: Article;
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, className = '' }) => {
  return (
    <a
      href={article.url || '#'}
      className={`relative group overflow-hidden rounded-sm block w-full bg-slate-900 shadow-sm transition-all duration-300 hover:shadow-xl ${className}`}
    >
      {/* Background Image */}
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      {/* Category Badge (Top Right) */}
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-[#10B981] text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs">
          {article.category}
        </span>
      </div>

      {/* Text Content Container (Bottom Aligned) */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 space-y-2">
        <h3 className="text-white font-bold text-base md:text-lg leading-snug drop-shadow-sm group-hover:text-emerald-300 transition-colors">
          {article.title}
        </h3>

        {/* Date / Period Row */}
        <div className="flex items-center space-x-2 text-slate-300 text-xs font-medium">
          {/* Calendar Icon */}
          <svg
            className="w-3.5 h-3.5 fill-none stroke-current"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{article.date}</span>
        </div>
      </div>
    </a>
  );
};

export default LatestNewsGrid;