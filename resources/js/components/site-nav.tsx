import React, { useState } from 'react';

export const SiteNav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-font-primary text-primary font-sans border-b border-neutral-800 relative z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between h-20 px-6 lg:px-10">
        
        {/* Left Section: Logo & Primary Nav */}
        <div className="flex items-center space-x-8 xl:space-x-12">
          <a href="/" className="flex items-center group" aria-label="Urbanova home">
            <img src="/images/urbanova.png" alt="Urbanova" className="h-12 w-auto object-contain" />
          </a>

          {/* Primary Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-[15px] font-medium tracking-wide">
            <a href="/about" className="hover:text-red-500 transition-colors py-2">
              About us
            </a>
            <a href="/services" className="hover:text-red-500 transition-colors py-2">
              Services
            </a>
            <a href="/projects" className="hover:text-red-500 transition-colors py-2">
              Projects
            </a>
            <a href="/team" className="hover:text-red-500 transition-colors py-2">
              Our team
            </a>
          </nav>
        </div>

        {/* Right Section: Search & Secondary Nav */}
        <div className="hidden lg:flex items-center h-full">
          {/* Search Button */}
          <div className="flex items-center h-full pr-6 border-r border-neutral-700">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
              className="p-2 text-primary hover:text-primary transition-colors focus:outline-none"
            >
              <svg
                className="w-5 h-5 stroke-current fill-none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          {/* Secondary Links & Language Selector */}
          <div className="flex items-center space-x-6 pl-6 text-[14px] font-medium text-primary">
            {/* <a href="#compliance" className="hover:text-primary transition-colors">
              Compliance
            </a>
            <a href="#insights" className="hover:text-primary transition-colors">
              Insights
            </a> */}
            <a href="/contact" className="hover:text-primary transition-colors">
              Contact us
            </a>

            {/* Language Selector */}
            <div className="flex items-center space-x-2 pl-4 cursor-pointer group">
              {/* Globe Icon */}
              <svg
                className="w-5 h-5 text-primary group-hover:text-primary transition-colors fill-none stroke-current"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="font-semibold text-primary group-hover:text-primary transition-colors text-xs uppercase tracking-wider">
                FR
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
            className="p-2 text-primary hover:text-primary"
          >
            <svg
              className="w-5 h-5 stroke-current fill-none"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
            className="p-2 text-primary hover:text-primary focus:outline-none"
          >
            <svg
              className="w-6 h-6 stroke-current fill-none"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Slide-down Search Bar */}
      {isSearchOpen && (
        <div className="bg-font-primary border-b border-neutral-700 px-6 py-4 animate-fadeIn">
          <div className="max-w-4xl mx-auto flex items-center">
            <input
              type="text"
              placeholder="Search website..."
              className="w-full bg-transparent text-primary placeholder-primary focus:outline-none text-lg py-1 border-b border-neutral-600 focus:border-red-500 transition-colors"
              autoFocus
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-4 text-xs uppercase tracking-widest text-primary hover:text-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-font-primary border-b border-neutral-800 px-6 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-medium text-base">
            <a href="/about" className="hover:text-red-500 transition-colors">
              About us
            </a>
            <a href="/services" className="hover:text-red-500 transition-colors">
              Services
            </a>
            <a href="/projects" className="hover:text-red-500 transition-colors">
              Projects
            </a>
            <a href="/team" className="hover:text-red-500 transition-colors">
              Our team
            </a>
            <hr className="border-neutral-800 my-2" />
            <a href="#compliance" className="text-primary hover:text-primary text-sm">
              Compliance
            </a>
            <a href="#insights" className="text-primary hover:text-primary text-sm">
              Insights
            </a>
            <a href="#contact" className="text-primary hover:text-primary text-sm">
              Contact us
            </a>
            <div className="flex items-center space-x-2 pt-2 text-sm text-primary">
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
              </svg>
              <span>FR</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteNav;
