import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  year: string;
  category: string;
  scopeSummary: string;
  achievements: string[];
  image: string;
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const projects: Project[] = [
    {
      id: 'unep-flood-zoning',
      title: 'Climate-Resilient Land Use and Flood Zoning',
      client: 'Environmental Affairs Department (EAD) / UNEP',
      location: 'Malawi',
      year: '2025 – Ongoing',
      category: 'Climate & Planning',
      scopeSummary:
        "Supporting climate-resilient land use and flood zoning work under UNEP funding, including zoning, flood and parcel data analysis, and climate adaptation indicators[cite: 67].",
      achievements: [
        'Zoning, flood, and parcel data analysis for climate adaptation[cite: 67]',
        'Relocation capacity estimates and land use planning policy support[cite: 67]',
      ],
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'angola-caala-logistics',
      title: 'Caála Logistics Platform Feasibility Study',
      client: 'Regional Logistics Development Partners',
      location: 'Caála, Angola',
      year: '2025',
      category: 'Logistics & Infrastructure',
      scopeSummary:
        "Serving as ESIA Lead and Resettlement Specialist for the Caála Logistics Platform Project, ensuring alignment with World Bank Environmental and Social Standards[cite: 67].",
      achievements: [
        'Comprehensive environmental and social impact assessment[cite: 67]',
        'Stakeholder consultations and livelihood restoration planning[cite: 67]',
      ],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'salima-lilongwe-water',
      title: 'Salima - Lilongwe Water Project',
      client: 'Lilongwe Water Board',
      location: 'Salima to Lilongwe, Malawi',
      year: 'Pre-feasibility Stage',
      category: 'Water & Utilities',
      scopeSummary:
        "Contributing to the pre-feasibility stage focusing on environmental and social analysis, community development planning, and European Investment Bank safeguards review[cite: 68].",
      achievements: [
        'Environmental and social analysis for bulk water infrastructure[cite: 68]',
        'Community development planning and EIB safeguards review[cite: 68]',
      ],
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'shire-valley-transformation',
      title: 'Shire Valley Transformation Programme',
      client: 'Ministry of Agriculture / Irrigation Development',
      location: 'Lower Shire Valley, Malawi',
      year: 'Major Irrigation Assignment',
      category: 'Agriculture & Resettlement',
      scopeSummary:
        "Serving as RAP Consultant and RAP Team Leader for major irrigation canal assignments under World Bank and AfDB safeguard requirements[cite: 68].",
      achievements: [
        'Execution of census, socio-economic surveys, and asset inventories[cite: 68]',
        'Entitlement planning, grievance redress, and livelihood restoration[cite: 68]',
      ],
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'brighto-energy-mepa',
      title: 'Fuel Retail and Energy Compliance',
      client: 'Brighto Filling Station',
      location: 'Malawi',
      year: 'Completed',
      category: 'Energy & Compliance',
      scopeSummary:
        "Providing environmental and social safeguards services, regulatory compliance support, and project advisory leading to MEPA clearance[cite: 81].",
      achievements: [
        'Successful acquisition of statutory MEPA environmental clearance[cite: 81]',
        'Efficient navigation of complex regulatory approval processes[cite: 81]',
      ],
      image: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'nacala-railway-corridor',
      title: 'Nacala Corridor Railway Project',
      client: 'Regional Rail Authorities',
      location: 'Malawi – Mozambique Corridor',
      year: 'Infrastructure Assignment',
      category: 'Logistics & Infrastructure',
      scopeSummary:
        "Supporting land acquisition, resettlement, stakeholder engagement, and social development coordination linked to railway rehabilitation[cite: 68].",
      achievements: [
        'Resettlement and land acquisition execution[cite: 68]',
        'Social investment coordination and community engagement[cite: 68]',
      ],
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const categories = [
    'All',
    'Climate & Planning',
    'Logistics & Infrastructure',
    'Water & Utilities',
    'Agriculture & Resettlement',
    'Energy & Compliance',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Selected Projects | Urbanova Company Profile</title>
        <meta
          name="description"
          content="Explore Urbanova's selected project experience across Malawi and Southern Africa, including UNEP flood zoning, Caála Logistics, and Shire Valley RAP."
        />
      </Head>

      <div className="w-full font-sans text-neutral-800 bg-white">
        {/* Top Header Banner - Matches Reference Style */}
        <section className="relative overflow-hidden bg-[#13313d] text-white py-16 px-6 md:px-12 lg:px-16">
          <div className="absolute top-0 right-0 h-full w-1/3 bg-[#5ebbb7]/20 transform skew-x-12 translate-x-12 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="inline-block border-b-2 border-[#5ebbb7] pb-1 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Selected project experience
              </h1>
            </div>
          </div>
        </section>

        {/* Section Intro Heading & Subtitle */}
        <section className="pt-14 pb-10 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#13313d] leading-snug">
            Turning complex challenges into better outcomes across Malawi and Southern Africa[cite: 67].
          </h2>
          <div className="w-10 h-1 bg-[#5ebbb7] my-4" />
          <p className="text-sm leading-relaxed text-neutral-600 max-w-4xl">
            Urbanova draws on extensive regional experience serving government institutions, development partners, infrastructure developers, and private sector organizations. Our portfolio reflects our ability to meet strict international standards and deliver practical solutions that inform investment decisions[cite: 67, 68].
          </p>
        </section>

        {/* Filter Navigation Bar */}
        <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto mb-10">
          <div className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#13313d] text-white'
                    : 'bg-[#f5f8f8] text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Project Cards Section (Dark Teal Grid Layout inspired by reference) */}
        <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col overflow-hidden rounded-sm bg-[#0b2834] text-white shadow-xs group hover:bg-[#0f3444] transition-colors"
              >
                {/* Top Image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom Dark Block Text */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#5ebbb7] uppercase tracking-wider mb-2 font-semibold">
                      <span>{project.year}</span>
                      <span>{project.location}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs font-medium text-slate-300 mb-3">
                      Client: {project.client}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {project.scopeSummary}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-3">
                    <ul className="space-y-1">
                      {project.achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start text-[11px] text-slate-300">
                          <span className="text-[#5ebbb7] mr-1.5 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="bg-[#f5f8f8] py-14 px-6 md:px-12 lg:px-16 border-t border-neutral-200/60">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#13313d]">Looking for a trusted partner for your next project?</h3>
              <p className="text-xs text-neutral-600 mt-1">
                Collaborate with our multidisciplinary team for rigorous safeguards compliance and regional advisory[cite: 67, 68].
              </p>
            </div>
            <a
              href="/#contact"
              className="border-2 border-[#13313d] text-[#13313d] px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#13313d] hover:text-white transition-colors shrink-0"
            >
              Contact our team
            </a>
          </div>
        </section>
      </div>
    </>
  );
}