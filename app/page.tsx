'use client';

import Hero from '@/components/Hero';
import Engagement from '@/components/Engagement';
import Manifesto from '@/components/Manifesto';
import LaunchBlock from '@/components/LaunchBlock';
import CTA from '@/components/CTA';
import CommunityCall from '@/components/CommunityCall';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Testimonials from '@/components/Testimonials';
import FAQs from '@/components/FAQs';
import FoundersNote from "@/components/FoundersNote";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Only show navbar after scrolling past the first section (Hero)
      if (scrollPosition > windowHeight * 0.8) {
        setIsScrolled(true);
        setHasScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-[#f2f2f2] relative">
      {/* Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 px-8 py-6 backdrop-blur-md bg-[#0e0e0e]/30 transition-all duration-500 ${
          hasScrolled 
            ? isScrolled 
              ? 'translate-y-0' 
              : '-translate-y-full'
            : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-end items-center">
          <div className="flex items-center space-x-12">
            <Link 
              href="/learning-principles" 
              className="text-[#f2f2f2] hover:text-[#bf0414] transition-all duration-300 text-base font-medium tracking-wider hover:scale-105"
            >
              Mad Labs Learning Principles
            </Link>
            <Link 
              href="/theory-of-parenting" 
              className="text-[#f2f2f2] hover:text-[#bf0414] transition-all duration-300 text-base font-medium tracking-wider hover:scale-105"
            >
              Mad Labs Theory of Parenting
            </Link>
          </div>
        </div>
      </nav>

      <Hero />
      <Manifesto />
      <Engagement />
      <LaunchBlock />
      <FAQs />
      {/* <CommunityCall /> */}
      <FoundersNote />
      <Footer />

      {/* Floating WhatsApp Button */}
      <Link
        href="https://calendly.com/work-manavjoshi/30min" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 rounded-full right-8 bg-[#bf0414] hover:bg-[#950505] text-white p-3  transition-all duration-300 group flex items-center gap-2 z-50 hover:scale-105 hover:shadow-lg hover:shadow-[#bf0414]/20 active:scale-95"
      >
        <div className="relative">
          <svg 
            className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
        </div>
        <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all duration-300 whitespace-nowrap overflow-hidden font-medium">
          Schedule a Call
        </span>
      </Link>
    </main>
  );
}
