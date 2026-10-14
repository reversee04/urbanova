import { Head, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

interface Project {
  id: number;
  title: string;
  client: string;
  location: string;
  year: string;
  category: string;
  scope_summary: string;
  achievements: string[];
  image: string;
}

interface PageProps { projects: Project[]; categories: string[]; [key: string]: unknown }

export default function Projects() {
  const { projects = [], categories = ['All'] } = usePage<PageProps>().props;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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
                      {project.scope_summary}
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