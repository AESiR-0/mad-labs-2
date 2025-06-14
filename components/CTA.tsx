'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
    }

    if (statsRef.current) {
      gsap.from(statsRef.current.children, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setEmail('');
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <section ref={sectionRef} className="min-h-[80vh] sm:min-h-screen w-full flex flex-col justify-center items-center bg-[#0e0e0e] relative overflow-hidden py-16 sm:py-0">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#0e0e0e]"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#bf0414]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#bf0414]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#f2f2f2] leading-tight">
              Join the <span className="text-[#bf0414]">Revolution</span>
            </h2>
            <p className="text-base sm:text-lg text-[#f2f2f2]/60 max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
              Be among the first to experience the future of innovation. Join our waitlist and get exclusive access to our launch.
            </p>
          </div>

          {/* Waitlist Form */}
          <div ref={formRef} className="max-w-2xl mx-auto mb-12 sm:mb-16">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full bg-[#121212]/50 backdrop-blur-sm border border-[#333]/50 rounded-xl sm:rounded-2xl px-6 sm:px-8 py-4 sm:py-6 text-[#f2f2f2] placeholder-[#f2f2f2]/40 focus:outline-none focus:border-[#bf0414]/50 transition-all duration-300 text-base sm:text-lg"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${
                    isSubmitting || !email.trim() 
                      ? 'bg-[#333]/50 text-[#f2f2f2]/40' 
                      : 'bg-[#bf0414] text-white hover:bg-[#950505]'
                  }`}
                >
                  {isSubmitting ? (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
            {showSuccess && (
              <div className="mt-4 text-center">
                <p className="text-[#bf0414] text-sm sm:text-base">Thanks for joining! We'll be in touch soon.</p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-[#121212]/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#333]/50">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#bf0414] mb-2">1000+</div>
              <div className="text-sm sm:text-base text-[#f2f2f2]/60">Community Members</div>
            </div>
            <div className="bg-[#121212]/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#333]/50">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#bf0414] mb-2">50+</div>
              <div className="text-sm sm:text-base text-[#f2f2f2]/60">Projects Launched</div>
            </div>
            <div className="bg-[#121212]/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#333]/50">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#bf0414] mb-2">25+</div>
              <div className="text-sm sm:text-base text-[#f2f2f2]/60">Cities Worldwide</div>
            </div>
            <div className="bg-[#121212]/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#333]/50">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#bf0414] mb-2">100%</div>
              <div className="text-sm sm:text-base text-[#f2f2f2]/60">Innovation Focus</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 