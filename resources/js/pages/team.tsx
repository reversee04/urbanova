import { Head, usePage } from '@inertiajs/react';
import React from 'react';

interface TeamMember { id: number; name: string; role: string; description: string; image: string }
interface PageProps { members: TeamMember[]; [key: string]: unknown }

export default function Team() {
  const { members = [] } = usePage<PageProps>().props;


  return (
    <>
      <Head>
        <title>Our People - Team | Urbanova Advisory</title>
        <meta
          name="description"
          content="Meet Urbanova's multidisciplinary team of experts led by Founder and Principal Advisor Hastings Jolotie Nyirenda."
        />
      </Head>

      <div className="w-full font-sans text-neutral-800 bg-white">
        {/* Header Banner - Matches Reference Style */}
        <section className="relative overflow-hidden bg-[#13313d] text-white py-16 px-6 md:px-12 lg:px-16">
          <div className="absolute top-0 right-0 h-full w-1/3 bg-[#5ebbb7]/20 transform skew-x-12 translate-x-12 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="inline-block border-b-2 border-[#5ebbb7] pb-1 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Our people
              </h1>
            </div>
          </div>
        </section>

        {/* Section Intro Subtitle */}
        <section className="pt-14 pb-10 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#13313d] leading-snug">
            Our greatest asset[cite: 131, 140]
          </h2>
          <div className="w-10 h-1 bg-[#5ebbb7] my-4" />
          <p className="text-sm leading-relaxed text-neutral-600 max-w-4xl">
            Urbanova is led by highly experienced and multidisciplinary professionals with extensive regional and international expertise in urban planning, environmental and social safeguards, resettlement planning, GIS, climate resilience, and development advisory[cite: 130]. Our owner-led model ensures direct senior-level oversight on every assignment[cite: 121, 131].
          </p>
        </section>

        {/* Meet the Executive Team Section (Grid of Profile Cards in Dark Teal Style) */}
        <section className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto pb-20">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#13313d]">Meet the executive and technical team</h3>
            <div className="w-8 h-1 bg-[#5ebbb7] mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex flex-col overflow-hidden rounded-sm bg-[#0b2834] text-white shadow-xs group hover:bg-[#0f3444] transition-colors"
              >
                {/* Top Member Image */}
                <div className="h-64 w-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom Dark Block Text */}
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-lg font-bold text-white mb-1 leading-snug">
                    {member.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#5ebbb7] uppercase tracking-wider mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed mt-auto">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="bg-[#f5f8f8] py-14 px-6 md:px-12 lg:px-16 border-t border-neutral-200/60">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#13313d]">Looking to partner with our multidisciplinary experts?</h3>
              <p className="text-xs text-neutral-600 mt-1">
                Get in touch with Hastings Jolotie Nyirenda and the Urbanova team for your next assignment[cite: 130, 145].
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