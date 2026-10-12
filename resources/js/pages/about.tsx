import { Head } from '@inertiajs/react';
import React from 'react';

export default function About() {
  const coreThemes = [
    { title: 'Integrity', desc: 'Conducting our work with honesty, accountability, confidentiality, and professional independence.' },
    { title: 'Quality', desc: 'Applying clear methods, reliable data, field verification, technical review, and evidence-based reporting.' },
    { title: 'Inclusion', desc: 'Promoting meaningful participation of women, youth, vulnerable households, and affected communities.' },
    { title: 'Practicality', desc: 'Preparing actionable reports, tools, and recommendations tailored for real-world decision making and implementation.' },
    { title: 'Safeguards Compliance', desc: 'Aligning assignments with national laws, donor requirements, and World Bank Environmental & Social Standards.' },
  ];

  return (
    <>
      <Head>
        <title>Who We Are - About Urbanova | Development & Planning Advisory</title>
        <meta
          name="description"
          content="Urbanova is a Malawian consultancy firm delivering integrated solutions in urban planning, environmental and social safeguards, climate resilience, and development advisory."
        />
      </Head>

      <div className="w-full font-sans text-neutral-800 bg-white">
        {/* Header Banner - Matches WRC Top Hero Layout */}
        <section className="relative overflow-hidden bg-[#13313d] text-white py-16 px-6 md:px-12 lg:px-16">
          <div className="absolute top-0 right-0 h-full w-1/3 bg-[#5ebbb7]/20 transform skew-x-12 translate-x-12 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="inline-block border-b-2 border-[#5ebbb7] pb-1 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Who we are - About Urbanova
              </h1>
            </div>
          </div>
        </section>

        {/* Overview Section - Two-Column Layout (Text Left, Image Right) */}
        <section className="py-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl md:text-3xl font-bold text-[#13313d] leading-snug">
                Provider of integrated consultancy, environmental safeguards, spatial planning, and development advisory across Malawi and Southern Africa[cite: 91, 92].
              </h2>
              <div className="w-10 h-1 bg-[#5ebbb7]" />
              
              <p className="text-sm leading-relaxed text-neutral-600">
                Established in 2025 by Hastings Jolotie Nyirenda, Urbanova was founded to support governments, development partners, infrastructure developers, and private sector clients with practical, evidence-based, and socially responsible consultancy services[cite: 91].
              </p>
              
              <p className="text-sm leading-relaxed text-neutral-600">
                With a foundation built on over 15 years of regional experience, we help clients understand the environmental, social, institutional, and spatial realities that influence project success—ensuring development interventions are technically sound, compliant, and sustainable[cite: 91, 92].
              </p>
            </div>

            {/* Right Image Container */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-sm shadow-md border border-neutral-100">
                <img
                  src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop"
                  alt="Sustainable development planning and spatial intelligence"
                  className="w-full h-[320px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Banner Section - Centered Light Box */}
        <section className="bg-[#f5f8f8] py-14 px-6 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl font-bold text-[#13313d] mb-1">Our mission</h2>
            <div className="w-8 h-1 bg-[#5ebbb7] mx-auto mb-8" />
            
            <div className="bg-white p-8 md:p-10 rounded-sm shadow-xs border border-neutral-200/60">
              <p className="text-base md:text-lg italic font-serif text-neutral-700 leading-relaxed">
                "To provide practical, evidence-based consultancy services that support sustainable, inclusive, and compliant development across urban planning, environmental and social safeguards, and climate resilience[cite: 93]."
              </p>
            </div>
          </div>
        </section>

        {/* Our Core Themes / Values Section - Dark Teal Grid Layout */}
        <section className="py-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#13313d]">Our core values</h2>
            <div className="w-8 h-1 bg-[#5ebbb7] mx-auto mt-2" />
          </div>

          {/* Top Row: 3 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {coreThemes.slice(0, 3).map((theme) => (
              <div
                key={theme.title}
                className="bg-[#0b2834] text-white p-8 rounded-sm h-[180px] flex flex-col justify-center text-center shadow-xs hover:bg-[#0f3444] transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-white">{theme.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{theme.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Row: 2 Centered Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {coreThemes.slice(3, 5).map((theme) => (
              <div
                key={theme.title}
                className="bg-[#0b2834] text-white p-8 rounded-sm h-[180px] flex flex-col justify-center text-center shadow-xs hover:bg-[#0f3444] transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-white">{theme.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{theme.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our People Section - Two-Column Layout (Image Left, Text Right) */}
        <section className="bg-[#f5f8f8] py-16 px-6 md:px-12 lg:px-16 border-t border-neutral-200/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-sm shadow-md border border-neutral-200">
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop"
                  alt="Urbanova Multidisciplinary Technical Experts"
                  className="w-full h-[320px] object-cover"
                />
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl font-bold text-[#13313d]">Our people</h2>
              <div className="w-10 h-1 bg-[#5ebbb7]" />
              
              <p className="text-sm leading-relaxed text-neutral-600">
                Urbanova is led by Founder and Principal Advisor Hastings Jolotie Nyirenda alongside a multidisciplinary team of experienced specialists in environmental health, social safeguards, civil engineering, GIS, statistics, and natural resource management[cite: 99, 100, 101, 104, 105, 107].
              </p>
              
              <p className="text-sm leading-relaxed text-neutral-600">
                Our collaborative owner-led model ensures direct senior-level technical oversight on every assignment, giving clients responsive service delivery, rigorous risk management, and professional accountability[cite: 91].
              </p>

              <div className="pt-2">
                <a
                  href="/team"
                  className="inline-block border-2 border-[#13313d] text-[#13313d] px-6 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#13313d] hover:text-white transition-colors"
                >
                  Meet the team
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}