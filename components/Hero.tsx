'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    // Skip animations for iOS devices
    if (isIOS) {
      return;
    }

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

    // Cleanup animations on unmount
    return () => {
      gsap.killTweensOf([heroRef.current, logoRef.current, ...lettersRef.current]);
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden" ref={heroRef}>
      {/* Background Video */}
      <video
        src="https://res.cloudinary.com/dyk0ckibz/video/upload/v1749464099/i12swylpftmpbqaiy3os.webm"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-100"
      />

      {/* Centered Animation Video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          src="https://res.cloudinary.com/dyk0ckibz/video/upload/v1749464087/he8ie8fh9khnlc0hqpdt.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover mix-blend-lighten"
        />
      </div>

      <div 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        className="absolute z-[9999] h-96 w-80 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      
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
        <p className="text-lg md:text-xl uppercase tracking-[0.2em] text-[#f2f2f2] font-light text-center">
          For kids who break, & build.
        </p>
      </div>
    </section>
  );
} 