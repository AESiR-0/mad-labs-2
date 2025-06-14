"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FoundersNote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && contentRef.current && headingRef.current) {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-32 bg-black relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(191,4,20,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(191,4,20,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-20">
        {/* Creative Heading */}
        <div ref={headingRef} className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#bf0414]" />
            <span className="text-[#bf0414] text-sm font-medium tracking-wider">FROM THE FOUNDER</span>
          </div>
        </div>

        <div ref={contentRef} className="relative">
          <div className="space-y-8">
            <p className="text-white/90 leading-relaxed text-lg md:text-xl font-light">
              I've been an <span className="text-[#bf0414] font-normal">Automobile Engineer</span>, a <span className="text-[#bf0414] font-normal">Marketer</span>, a <span className="text-[#bf0414] font-normal">Travel Show Host</span>, a <span className="text-[#bf0414] font-normal">Media Entrepreneur</span>, and much more. But everything I love doing today, I learned by doing it. Not in a classroom. In the real world.
            </p>
            
            <p className="text-white/90 leading-relaxed text-lg md:text-xl font-light">
              Mad Labs is what I wish I had as a kid. A place to explore big ideas, fail often, and build something that matters.
            </p>
            
            <p className="text-white/90 leading-relaxed text-lg md:text-xl font-light">
              We're not here to raise perfect students. We're here to raise bold builders.
            </p>
          </div>

          <div className="mt-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
             
              <div>
                <p className="text-white text-2xl font-medium">Manav</p>
                <div className="flex gap-4 mt-4">
                  <Link 
                    href="https://www.linkedin.com/in/manav-joshi/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-[#bf0414] transition-colors duration-300"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </Link>
                  <Link 
                    href="https://www.instagram.com/madlabs.space" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-[#bf0414] transition-colors duration-300"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 