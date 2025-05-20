'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CommunityCall() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="min-h-[80vh] sm:min-h-screen w-full flex flex-col justify-center items-center bg-black relative overflow-hidden py-16 sm:py-0">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#121212]"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#bf0414]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#bf0414]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#f2f2f2] leading-tight">
              Be Part of the <span className="text-[#bf0414]">Movement</span>
            </h2>
            <p className="text-base sm:text-lg text-[#f2f2f2]/60 max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
              Join a community of builders, innovators, and dreamers shaping the future together.
            </p>
          </div>

          {/* Community Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
            {/* Discord Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5865F2]/10 to-transparent rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[#121212]/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#333]/50 hover:border-[#5865F2]/30 transition-all duration-500">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5865F2]/20 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#f2f2f2]">Discord</h3>
                  <p className="text-[#f2f2f2]/60 text-sm">
                    Connect with builders, share ideas, and get real-time updates in our community.
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center space-x-2 text-[#5865F2] hover:text-[#4752C4] transition-colors duration-300 text-sm font-medium"
                  >
                    <span>Join Server</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Twitter Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1DA1F2]/10 to-transparent rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[#121212]/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#333]/50 hover:border-[#1DA1F2]/30 transition-all duration-500">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1DA1F2]/20 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#f2f2f2]">Twitter</h3>
                  <p className="text-[#f2f2f2]/60 text-sm">
                    Stay updated with our latest announcements and community highlights.
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center space-x-2 text-[#1DA1F2] hover:text-[#1a8cd8] transition-colors duration-300 text-sm font-medium"
                  >
                    <span>Follow Us</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter Card */}
            <div className="group relative sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-r from-[#bf0414]/10 to-transparent rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-[#121212]/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-[#333]/50 hover:border-[#bf0414]/30 transition-all duration-500">
                <div className="space-y-3 sm:space-y-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#bf0414]/20 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#f2f2f2]">Newsletter</h3>
                  <p className="text-[#f2f2f2]/60 text-sm">
                    Get exclusive content, event updates, and community stories delivered to your inbox.
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center space-x-2 text-[#bf0414] hover:text-[#950505] transition-colors duration-300 text-sm font-medium"
                  >
                    <span>Subscribe</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 