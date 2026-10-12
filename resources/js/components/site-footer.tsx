import React from 'react';

export const SiteFooter = () => {
  return (
    <footer className="w-full bg-font-primary text-primary font-sans pt-16 pb-12 px-6 lg:px-12 border-t border-neutral-900">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-20">
          
          {/* Column 1: Logo & Social Links */}
          <div className="lg:col-span-1 space-y-8">
            <a href="/" className="inline-block" aria-label="Urbanova home">
              <img src="/images/urbanova.png" alt="Urbanova" className="h-16 w-auto object-contain" />
            </a>

            {/* Social Icons */}
            <div className="flex items-center space-x-5 text-primary">
              {/* Instagram */}
              <a href="#" className="hover:text-red-500 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" className="hover:text-red-500 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" className="hover:text-red-500 transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a href="#" className="hover:text-red-500 transition-colors" aria-label="X">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" className="hover:text-red-500 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Who We Are */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-bold text-primary tracking-wide">Who We Are</h3>
            <ul className="space-y-3 text-[14px] text-primary">
              <li><a href="/about" className="hover:text-primary transition-colors">About us</a></li>
              <li><a href="#mission" className="hover:text-primary transition-colors">Mission & Vision</a></li>
              <li><a href="/team" className="hover:text-primary transition-colors">Key Personnel</a></li>
              <li><a href="#office" className="hover:text-primary transition-colors">Our Office</a></li>
            </ul>
          </div>

          {/* Column 3: What We Do */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-bold text-primary tracking-wide">What We Do</h3>
            <ul className="space-y-3 text-[14px] text-primary">
              <li><a href="/services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="/projects" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#sectors" className="hover:text-primary transition-colors">Sectors</a></li>
            </ul>
          </div>

          {/* Column 4: Insights */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-bold text-primary tracking-wide">Insights</h3>
            <ul className="space-y-3 text-[14px] text-primary">
              <li><a href="#climate" className="hover:text-primary transition-colors">Climate resilience</a></li>
              <li><a href="#planning" className="hover:text-primary transition-colors">Urban planning</a></li>
              <li><a href="#safeguards" className="hover:text-primary transition-colors">Safeguards</a></li>
              <li><a href="#gis" className="hover:text-primary transition-colors">GIS & Spatial data</a></li>
            </ul>
          </div>

          {/* Column 5: Careers */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-bold text-primary tracking-wide">Careers</h3>
            <ul className="space-y-3 text-[14px] text-primary">
              <li><a href="#join-us" className="hover:text-primary transition-colors">Join our team</a></li>
              <li><a href="#experts" className="hover:text-primary transition-colors">Associate experts</a></li>
              <li><a href="#why-work-with-us" className="hover:text-primary transition-colors">Why work with us</a></li>
            </ul>
          </div>

          {/* Column 6: Corporate */}
          <div className="space-y-4">
            <h3 className="text-[15px] font-bold text-primary tracking-wide">Corporate</h3>
            <ul className="space-y-3 text-[14px] text-primary">
              <li><a href="#compliance" className="hover:text-primary transition-colors">Compliance & standards</a></li>
              <li><a href="#mepa" className="hover:text-primary transition-colors">MEPA registration</a></li>
              <li><a href="#mra" className="hover:text-primary transition-colors">MRA & tax registration</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact us</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col lg:flex-row items-start lg:items-center justify-between text-[13px] text-primary space-y-4 lg:space-y-0">
          <div>
            ©2026 Urbanova. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#privacy" className="hover:text-primary transition-colors">Privacy notice</a>
            <a href="#compliance-notice" className="hover:text-primary transition-colors">Safeguards compliance</a>
            <a href="#terms" className="hover:text-primary transition-colors">Terms of use</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default SiteFooter;
