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
    <section id='launch' ref={sectionRef} className="min-h-screen w-full flex flex-col justify-center items-center bg-[#010101] relative overflow-hidden py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Standalone Centered Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
            Our First-Ever Cohort Is <span className="text-[#bf0414]">Launching</span>
          </h2>
          <p className="text-xl text-white/80 font-light mt-4">
            For kids who are ready to build something real.
          </p>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Project Types with Interactive Elements */}
            <div className="space-y-8">
              <div className="relative">
                <p className="text-2xl font-medium text-white mb-12">
                  In 15 days, we'll build one real thing.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { text: 'a business?', color: 'from-[#bf0414]/20 to-[#bf0414]/5' },
                    { text: 'a community?', color: 'from-[#bf0414]/15 to-[#bf0414]/5' },
                    { text: 'a film?', color: 'from-[#bf0414]/10 to-[#bf0414]/5' },
                    { text: 'an event?', color: 'from-[#bf0414]/15 to-[#bf0414]/5' },
                    { text: 'a rebellion?', color: 'from-[#bf0414]/20 to-[#bf0414]/5' },
                    { text: 'you decide.', color: 'from-white/10 to-white/0' }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group relative cursor-pointer"
                    >
                      <div className={`relative p-6 border border-white/10 group-hover:border-[#bf0414]/30 transition-all duration-500 ease-out group-hover:rotate-1`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                        <div className="relative">
                          <span className="text-xl text-white/60 group-hover:text-white transition-colors duration-300">
                            {item.text}
                          </span>
                          <div className="absolute -bottom-1 left-0 w-full h-px bg-[#bf0414] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section - now on the left, improved animation */}
              <div className="space-y-6">
                <Link 
                  href="/apply" 
                  className="inline-flex items-center gap-2 bg-[#bf0414] text-white font-medium px-8 py-4 rounded-none text-lg w-full justify-center relative overflow-hidden group"
                >
                  <span className="relative z-10">Apply for the First Cohort</span>
                  <span className="absolute inset-0 bg-[#950505] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0" />
                </Link>
                <div className="flex items-center justify-center gap-6">
                  <Link 
                    href="/know-more" 
                    className="text-white/80 hover:text-white font-medium group flex items-center gap-2"
                    style={{ transition: 'none' }}
                  >
                    Find out more
                  </Link>
                  <a 
                    href="https://calendly.com/your-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white font-medium group flex items-center gap-2"
                    style={{ transition: 'none' }}
                  >
                    Talk to us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div ref={contentRef} className="space-y-8">
            <p className="text-xl text-white/80">
              With help from Mentors.
            </p>

            <div className="p-5 border border-white/10 bg-white/5">
              {/* Roadmap Section - minimal, aligned dots, less top padding */}
              <div className="mb-8 mt-2">
                <div className="relative w-full flex flex-col md:flex-row items-end justify-between">
                  {[
                    {
                      title: 'Plan',
                      desc: 'Find your direction.'
                    },
                    {
                      title: 'Build',
                      desc: 'Make it real.'
                    },
                    {
                      title: 'Share',
                      desc: 'Show the world.'
                    }
                  ].map((item, index) => (
                    <div key={index} className={`relative z-10 flex flex-col items-center w-full md:w-1/3`}>
                      {/* Red dot above content, all in line */}
                      <div className="hidden md:block w-4 h-4 rounded-full bg-[#bf0414] border-4 border-[#010101] mb-2" style={{ marginTop: 0, marginBottom: 8 }} />
                      {/* Title and description closer to dot/line */}
                      <div className="bg-transparent text-center px-2 md:px-0">
                        <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-white/60 text-base max-w-xs mx-auto">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 mt-1">
                      <svg className="w-6 h-6 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Dates</h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-white/60">June 15–29, 2025</p>
                        <p className="text-sm text-white/40">15 days of building</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 mt-1">
                      <svg className="w-6 h-6 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Format</h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-white/60">In-person, Ahmedabad</p>
                        <p className="text-sm text-white/40">10 kids per cohort</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 mt-1">
                      <svg className="w-6 h-6 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Who is it for</h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-white/60">10–15 year olds</p>
                        <p className="text-sm text-white/40">who can't sit still</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 mt-1">
                      <svg className="w-6 h-6 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Outcome</h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-white/60">Every kid builds</p>
                        <p className="text-sm text-white/40">something that didn't exist before</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#bf0414]/10 border border-[#bf0414]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#bf0414]/5 animate-pulse" />
                <p className="relative text-[#bf0414] font-medium text-center">
                  10 spots only. Applications open now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 