import { useState, useEffect } from "react";
import { TESTIMONIALS } from "../data";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000); // changes every 6s
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <div id="testimonials-swiper-container" className="relative max-w-4xl mx-auto px-4">
      {/* Testimonial Active Display Card */}
      <div className="relative bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-2xl">
        {/* Glow corner inside testimonial */}
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-[#00FF88]/5 blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          {/* Quote Mark */}
          <div className="hidden lg:flex shrink-0 text-[#00FF88]/20 mt-1">
            <Quote className="h-10 w-10 rotate-180" />
          </div>

          <div className="flex-1 text-center md:text-left">
            {/* Highly rated yellow star metric */}
            <div className="flex items-center justify-center md:justify-start gap-1 mb-4 text-[#00FF88]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              <span className="text-white/60 text-[11px] font-mono ml-2 uppercase tracking-widest">(5.0 Verification Rating)</span>
            </div>

            {/* Testimonial Quote feedback content */}
            <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed mb-6 font-sans">
              "{TESTIMONIALS[currentIndex].feedback}"
            </p>

            {/* Author Profile block */}
            <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-white/5 pt-6 justify-center md:justify-start">
              <img
                src={TESTIMONIALS[currentIndex].imageUrl}
                alt={TESTIMONIALS[currentIndex].name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full border border-[#00FF88]/30 object-cover"
              />
              <div className="text-center sm:text-left">
                <span className="text-white font-bold text-sm block">
                  {TESTIMONIALS[currentIndex].name}
                </span>
                <span className="text-[#00FF88] text-[12px] font-mono uppercase tracking-wider block">
                  {TESTIMONIALS[currentIndex].position}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Buttons & Indicators */}
      <div className="flex items-center justify-between mt-8 max-w-xs mx-auto">
        <button
          onClick={handlePrev}
          className="h-10 w-10 text-white/60 border border-white/5 bg-white/5 hover:text-[#00FF88] hover:bg-white/10 rounded-full flex items-center justify-center transition-all cursor-pointer"
          aria-label="Previous Testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-[#00FF88]" : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="h-10 w-10 text-white/60 border border-white/5 bg-white/5 hover:text-[#00FF88] hover:bg-white/10 rounded-full flex items-center justify-center transition-all cursor-pointer"
          aria-label="Next Testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
