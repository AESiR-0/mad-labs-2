"use client";

import { useState } from "react";

export default function FAQs() {
  const faqs = [
    {
      q: "What if my kid doesn't finish?",
      a: `That's okay. Mad Labs isn't about perfection. It's about momentum.\n\nEven 60% of a real thing beats a polished worksheet. They walk away with clarity, confidence, and progress.`
    },
    {
      q: "My kid's shy / anxious / not super confident. Will they fit in?",
      a: `They're perfect for this.\n\nWe're not looking for loud kids. We're looking for real ones.\n\nMentors, peers, and the format are designed to meet kids where they are — and nudge them forward.`
    },
    {
      q: "Is this like a coding or startup camp?",
      a: `Nope.\n\nWe don't teach skills. We create conditions.\n\nSome kids build podcasts. Some build movements. Some build services.\n\nIt's not about tech. It's about value.`
    },
    {
      q: "How do you teach them in just 15 days?",
      a: `We don't teach. We push.\n\nThe pressure, tools, and mentoring compress learning.\n\nKids learn fastest when they care, when they're building, and when there's a deadline. That's what we give them.`
    },
    {
      q: "What if my kid doesn't have an idea?",
      a: `Perfect.\n\nThe first few days are designed to help them discover what they care about.\n\nWe use deep self-work, mentor nudges, and AI tools to help them find a strong starting point.`
    },
    {
      q: "What kind of support do they get?",
      a: `- 3 custom AI tools to ideate, build, and get feedback.\n- Daily guidance and nudges from mentors.\n- Real-time feedback from peers and test users. But they drive the build. They own the work.`
    },
    {
      q: "Is there a final presentation or showcase?",
      a: `Yes.\n\nOn Demo Day (Day 15), every kid presents their project to a real audience of mentors, peers, and strangers.\n\nIt's not a contest. It's a rite of passage.`
    },
    {
      q: "Will I get to see what my kid made?",
      a: `Absolutely.\n\nParents are invited to Demo Day — where kids share what they've built and what they've learned.\n\nYou'll see the output, the journey, and something new in them.`
    },
    {
      q: "My kid is very young (10–11). Will they manage?",
      a: `Yes — if they're curious and willing.\nMad Labs is designed to work across age groups.\nWe don't expect skills. Just the drive to build something real.`
    },
    {
      q: "What's the biggest takeaway?",
      a: `Confidence.\n\nThe kind that comes from building something real.\n\nFrom starting with nothing, and leaving with proof.`
    }
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="w-full max-w-3xl mx-auto mt-24 mb-20">
      <h2 className="text-2xl font-extrabold text-center mb-14 tracking-tight text-white">Frequently Asked Questions</h2>
      <div className="flex flex-col gap-8">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`rounded-2xl cursor-pointer w-full
                ${isOpen
                  ? "bg-[#bf0414] text-white border-2 border-[#bf0414]"
                  : "bg-transparent border-2 border-[#bf0414] text-[#bf0414] hover:bg-[#bf0414]/10"}
                px-10 py-8`}
              onClick={() => setOpen(isOpen ? null : i)}
              style={{ fontFamily: "inherit" }}
            >
              <div className="text-lg font-bold mb-2 flex items-center justify-between"> 
                <span>{faq.q}</span>
                <span className={`ml-4 text-lg font-bold ${isOpen ? 'rotate-90' : ''}`}>▶</span>
              </div>
              {isOpen && (
                <div className="text-base font-normal mt-4 text-white whitespace-pre-line">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
} 