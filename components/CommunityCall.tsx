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
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen w-full flex flex-col justify-center items-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(191,4,20,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(191,4,20,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

      <div className="container mx-auto px-4 md:px-20 lg:px-40 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-[#f2f2f2] leading-tight">
              Join Our <span className="text-[#bf0414]">Community</span>
            </h2>
            <p className="text-xl text-[#f2f2f2]/80 max-w-2xl mx-auto">
              Connect with fellow innovators, share ideas, and be part of something extraordinary.
            </p>
          </div>

          {/* Community Cards */}
          <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
            {/* Discord Card */}
            <div className="bg-[#121212] rounded-2xl p-8 border border-[#333] hover:border-[#bf0414] transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#5865F2] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#f2f2f2]">Discord</h3>
                <p className="text-[#f2f2f2]/80">
                  Join our Discord community to connect with fellow builders, share ideas, and get real-time updates.
                </p>
                <a 
                  href="#" 
                  className="inline-block mt-4 px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-full font-semibold transition-colors duration-300"
                >
                  Join Server
                </a>
              </div>
            </div>

            {/* Twitter Card */}
            <div className="bg-[#121212] rounded-2xl p-8 border border-[#333] hover:border-[#bf0414] transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#1DA1F2] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#f2f2f2]">Twitter</h3>
                <p className="text-[#f2f2f2]/80">
                  Follow us on Twitter for the latest updates, announcements, and community highlights.
                </p>
                <a 
                  href="#" 
                  className="inline-block mt-4 px-6 py-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-full font-semibold transition-colors duration-300"
                >
                  Follow Us
                </a>
              </div>
            </div>

            {/* Newsletter Card */}
            <div className="bg-[#121212] rounded-2xl p-8 border border-[#333] hover:border-[#bf0414] transition-all duration-300 group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#bf0414] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#f2f2f2]">Newsletter</h3>
                <p className="text-[#f2f2f2]/80">
                  Subscribe to our newsletter for exclusive content, event updates, and community stories.
                </p>
                <a 
                  href="#" 
                  className="inline-block mt-4 px-6 py-3 bg-[#bf0414] hover:bg-[#950505] text-white rounded-full font-semibold transition-colors duration-300"
                >
                  Subscribe
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 