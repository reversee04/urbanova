import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

interface Slide {
  id: number;
  title: string;
  description: string;
  cta_text: string;
  cta_url: string;
  bg_image: string;
}

interface PageProps { slides: Slide[]; [key: string]: unknown }

export const HeroCarousel: React.FC = () => {
  const { slides = [] } = usePage<PageProps>().props;
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Autoplay functionality every 6 seconds
  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[520px] md:h-[600px] overflow-hidden bg-slate-900 text-white font-sans">
      {/* Background Image Container */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <img
          src={slide.bg_image}
          alt={slide.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark Overlay on Left Side (Gradient to reveal light on right) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c2a38]/95 via-[#0c2a38]/85 to-transparent w-full md:w-[70%]" />

      {/* Decorative Curved Arch Line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
        >
          {/* Outer Teal Curved Arc */}
          <path
            d="M 450 500 C 520 280, 680 80, 1000 0"
            fill="none"
            stroke="#51b2b8"
            strokeWidth="32"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Hero Slide Content */}
      <div className="relative max-w-7xl mx-auto h-full px-6 md:px-12 lg:px-16 flex items-center z-10">
        <div className="max-w-xl md:max-w-2xl space-y-6">
          {/* Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white drop-shadow-sm">
            {slide.title}
          </h1>

          {/* Underline Bar */}
          <div className="w-12 h-[4px] bg-[#51b2b8] rounded-full" />

          {/* Subtitle / Description */}
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-normal">
            {slide.description}
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <a
              href={slide.cta_url}
              className="inline-block bg-[#51b2b8] hover:bg-[#3ea0a6] text-[#0c2a38] font-semibold px-7 py-3.5 rounded-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              {slide.cta_text}
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Controls (Bottom Right) */}
      <div className="absolute bottom-6 right-6 md:right-12 z-20 flex items-center space-x-4 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Slide Indicators / Dots */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-7 bg-[#51b2b8]' : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;
