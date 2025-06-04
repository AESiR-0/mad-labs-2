'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function TheoryOfParenting() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Principles animation
    gsap.from(principlesRef.current?.children || [], {
      scrollTrigger: {
        trigger: principlesRef.current,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, []);

  return (
    <main className="min-h-screen bg-black text-[#f2f2f2] relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#bf0414]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#bf0414]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 relative z-10 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center text-[#bf0414] hover:text-[#950505] transition-colors duration-300 mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          {/* Title */}
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-[#f2f2f2] leading-tight"
          >
            Mad Labs Theory Of Parenting
          </h1>

          {/* Introduction */}
          <div className="space-y-6 text-lg text-[#f2f2f2]/80">
            <p>
              You've spent years telling them they can do anything.
            </p>
            <p>
              This is where you prove you meant it.
            </p>
            <p>
              At Mad Labs, your kid won't be protected from confusion.
            </p>
            <p>
              They'll be trusted to walk through it and come out stronger.
            </p>
            <p>
              That shift only works if you shift too.
            </p>
            <p className="font-medium">
              Here's how to be the parent of a builder:
            </p>
          </div>

          {/* Principles List */}
          <div 
            ref={principlesRef}
            className="grid gap-6 sm:gap-8"
          >
            {[
              { emoji: '🧩', text: "Don't solve problems for them. Let them struggle a little." },
              { emoji: '🗣', text: "Ask what they're building, not how well they're doing." },
              { emoji: '🎯', text: "Celebrate effort, not perfection." },
              { emoji: '😵', text: "Confusion is part of the work. Don't panic." },
              { emoji: '🛠', text: "Remind them: failure = progress." },
              { emoji: '🧘', text: "Don't offer suggestions unless they ask." },
              { emoji: '🔍', text: "Let them explain their ideas. It helps them think." },
              { emoji: '🧠', text: "Trust their instincts. They're sharper than they look." },
              { emoji: '👣', text: "Step back so they can step up." },
              { emoji: '❤️', text: "Care about what they care about." },
              { emoji: '🚀', text: "Fuel their excitement. Don't rush to fix when they're stuck." },
              { emoji: '🪞', text: "Treat their work like it matters. Because it does." },
              { emoji: '🔄', text: "Growth might not look like what you're used to. That's okay." },
              { emoji: '👀', text: "Your job isn't to guide. It's to witness." }
            ].map((principle, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-[#bf0414]/5 transition-colors duration-300"
              >
                <span className="text-2xl">{principle.emoji}</span>
                <p className="text-lg text-[#f2f2f2]/90">{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 