import { Head } from '@inertiajs/react';
import React from 'react';

interface ServiceItem {
  title: string;
  desc: string;
  image: string;
}

interface ServiceCategory {
  categoryTitle: string;
  categorySubtitle: string;
  items: ServiceItem[];
}

export default function Services() {
  const serviceCategories: ServiceCategory[] = [
    {
      categoryTitle: 'Planning, Safeguards & Resettlement',
      categorySubtitle: 'Forward-looking spatial design and regulatory compliance for sustainable development.',
      items: [
        {
          title: 'Urban and Regional Planning',
          desc: 'Designing forward-looking urban and regional frameworks that guide orderly growth, land use, and sustainable infrastructure.',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
        },
        {
          title: 'Environmental and Social Impact Assessment (ESIA)',
          desc: 'Evidence-based ESIA studies that identify and mitigate risks in alignment with MEPA and international safeguard standards.',
          image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800&auto=format&fit=crop',
        },
        {
          title: 'Resettlement & Livelihood Restoration',
          desc: 'Humane and transparent resettlement, land acquisition, and entitlement planning that restores community livelihoods.',
          image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
        },
      ],
    },
    {
      categoryTitle: 'Feasibility, Data & Geospatial Intelligence',
      categorySubtitle: 'Data-driven analysis and geospatial tools empowering confident development investment.',
      items: [
        {
          title: 'Feasibility Studies & Project Preparation',
          desc: 'Comprehensive technical, financial, environmental, and social viability assessments for investment decision-making.',
          image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop',
        },
        {
          title: 'GIS, Spatial Analysis & Digital Data',
          desc: 'Geospatial mapping, drone surveying, and spatial databases enhancing planning, risk modeling, and monitoring.',
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
        },
        {
          title: 'Climate Resilience & Adaptation Planning',
          desc: 'Tailored adaptation strategies that strengthen community and institutional preparedness against climate risks.',
          image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop',
        },
      ],
    },
    {
      categoryTitle: 'Inclusion, MEAL & Standards Guidance',
      categorySubtitle: 'Ensuring social license, robust monitoring, and total alignment with national and global standards.',
      items: [
        {
          title: 'Stakeholder Engagement & Social Inclusion',
          desc: 'Structured engagement processes integrating community voices, gender sensitivity, and vulnerable groups into decision-making.',
          image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
        },
        {
          title: 'Monitoring, Evaluation & Learning (MEAL)',
          desc: 'Robust MEAL frameworks and data dashboards tracking project performance, safeguards compliance, and impact.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
        },
        {
          title: 'Standards & Regulatory Guidance',
          desc: 'Expert advisory ensuring full compliance with MEPA guidelines, World Bank ESS, IFC, and AfDB safeguard frameworks.',
          image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800&auto=format&fit=crop',
        },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>What We Do - Services | Urbanova Advisory</title>
        <meta
          name="description"
          content="Explore Urbanova's integrated services across urban planning, ESIA, resettlement, GIS analysis, climate resilience, and development advisory."
        />
      </Head>

      <div className="w-full font-sans text-neutral-800 bg-white">
        {/* Top Header Banner - Matches Reference Style */}
        <section className="relative overflow-hidden bg-[#13313d] text-white py-16 px-6 md:px-12 lg:px-16">
          <div className="absolute top-0 right-0 h-full w-1/3 bg-[#5ebbb7]/20 transform skew-x-12 translate-x-12 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="inline-block border-b-2 border-[#5ebbb7] pb-1 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                What we do
              </h1>
            </div>
          </div>
        </section>

        {/* Section Intro Heading & Subtitle */}
        <section className="pt-14 pb-10 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#13313d] leading-snug">
            We help you, our clients, unlock solutions to the challenges you face[cite: 121, 122].
          </h2>
          <div className="w-10 h-1 bg-[#5ebbb7] my-4" />
          <p className="text-sm leading-relaxed text-neutral-600 max-w-4xl">
            Whatever the scale, wherever the location, we will use our technical expertise, experience, local knowledge, and resources to develop sustainable solutions and equip you to maximize value from these in the future[cite: 121, 122, 125].
          </p>
        </section>

        {/* Service Categories Sections (Stacked 3-Card Rows with Dark Teal Cards) */}
        <div className="space-y-16 pb-20">
          {serviceCategories.map((cat, idx) => (
            <section key={cat.categoryTitle} className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
              {/* Category Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#13313d]">{cat.categoryTitle}</h3>
                <div className="w-8 h-1 bg-[#5ebbb7] my-2" />
                <p className="text-xs text-neutral-500">{cat.categorySubtitle}</p>
              </div>

              {/* 3-Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cat.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col overflow-hidden rounded-sm bg-[#0b2834] text-white shadow-xs group hover:bg-[#0f3444] transition-colors"
                  >
                    {/* Top Card Image */}
                    <div className="h-44 w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Bottom Dark Block Text */}
                    <div className="p-6 flex flex-col flex-1">
                      <h4 className="text-base font-bold text-white mb-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Call to Action Banner - Bottom Section */}
        <section className="bg-[#f5f8f8] py-14 px-6 md:px-12 lg:px-16 border-t border-neutral-200/60">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#13313d]">Need integrated planning or safeguards support?</h3>
              <p className="text-xs text-neutral-600 mt-1">
                Contact our lead consultants to discuss MEPA approvals, ESIA scoping, or master planning advisory[cite: 125, 144, 145].
              </p>
            </div>
            <a
              href="/#contact"
              className="border-2 border-[#13313d] text-[#13313d] px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#13313d] hover:text-white transition-colors shrink-0"
            >
              Get in touch
            </a>
          </div>
        </section>
      </div>
    </>
  );
}