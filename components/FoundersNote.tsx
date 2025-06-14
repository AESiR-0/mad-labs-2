"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FoundersNote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (sectionRef.current && contentRef.current && headingRef.current && avatarRef.current) {
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

      gsap.from(avatarRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "back.out(1.7)"
      });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <section ref={sectionRef} className="w-full py-32 bg-gradient-to-b from-[#121212] to-[#0e0e0e] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(191,4,20,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(191,4,20,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#121212] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#121212] to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-20">
        {/* Creative Heading */}
        <div ref={headingRef} className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#bf0414]" />
            <span className="text-[#bf0414] text-sm font-medium tracking-wider">FROM THE FOUNDER</span>
            <div className="h-[1px] flex-1 bg-[#bf0414]" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
            Founder's Note
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Content Column */}
          <div ref={contentRef} className="lg:col-span-8 space-y-8">
            <div className="relative">
              {/* Decorative quote mark */}
              <div className="absolute -left-4 -top-4 text-[#bf0414]/20 text-8xl font-serif">"</div>
              
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
            </div>
          </div>

          {/* Avatar Column */}
          <div ref={avatarRef} className="lg:col-span-4">
            <div className="sticky top-32">
              <div 
                className="relative group"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Interactive gradient background */}
                <div 
                  className="absolute inset-0 bg-[#bf0414]/20 blur-2xl rounded-full transform scale-110 transition-all duration-500"
                  style={{
                    background: isHovered 
                      ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(191,4,20,0.3) 0%, rgba(191,4,20,0.1) 50%, rgba(191,4,20,0) 100%)`
                      : 'rgba(191,4,20,0.2)',
                    transform: isHovered 
                      ? `scale(1.2) translate(${(mousePosition.x - 100) * 0.05}px, ${(mousePosition.y - 100) * 0.05}px)`
                      : 'scale(1.1)'
                  }}
                />
                
                <div 
                  className="relative bg-[#121212] p-6 rounded-2xl border border-white/10 transition-all duration-500 group-hover:border-[#bf0414]/30 group-hover:shadow-[0_0_30px_rgba(191,4,20,0.2)]"
                  style={{
                    transform: isHovered 
                      ? `perspective(1000px) rotateX(${(mousePosition.y - 100) * 0.02}deg) rotateY(${(mousePosition.x - 100) * 0.02}deg)`
                      : 'none'
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div 
                      className="w-24 h-24 rounded-full bg-[#bf0414]/10 flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#bf0414]/20"
                      style={{
                        transform: isHovered 
                          ? `translate(${(mousePosition.x - 100) * 0.1}px, ${(mousePosition.y - 100) * 0.1}px)`
                          : 'none'
                      }}
                    >
                      <span className="text-4xl transition-transform duration-500 group-hover:scale-110">👨‍💻</span>
                    </div>
                    
                    <p className="text-white text-2xl font-medium mb-2 transition-colors duration-300 group-hover:text-[#bf0414]">Manav</p>
                    <p className="text-white/60 text-sm mb-6 transition-colors duration-300 group-hover:text-white/80">Founder, Mad Labs</p>
                    
                    <div className="flex gap-4">
                      <Link 
                        href="https://www.linkedin.com/in/manav-joshi/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-[#bf0414] transition-all duration-300 hover:scale-110"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </Link>
                      <Link 
                        href="https://www.instagram.com/madlabs.space" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-[#bf0414] transition-all duration-300 hover:scale-110"
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
        </div>
      </div>
    </section>
  );
} 