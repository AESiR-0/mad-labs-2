'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function LearningPrinciples() {
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
          {/* Close Button */}
          <div className="flex justify-end">
            <Link 
              href="/"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors duration-300"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>

          {/* Title */}
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-[#f2f2f2] leading-tight"
          >
            Mad Labs Learning Principles
          </h1>

          {/* Introduction */}
          <div className="space-y-6 text-lg text-[#f2f2f2]/80">
            <p>
              At Mad Labs, we run collisions between kids and the real world.
            </p>
            <p>
              These principles guide every project, every push, every moment of doubt.
            </p>
            <p>
              If you're with us, you're signing up for this kind of learning.
            </p>
            <p className="font-medium">
              What we believe. What we protect. What you sign up for:
            </p>
          </div>

          {/* Principles List */}
          <div 
            ref={principlesRef}
            className="grid gap-2 sm:gap-4"
          >
            {[
              { emoji: '🛠', text: "Kids don't need teaching. They need trust, freedom, and real stakes." },
              { emoji: '❤️', text: "They learn fastest when they care about what they're building." },
              { emoji: '🧱', text: "Making something real teaches more than any class ever will." },
              { emoji: '🌱', text: "Every kid is different. We give them space to prove who they are." },
              { emoji: '💥', text: "Failing is part of the learning. We don't remove it." },
              { emoji: '🤯', text: "Confusion is good. It means they're trying something new." },
              { emoji: '🗣', text: "Feedback matters more than praise." },
              { emoji: '🚧', text: "Progress isn't graded. It's built." },
              { emoji: '🎯', text: "Mentors don't give answers. They ask sharper questions." },
              { emoji: '🔍', text: "Growth shows up in the work, not in a score." },
              { emoji: '🔑', text: "If they own it, they'll push harder." },
              { emoji: '🪞', text: "The work teaches them who they are." },
              { emoji: '⏱', text: "Deadlines and pressure test them." },
              { emoji: '🧭', text: "There's no one right way. Only what's honest and well-built." }
            ].map((principle, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4 px-2 py-4 rounded-lg hover:bg-[#bf0414]/5 transition-colors duration-300"
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