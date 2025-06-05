"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FoundersNote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && titleRef.current && contentRef.current && signatureRef.current) {
      gsap.from(titleRef.current, {
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
        duration: 1,
        delay: 0.2,
        ease: "power2.out"
      });

      gsap.from(signatureRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
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
    <section ref={sectionRef} className="w-full py-24 bg-gradient-to-b to-[#111111] from-black relative overflow-hidden">
      {/* Video Background */}

      {/* Overlay for readability */}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-20">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-4xl font-black text-white tracking-tight inline-block relative">
            From the Founder
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#bf0414] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </h2>
        </div>
        
        <div ref={contentRef} className="bg-white/5 border border-white/10 rounded-2xl p-12 backdrop-blur-md hover:bg-white/10 transition-all duration-500 group">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-white/90 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
              I've been an <span className="text-[#bf0414] font-medium">Automobile Engineer</span>, a <span className="text-[#bf0414] font-medium">Marketer</span>, a <span className="text-[#bf0414] font-medium">Travel Show Host</span>, a <span className="text-[#bf0414] font-medium">Media Entrepreneur</span>, and much more. But everything I love doing today, I learned by doing it. Not in a classroom. In the real world.
            </p>
            
            <p className="text-white/90 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
              Mad Labs is what I wish I had as a kid. A place to explore big ideas, fail often, and build something that matters.
            </p>
            
            <p className="text-white/90 leading-relaxed mb-8 group-hover:text-white transition-colors duration-300">
              We're not here to raise perfect students. We're here to raise bold builders.
            </p>
            
            <div ref={signatureRef} className="flex flex-col items-center gap-4">
              <p className="text-white font-medium text-xl">— Manav Joshi</p>
              <div className="flex gap-8">
                <Link 
                  href="https://www.linkedin.com/in/manavjoshi24" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#bf0414] transition-all duration-300 flex items-center gap-2 group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span className="relative">
                    LinkedIn
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#bf0414] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </span>
                </Link>
                <Link 
                  href="https://www.instagram.com/manav.joshi" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#bf0414] transition-all duration-300 flex items-center gap-2 group"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="relative">
                    Instagram
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#bf0414] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 