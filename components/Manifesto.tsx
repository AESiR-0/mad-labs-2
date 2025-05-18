'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const manifestoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Manifesto scroll reveal
    const manifestoElements = manifestoRef.current?.querySelectorAll('p');
    manifestoElements?.forEach((element: Element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 95%",
          toggleActions: "play none none reverse"
        },
        duration: 1,
        y: 20,
        opacity: 0,
        ease: "power2.out"
      });
    });
  }, []);

  return (
    <section className="min-h-screen w-full px-4 md:px-20 lg:px-40 py-20 flex flex-col justify-center bg-black relative" ref={manifestoRef}>
      {/* Background quote */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <p className="text-[20rem] font-black text-white rotate-[-15deg]">"</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        {/* Title with gradient */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="text-[#bf0414]">Break.</span>
            <span className="text-white mx-4">Believe.</span>
            <span className="text-[#bf0414]">Build.</span>
          </h2>
          <div className="w-32 h-1 bg-[#bf0414] mx-auto mt-6"></div>
        </div>

        <div className="space-y-6 text-xl md:text-2xl text-[#f2f2f2] font-light leading-relaxed">
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">We trained kids to colour inside the lines.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">To be quiet and wait for their turn.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">To raise their hand for permission.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Because that's how it's done.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">We taught them to fill in blanks.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">To copy what the smart kid wrote.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">We punished wrong answers.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">We rewarded silence.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">We called it education.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">But it was actually training.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Kids are born to build.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">To take things apart, make noise,</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">And test ideas that are adult-stupid.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">So we built a Lab.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">For the Mad ones.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">The ones who don't want to sit in a row,</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Wear the uniform,</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">And raise their hand to be heard.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">And build real things.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Not later. Now.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Nothing crazy.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Just kids doing what adults asked them not to.</p>
          <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Mad Labs.</p>
          <p className="text-3xl md:text-4xl font-bold mt-12 text-center">
            <span className="text-[#bf0414]">Break.
              Believe.
              Build.</span>
          </p>
        </div>
      </div>
    </section>
  );
} 