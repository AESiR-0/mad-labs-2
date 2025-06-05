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
  const [heights, setHeights] = useState<number[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updateHeights = () => {
      const newHeights = contentRefs.current.map(ref => {
        if (!ref) return 0;
        // Get the actual content height plus padding
        const height = ref.scrollHeight;
        return height;
      });
      setHeights(newHeights);
    };

    // Initial height calculation
    updateHeights();

    // Update heights on window resize
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, []);

  return (
    <section className="w-full bg-gradient-to-b to-[#111111] from-black mx-auto mt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-center mb-10 tracking-tight text-white">Frequently Asked Questions</h2>
        <div className="flex flex-col gap-4 sm:gap-6">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-lg cursor-pointer w-full overflow-hidden
                  ${isOpen
                    ? "bg-[#bf0414] text-white border-2 border-[#bf0414]"
                    : "bg-transparent border-2 border-[#bf0414] text-[#bf0414] hover:bg-[#bf0414]/10"}
                  px-4 sm:px-8 sm:py-6`}
                onClick={() => setOpen(isOpen ? null : i)}
                style={{ fontFamily: "inherit" }}
              >
                <div className="text-base sm:text-lg font-bold flex items-center justify-between"> 
                  <span className="pr-4">{faq.q}</span>
                  <span className={`flex-shrink-0 text-base sm:text-lg font-bold transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                </div>
                <div 
                  className=" transition-all duration-300 ease-in-out"
                  style={{ 
                    height: isOpen ? `auto` : '0px',
                    opacity: isOpen ? 1 : 0,
                    visibility: isOpen ? 'visible' : 'hidden'
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