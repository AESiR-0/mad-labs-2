"use client";

import { useState, useRef, useEffect } from "react";

export default function FAQs() {
  const faqs = [
    {
      q: "What if my kid doesn't finish?",
      a: `That's okay. Mad Labs isn't about perfection. It's about momentum.\nEven 60% of a real thing beats a polished worksheet. They walk away with clarity, confidence, and progress.`
    },
    {
      q: "My kid's shy / anxious / not super confident. Will they fit in?",
      a: `They're perfect for this.\nWe're not looking for loud kids. We're looking for real ones.\nMentors, peers, and the format are designed to meet kids where they are — and nudge them forward.`
    },
    {
      q: "Is this like a coding or startup camp?",
      a: `Nope.\nWe don't teach skills. We create conditions.\nSome kids build podcasts. Some build movements. Some build services.\nIt's not about tech. It's about value.`
    },
    {
      q: "How do you teach them in just 15 days?",
      a: `We don't teach. We push.\nThe pressure, tools, and mentoring compress learning.\nKids learn fastest when they care, when they're building, and when there's a deadline. That's what we give them.`
    },
    {
      q: "What if my kid doesn't have an idea?",
      a: `Perfect.\nThe first few days are designed to help them discover what they care about.\nWe use deep self-work, mentor nudges, and AI tools to help them find a strong starting point.`
    },
    {
      q: "What kind of support do they get?",
      a: `- 3 custom AI tools to ideate, build, and get feedback.\n- Daily guidance and nudges from mentors.\n- Real-time feedback from peers and test users. But they drive the build. They own the work.`
    },
    {
      q: "Is there a final presentation or showcase?",
      a: `Yes.\nOn Demo Day (Day 15), every kid presents their project to a real audience of mentors, peers, and strangers.\nIt's not a contest. It's a rite of passage.`
    },
    {
      q: "Will I get to see what my kid made?",
      a: `Absolutely.\nParents are invited to Demo Day — where kids share what they've built and what they've learned.\nYou'll see the output, the journey, and something new in them.`
    },
    {
      q: "My kid is very young (10–11). Will they manage?",
      a: `Yes — if they're curious and willing.\nMad Labs is designed to work across age groups.\nWe don't expect skills. Just the drive to build something real.`
    },
    {
      q: "What's the biggest takeaway?",
      a: `Confidence.\nThe kind that comes from building something real.\nFrom starting with nothing, and leaving with proof.`
    }
  ];
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [heights, setHeights] = useState<number[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateHeights = () => {
      const newHeights = contentRefs.current.map(ref => {
        if (!ref) return 0;
        const height = ref.scrollHeight;
        return height;
      });
      setHeights(newHeights);
    };

    updateHeights();
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHover(index);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHover(null);
    }, 100); // Small delay to prevent flickering
  };

  const handleClick = (index: number) => {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b to-[#121212] from-[#0e0e0e] mx-auto  py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-20">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#bf0414]" />
            <span className="text-[#bf0414] text-sm font-medium tracking-wider">FREQUENTLY ASKED</span>
            <div className="h-[1px] flex-1 bg-[#bf0414]" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
            Questions
          </h2>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            const isHovered = hover === i;
            const isActive = isOpen || isHovered;
            
            return (
              <div
                key={i}
                className={`rounded-lg cursor-pointer w-full overflow-hidden
                  ${isActive
                    ? "bg-[#bf0414] text-white border-2 border-[#bf0414]"
                    : "bg-transparent border-2 border-[#bf0414] text-[#bf0414] hover:bg-[#bf0414]/10"}
                  px-4 sm:px-8 sm:py-6`}
                onClick={() => handleClick(i)}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                style={{ fontFamily: "inherit" }}
              >
                <div className="text-base sm:text-lg font-bold flex items-center justify-between"> 
                  <span className="pr-4">{faq.q}</span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M9 18L15 12L9 6" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div 
                  className="transition-all duration-300 ease-in-out"
                  style={{ 
                    height: isActive ? `auto` : '0px',
                    opacity: isActive ? 1 : 0,
                    visibility: isActive ? 'visible' : 'hidden'
                  }}
                >
                  <div 
                    ref={(el) => {
                      contentRefs.current[i] = el;
                    }}
                    className="text-sm sm:text-base font-normal mt-3 sm:mt-4 text-white whitespace-pre-line"
                  >
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 