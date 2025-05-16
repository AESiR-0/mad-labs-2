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
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Calendar Section */}
            <div ref={calendarRef} className="flex flex-col items-center lg:items-start">
              <div className="bg-[#121212]/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#333]/50 w-full max-w-md">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#f2f2f2] mb-2">May 2025</h3>
                  <div className="grid grid-cols-7 gap-2 sm:gap-3 text-sm sm:text-base text-[#f2f2f2]/60">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                      <div key={day} className="text-center">{day}</div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 sm:gap-3">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                    <div
                      key={date}
                      className={`aspect-square flex items-center justify-center rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 ${
                        date === 19
                          ? 'bg-[#bf0414] text-white scale-110'
                          : 'text-[#f2f2f2] hover:bg-[#333]/50 cursor-pointer'
                      }`}
                    >
                      {date}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 sm:mt-8 text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-[#bf0414]/10 rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3">
                  <span className="text-[#bf0414] text-sm sm:text-base font-medium">19</span>
                  <span className="text-[#f2f2f2]/60 text-sm sm:text-base">spots remaining</span>
                </div>
              </div>
            </div>

            {/* Mission Info Section */}
            <div ref={infoRef} className="flex flex-col justify-center">
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#f2f2f2] leading-tight">
                  Join the <span className="text-[#bf0414]">Mission</span>
                </h2>
                <p className="text-base sm:text-lg text-[#f2f2f2]/60">
                  Be part of something extraordinary. Join us on May 19, 2025, as we launch the next phase of innovation and collaboration.
                </p>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#bf0414]/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#f2f2f2]">Launch Date</h3>
                      <p className="text-sm sm:text-base text-[#f2f2f2]/60">May 19, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#bf0414]/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#f2f2f2]">Location</h3>
                      <p className="text-sm sm:text-base text-[#f2f2f2]/60">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
                <button className="w-full sm:w-auto bg-[#bf0414] hover:bg-[#950505] text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-colors duration-300">
                  Join the Mission
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 