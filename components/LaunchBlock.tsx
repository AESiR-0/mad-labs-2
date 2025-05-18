'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LaunchBlock() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (calendarRef.current && infoRef.current) {
      gsap.from(calendarRef.current, {
        scrollTrigger: {
          trigger: calendarRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

      gsap.from(infoRef.current, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="min-h-[80vh] sm:min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden py-16 sm:py-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#bf0414]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#bf0414]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Mission Info Section */}
          <div ref={infoRef} className="flex flex-col items-center justify-center">
            <div className="space-y-8 sm:space-y-10 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#f2f2f2] leading-tight">
                Join the <span className="text-[#bf0414]">Mission</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-[#f2f2f2]/60 max-w-2xl mx-auto">
                Be part of something extraordinary. Join us on May 19, 2025, as we launch the next phase of innovation and collaboration.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12  p-6 sm:p-8 rounded-none">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#bf0414]/20 rounded-none flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#f2f2f2]">Launch Date</h3>
                    <p className="text-base sm:text-lg text-[#f2f2f2]/60">May 19, 2025</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#bf0414]/20 rounded-none flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#f2f2f2]">Location</h3>
                    <p className="text-base sm:text-lg text-[#f2f2f2]/60">Ahmedabad, Gujarat</p>
                  </div>
                </div>
              </div>
              <button className="w-full sm:w-auto bg-[#bf0414] hover:bg-[#950505] text-white font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-none transition-colors duration-300 text-lg sm:text-xl">
                Join the Mission
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 