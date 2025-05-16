'use client';

import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#bf0414]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#bf0414]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-20 lg:px-40 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Title and Description */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-[#f2f2f2] leading-tight">
              Ready to <span className="text-[#bf0414]">Build</span> Something <span className="text-[#bf0414]">Mad</span>?
            </h2>
            <p className="text-xl text-[#f2f2f2]/80 max-w-2xl mx-auto">
              Join our waitlist to be the first to know when we launch in your city. Limited spots available for our first mission.
            </p>
          </div>

          {/* Waitlist Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-16 bg-[#121212] border border-[#333] rounded-full px-6 text-lg text-[#f2f2f2] placeholder-[#666] focus:outline-none focus:border-[#bf0414] transition-colors duration-300"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-2 top-2 h-12 px-8 bg-[#bf0414] hover:bg-[#950505] text-white rounded-full font-semibold transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    'Join Waitlist'
                  )}
                </button>
              </div>
              <p className="text-sm text-[#666]">
                We'll never share your email with anyone else.
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto space-y-4">
              <div className="bg-[#121212] border border-[#bf0414] rounded-2xl p-8 text-center">
                <span className="text-4xl mb-4 block">🎉</span>
                <h3 className="text-2xl font-bold text-[#f2f2f2] mb-2">You're on the List!</h3>
                <p className="text-[#f2f2f2]/80">
                  We'll notify you when we launch in your city. Get ready to build something amazing!
                </p>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-[#bf0414]">19</p>
              <p className="text-[#f2f2f2]/80">Spots Left</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-[#bf0414]">100+</p>
              <p className="text-[#f2f2f2]/80">Ideas Shared</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-[#bf0414]">15</p>
              <p className="text-[#f2f2f2]/80">Cities</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-[#bf0414]">1</p>
              <p className="text-[#f2f2f2]/80">Mission</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 