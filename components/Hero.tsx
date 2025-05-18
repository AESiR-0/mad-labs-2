'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    // Video animation
    gsap.from(heroRef.current, {
      duration: 2,
      scale: 0.8,
      opacity: 0,
      ease: "power3.out"
    });

    // Logo animation
    gsap.from(logoRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power2.out"
    });

    // Staggered letters animation
    lettersRef.current.forEach((letter, index) => {
      gsap.from(letter, {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "power4.out",
        delay: index * 0.1
      });
    });
  }, []);

  return (
    <section className="relative h-screen overflow-hidden" ref={heroRef}>
      <video
        src="/socrates.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover scale-100"
      />
      <div className="absolute inset-0 " />
      <div className="relative h-full flex flex-col items-center justify-between py-10 max-md:pb-28" ref={logoRef}>
        <h1 className="text-[2rem] md:text-[3.5rem] font-black tracking-[0.4em] text-[#bf0414] leading-none overflow-hidden text-center">
          <div className="flex items-center">
            <div className="overflow-hidden">
              {"MAD LABS".split("").map((letter, index) => (
                <span
                  key={index}
                  ref={(el) => {
                    if (el) lettersRef.current[index] = el;
                  }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>
          </div>
        </h1>
        <p className="text-lg md:text-xl uppercase tracking-[0.2em] text-[#f2f2f2] font-light text-center ">Kids Building Real Things</p>
      </div>
    </section>
  );
} 