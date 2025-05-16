'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LaunchBlock() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const spotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calendar animation
    if (calendarRef.current) {
      gsap.from(calendarRef.current, {
        scrollTrigger: {
          trigger: calendarRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        scale: 0.8,
        rotation: -5,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
    }

    // Date animation
    if (dateRef.current) {
      gsap.from(dateRef.current, {
        scrollTrigger: {
          trigger: dateRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out"
      });
    }

    // Spots animation
    if (spotsRef.current) {
      gsap.from(spotsRef.current, {
        scrollTrigger: {
          trigger: spotsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-black to-[#121212] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#bf0414]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#bf0414]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-20 lg:px-40 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Calendar and Info */}
          <div className="space-y-8">
            {/* Calendar Card */}
            <div 
              ref={calendarRef}
              className="bg-[#121212] p-8 rounded-2xl shadow-2xl transform hover:scale-105 hover:rotate-2 transition-all duration-300 cursor-pointer border border-[#333] hover:border-[#bf0414]"
            >
              <div className="text-[#bf0414] text-2xl font-bold mb-4">MAY 2025</div>
              <div className="grid grid-cols-7 gap-2 text-[#666] text-sm mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({length: 31}, (_, i) => i + 1).map((date) => (
                  <div 
                    key={date}
                    className={`text-center p-2 rounded-full ${
                      date === 19 
                        ? 'bg-[#bf0414] text-white font-bold scale-110' 
                        : 'text-[#f2f2f2] hover:bg-[#333]'
                    }`}
                  >
                    {date}
                  </div>
                ))}
              </div>
            </div>

            {/* Spots Counter */}
            <div 
              ref={spotsRef}
              className="inline-block bg-[#121212] px-8 py-4 rounded-full border border-[#333] hover:border-[#bf0414] transition-colors duration-300"
            >
              <p className="text-2xl md:text-3xl text-[#f2f2f2]">
                <span className="text-[#bf0414] font-bold">19</span> spots left
              </p>
            </div>
          </div>

          {/* Right side - Mission Info */}
          <div 
            ref={dateRef}
            className="space-y-8 text-center md:text-left"
          >
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-[#f2f2f2] leading-tight">
                First Mission
              </h2>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 text-2xl md:text-3xl text-[#f2f2f2]">
                <span className="text-[#bf0414] font-bold">May 19th, 2025</span>
                <span className="hidden md:block">→</span>
                <span className="text-[#bf0414] font-bold">Ahmedabad</span>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-[#f2f2f2]/80">
                Join us for the first MAD LABS mission where we'll build something extraordinary together.
              </p>
              <button className="bg-[#bf0414] hover:bg-[#950505] text-white px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#bf0414]/20">
                Join the Mission
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 