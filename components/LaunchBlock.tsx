'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function LaunchBlock() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Countdown timer
    const targetDate = new Date('2025-06-15T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (titleRef.current && contentRef.current && ctaRef.current) {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out"
      });

      gsap.from(ctaRef.current, {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <section id='launch' ref={sectionRef} className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#121212] to-[#0e0e0f] relative overflow-hidden py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-20">
        {/* Creative Heading */}
        <div ref={titleRef} className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#bf0414]" />
            <span className="text-[#bf0414] text-sm font-medium tracking-wider">COHORT 1</span>
            <div className="h-[1px] flex-1 bg-[#bf0414]" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
            Launching Soon!
          </h2>
          <p className="text-xl text-white/80 font-light mt-4">
            15 days with your kid to launch a venture
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Features List */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-lg text-white/90">Well-designed 'Idea to Launch' Journey.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-lg text-white/90">Supported by Mentors and AI tools.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-lg text-white/90">For special kids who are 10-15 year-old.</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-lg text-white/90">In-person, starting June 15, in Ahmedabad.</p>
              </div>
            </div>

            {/* Know More Link */}
            <div className="flex items-center gap-5 justify-start mt-8">
              <Link
                href="https://calendly.com/work-manavjoshi/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-white/80 hover:text-white font-medium px-6 py-3 border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Schedule a Call</span>
              </Link>
              <Link
                href="/know-more"
                className="group relative inline-flex items-center gap-2 text-white/80 hover:text-white font-medium px-6 py-3 border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <span className="relative z-10">Find out more</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </div>
          </div>

          {/* Right Column - Details */}
          <div ref={contentRef} className="space-y-8">
            <div className="p-8 border border-white/10 bg-white/5 relative overflow-hidden group hover:bg-white/[0.07] transition-colors duration-500">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#bf0414]/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#bf0414]/5 rounded-full blur-2xl transform translate-x-1/2 translate-y-1/2" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-[#bf0414] transition-colors duration-300">
                  A cohort of 10 Builders.
                </h3>
                <p className="text-lg text-white/80 mb-8 group-hover:text-white/90 transition-colors duration-300">
                  Tell us what you'll build, to get your spot.
                </p>

                {/* Apply Button */}
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-[#bf0414] text-white font-medium px-8 py-4 rounded-none text-lg w-full justify-center relative overflow-hidden group mb-8 hover:bg-[#950505] transition-colors duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Apply now
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>

                {/* Calendly Link */}


                <div className="mt-8 p-4 bg-[#bf0414]/10 border border-[#bf0414]/20 relative overflow-hidden group-hover:bg-[#bf0414]/15 transition-colors duration-300">
                  <div className="absolute inset-0 bg-[#bf0414]/5 animate-pulse" />
                  <p className="relative text-[#bf0414] font-medium text-center group-hover:scale-105 transition-transform duration-300">
                    10 spots only. Applications open now.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 