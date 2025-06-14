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
    <section className="min-h-screen w-full px-4 md:px-20 lg:px-40 py-12 md:py-20 flex flex-col justify-center bg-[#121212] relative" ref={manifestoRef}>
      {/* Gradient Divider */}
      <div className="absolute opacity-80 top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0e0e0e] via-[#171717]/80 to-transparent z-10" />
      {/* <div className="absolute -top-5 left-0 right-0 h-16 bg-gradient-to-b from-[#bf0414]/10 via-transparent to-transparent z-10" /> */}

  

      <div className="w-full px-4 md:px-56 mx-auto space-y-8 md:space-y-16 relative z-10">
        {/* Title with gradient */}
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="text-[#bf0414]">Break. Believe. Build.</span>
          </h2>
        </div>

        <div className="space-y-6 md:space-y-10 text-base md:text-lg lg:text-xl text-[#f2f2f2] font-light leading-relaxed">
          <div className='flex flex-col gap-1 '>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">We trained kids to colour inside the lines.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">To sit down, stay quiet, wait their turn.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">To raise their hand for permission.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Because that's how it's done.</p>
          </div>
          <div className='flex flex-col gap-1 '>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">We punished the loud.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">We corrected the curious.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">We called it education.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">But it was training.</p>
          </div>
          <div className='flex flex-col gap-1 '>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Kids aren't built to obey.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">To test, build, and rebuild.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">To say things adults won't.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">To do things adults forgot.</p>
          </div>
          <div className='flex flex-col gap-1 '>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">So we built a lab. Where mad kids become builders.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">For the ones who don't sit in rows.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">For the ones who won't stop asking.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">For the ones who break things just to know how they work.</p>
          </div>
          <div className='flex flex-col gap-1 '>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">And in this lab, they build for real.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">A business. A community. A satellite. A rebellion.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Whatever matters most to them.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">With real people, timelines, and problems.</p>
          </div>
          <div className='flex flex-col gap-1 '>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Every cohort is a shot to the moon.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Every failure is a step closer to the moon.</p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Every output is their own. Mentors just ask better questions.</p>
          </div>
          <div className='flex flex-col gap-1 '>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">Mad Labs isn't about learning.
            </p>
            <p className="hover:text-[#bf0414] transition-colors duration-300 cursor-default">It's about leaving with something that didn't exist before.</p>
          </div>

          <div className='flex flex-col gap-1 '>
            <p className="hover:text-[#bf0414] text-lg md:text-xl font-bold transition-colors duration-300 cursor-default">
              <span className="text-[#bf0414]">Break.
                Believe.
                Build.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 