import React, { useState } from 'react';

interface ExpertiseItem {
  id: string;
  number: string;
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
  image: string;
}

const expertiseData: ExpertiseItem[] = [
  {
    id: 'urban-planning',
    number: '01',
    title: 'Urban and Regional Planning',
    description:
      'We design forward-looking urban and regional development frameworks that guide orderly growth, efficient land use, and sustainable infrastructure development aligned with long term development goals.',
    linkText: 'Learn more about Urban & Regional Planning',
    linkUrl: '/services',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop', // Layout / Spatial planning image
  },
  {
    id: 'esia',
    number: '02',
    title: 'Environmental and Social Impact Assessment (ESIA)',
    description:
      'We deliver rigorous, evidence-based ESIA studies that identify, evaluate, and mitigate environmental and social risks while ensuring full compliance with national and international safeguard standards.',
    linkText: 'Learn more about ESIA & Safeguards',
    linkUrl: '/services',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'resettlement',
    number: '03',
    title: 'Resettlement, Land Acquisition, and Livelihood Restoration',
    description:
      'We develop fair, transparent, and humane resettlement solutions that safeguard affected communities\' rights while restoring and improving livelihoods in line with global best practice.',
    linkText: 'Learn more about Resettlement & Land Acquisition',
    linkUrl: '/services',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'feasibility',
    number: '04',
    title: 'Feasibility Studies and Project Preparation',
    description:
      'We provide comprehensive feasibility analyses that assess technical, financial, environmental, and social viability, enabling clients to make confident, data driven investment decisions.',
    linkText: 'Learn more about Feasibility Studies',
    linkUrl: '/services',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'gis',
    number: '05',
    title: 'GIS, Spatial Analysis, and Digital Data Management',
    description:
      'We apply advanced geospatial technologies and data systems to deliver accurate mapping, spatial insights, and digital tools that enhance planning, monitoring, and decision making.',
    linkText: 'Learn more about GIS & Spatial Data',
    linkUrl: '/services',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'climate-resilience',
    number: '06',
    title: 'Climate Resilience and Adaptation Planning',
    description:
      'We support institutions and communities in building resilience to climate risks through tailored adaptation strategies that strengthen preparedness, reduce vulnerability, and promote sustainability.',
    linkText: 'Learn more about Climate Adaptation',
    linkUrl: '/services',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'stakeholder-engagement',
    number: '07',
    title: 'Stakeholder Engagement and Social Inclusion',
    description:
      'We facilitate meaningful and structured engagement processes that ensure inclusive participation, strengthen trust, and integrate community voices into development decision making.',
    linkText: 'Learn more about Stakeholder Engagement',
    linkUrl: '/services',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'meal',
    number: '08',
    title: 'Monitoring, Evaluation, Accountability, and Learning (MEAL)',
    description:
      'We design robust MEAL systems that track performance, measure impact, and generate actionable learning to improve project effectiveness and accountability throughout implementation.',
    linkText: 'Learn more about MEAL Frameworks',
    linkUrl: '/services',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
  },
];

export const OurExpertise: React.FC = () => {
  // Default expanded item set to '02' (ESIA)
  const [openId, setOpenId] = useState<string>('esia');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  const activeItem = expertiseData.find((item) => item.id === openId) || expertiseData[1];

  return (
    <section className="w-full bg-white text-neutral-900 py-16 px-6 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section from PDF */}
        <div className="mb-12 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase border-b-2 border-emerald-700 pb-2 inline-block text-[#0C2A38]">
            OUR EXPERTISE
          </h2>
          <p className="mt-6 text-sm md:text-base text-neutral-600 leading-relaxed font-normal">
            Urbanova provides integrated planning, environmental, social, health and safety, GIS, data management, and development advisory services for infrastructure and development projects[cite: 11]. We support public institutions, private developers, NGOs, financiers, and development partners across the full project cycle, from project preparation and feasibility assessment to implementation support, monitoring, compliance, and evaluation[cite: 11].
          </p>
        </div>

        {/* Content Layout: Accordion (Left) + Dynamic Image (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Accordion List */}
          <div className="lg:col-span-7 divide-y divide-neutral-300 border-t border-b border-neutral-300">
            {expertiseData.map((item) => {
              const isOpen = openId === item.id;

              return (
                <div key={item.id} className="py-4 transition-colors">
                  {/* Accordion Header Button */}
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between text-left py-2 focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-baseline space-x-6">
                      {/* Number */}
                      <span className="text-lg md:text-xl text-emerald-700 font-semibold w-8">
                        {item.number}
                      </span>
                      {/* Title */}
                      <span className="text-lg md:text-xl font-bold text-neutral-900 group-hover:text-emerald-800 transition-colors">
                        {item.title}
                      </span>
                    </div>

                    {/* Plus / Minus Icon */}
                    <span className="text-2xl font-light text-neutral-800 ml-4">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>

                  {/* Accordion Expanded Content */}
                  {isOpen && (
                    <div className="pl-14 pr-4 pt-2 pb-4 space-y-3 animate-fadeIn">
                      <p className="text-xs md:text-sm text-neutral-600 leading-relaxed max-w-xl">
                        {item.description}
                      </p>
                      {item.linkText && (
                        <a
                          href={item.linkUrl || '#'}
                          className="inline-block text-xs font-semibold text-emerald-800 hover:text-emerald-900 underline transition-colors"
                        >
                          {item.linkText}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side: Responsive Dynamic Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end sticky top-8">
            <div className="relative w-full max-w-lg h-[450px] md:h-[520px] overflow-hidden rounded-3xl shadow-lg border border-neutral-100">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-wider bg-emerald-700 px-2.5 py-1 rounded-xs">
                  {activeItem.number} Service Area
                </span>
                <h3 className="text-lg font-bold mt-2 drop-shadow-sm">
                  {activeItem.title}
                </h3>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default OurExpertise;
