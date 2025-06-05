"use client";

import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import gsap from "gsap";

const roleSchema = z.enum(["kid", "parent"]);
const kidInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.string().min(1, "Age is required")
});
const kidContactSchema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone required"),
  city: z.string().min(1, "City is required")
});
const kidCuriousSchema = z.object({
  curious: z.string().min(1, "Required")
});

const parentInfoSchema = z.object({
  name: z.string().min(1, "Name is required")
});
const parentContactSchema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone required"),
  city: z.string().min(1, "City is required")
});
const parentKidSchema = z.object({
  kidName: z.string().min(1, "Required"),
  kidAge: z.string().min(1, "Required"),
  curious: z.string().min(1, "Required")
});

const stepsByRole = {
  kid: [
    { label: "What's your name?", key: "name" },
    { label: "How old are you?", key: "age" },
    { label: "How do we contact you?", key: "contact" },
    { label: "Where do you live?", key: "city" },
    { label: "What are you most curious about?", key: "curious" },
  ],
  parent: [
    { label: "Your name", key: "name" },
    { label: "Your contact", key: "contact" },
    { label: "Your city", key: "city" },
    { label: "Your kid's name & age", key: "kid" },
    { label: "What do you think your child is deeply curious about?", key: "curious" },
  ],
};

function FAQAccordion() {
  const faqs = [
    {
      q: "What if my kid doesn't finish?",
      a: "That's okay. Mad Labs isn't about perfection. It's about momentum. Even 60% of a real thing beats a polished worksheet. They walk away with clarity, confidence, and progress."
    },
    {
      q: "My kid's shy / anxious / not super confident. Will they fit in?",
      a: "They're perfect for this. We're not looking for loud kids. We're looking for real ones. Mentors, peers, and the format are designed to meet kids where they are — and nudge them forward."
    },
    {
      q: "Is this like a coding or startup camp?",
      a: "Nope. We don't teach skills. We create conditions. Some kids build podcasts. Some build movements. Some build services. It's not about tech. It's about value."
    },
    {
      q: "How do you teach them in just 15 days?",
      a: "We don't teach. We push. The pressure, tools, and mentoring compress learning. Kids learn fastest when they care, when they're building, and when there's a deadline. That's what we give them."
    },
    {
      q: "What if my kid doesn't have an idea?",
      a: "Perfect. The first few days are designed to help them discover what they care about. We use deep self-work, mentor nudges, and AI tools to help them find a strong starting point."
    },
    {
      q: "What kind of support do they get?",
      a: "3 custom AI tools to ideate, build, and get feedback. Daily guidance and nudges from mentors. Real-time feedback from peers and test users. But they drive the build. They own the work."
    },
    {
      q: "Is there a final presentation or showcase?",
      a: "Yes. On Demo Day (Day 15), every kid presents their project to a real audience of mentors, peers, and strangers. It's not a contest. It's a rite of passage."
    },
    {
      q: "Will I get to see what my kid made?",
      a: "Absolutely. Parents are invited to Demo Day — where kids share what they've built and what they've learned. You'll see the output, the journey, and something new in them."
    },
    {
      q: "My kid is very young (10–11). Will they manage?",
      a: "Yes — if they're curious and willing. Mad Labs is designed to work across age groups. We don't expect skills. Just the drive to build something real."
    },
    {
      q: "What's the biggest takeaway?",
      a: "Confidence. The kind that comes from building something real. From starting with nothing, and leaving with proof."
    }
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="w-full max-w-2xl mx-auto mt-20 mb-12">
      <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
      <div className="flex flex-col gap-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`transition-all duration-300 border-2 border-[#bf0414] rounded-[25px] cursor-pointer ${open === i ? 'bg-[#bf0414] text-white' : 'bg-transparent text-[#bf0414]'} px-6 py-4`}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className={`flex items-center justify-between text-lg font-bold transition-all duration-300 ${open === i ? 'text-white' : 'text-[#bf0414]'}`}>
              <span>{faq.q}</span>
              <span className={`ml-4 transition-transform duration-300 ${open === i ? 'rotate-90' : ''}`}>▶</span>
            </div>
            {open === i && (
              <div className="mt-3 text-base font-normal text-white/90 transition-all duration-300">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ThankYouScreen() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="w-20 h-20 rounded-full bg-[#bf0414]/20 flex items-center justify-center mb-4">
        <svg className="w-10 h-10 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-3xl font-black text-white tracking-tight">Application Received!</h2>
      <p className="text-lg text-white/80 max-w-md">
        We're excited to review your application. You'll hear from us within 48 hours with next steps.
      </p>
      <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-4">What's Next?</h3>
        <ul className="text-left space-y-4 text-white/80">
          <li className="flex items-start gap-3">
            <span className="text-[#bf0414] mt-1">1.</span>
            <span>We'll review your application and get back to you within 48 hours</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#bf0414] mt-1">2.</span>
            <span>If selected, we'll schedule a quick chat to learn more about you</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#bf0414] mt-1">3.</span>
            <span>Final selection and onboarding will happen in early June</span>
          </li>
        </ul>
      </div>
      <a 
        href="/"
        className="mt-8 px-8 py-4 bg-[#bf0414] text-white font-medium rounded-none hover:bg-[#950505] transition-colors"
      >
        Return Home
      </a>
    </div>
  );
}

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<"kid" | "parent" | null>(null);
  const [kidInfo, setKidInfo] = useState({ name: "", age: "" });
  const [kidContact, setKidContact] = useState({ email: "", phone: "", city: "" });
  const [kidCurious, setKidCurious] = useState({ curious: "" });
  const [parentInfo, setParentInfo] = useState({ name: "" });
  const [parentContact, setParentContact] = useState({ email: "", phone: "", city: "" });
  const [parentKid, setParentKid] = useState({ kidName: "", kidAge: "", curious: "" });
  const [errors, setErrors] = useState<any>({});
  const [fieldFocus, setFieldFocus] = useState<string | null>(null);
  const [roleClicked, setRoleClicked] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // GSAP refs
  const stepRef = useRef<HTMLDivElement>(null);
  const fieldRefs = useRef<(HTMLDivElement | null)[]>([]);
  const roleBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Animate step transitions and stagger fields
  useEffect(() => {
    if (stepRef.current) {
      gsap.fromTo(
        stepRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );
    }
    if (fieldRefs.current.length) {
      gsap.fromTo(
        fieldRefs.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [step, role]);

  // Animate role selection
  useEffect(() => {
    if (roleClicked !== null && roleBtnRefs.current.length) {
      roleBtnRefs.current.forEach((btn, i) => {
        if (!btn) return;
        if ((roleClicked === "kid" && i === 0) || (roleClicked === "parent" && i === 1)) {
          gsap.to(btn, { scale: 1.1, backgroundColor: "#bf0414", color: "#fff", duration: 0.3, ease: "back.out(2)" });
        } else {
          gsap.to(btn, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });
        }
      });
    }
  }, [roleClicked]);

  // Handlers for each step
  const handleRole = (selected: "kid" | "parent") => {
    setRoleClicked(selected);
    setTimeout(() => {
      setRole(selected);
      setStep(1);
      setRoleClicked(null);
    }, 350);
  };

  const handleNext = async () => {
    setErrors({});
    if (role === "kid") {
      if (step === 1) {
        const res = kidInfoSchema.safeParse(kidInfo);
        if (!res.success) return setErrors(res.error.flatten().fieldErrors);
      }
      if (step === 2) {
        const res = kidContactSchema.safeParse(kidContact);
        if (!res.success) return setErrors(res.error.flatten().fieldErrors);
      }
      if (step === 3) {
        const res = kidCuriousSchema.safeParse(kidCurious);
        if (!res.success) return setErrors(res.error.flatten().fieldErrors);
        setIsSubmitted(true);
        return;
      }
      setStep(step + 1);
    } else if (role === "parent") {
      if (step === 1) {
        const res = parentInfoSchema.safeParse(parentInfo);
        if (!res.success) return setErrors(res.error.flatten().fieldErrors);
      }
      if (step === 2) {
        const res = parentContactSchema.safeParse(parentContact);
        if (!res.success) return setErrors(res.error.flatten().fieldErrors);
      }
      if (step === 3) {
        const res = parentKidSchema.safeParse(parentKid);
        if (!res.success) return setErrors(res.error.flatten().fieldErrors);
        setIsSubmitted(true);
        return;
      }
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep(step - 1);

  // Helper for field focus
  const focusProps = (name: string) => ({
    onFocus: () => setFieldFocus(name),
    onBlur: () => setFieldFocus(null),
  });

  // Progress bar
  const totalSteps = role ? (role === "kid" ? 4 : 4) : 0;
  const progress = role ? ((step / totalSteps) * 100) : 0;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#010101] px-4 py-12 relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="/animated_video/starry_bg.mp4"
      />
      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 pointer-events-none" />
      <div className="w-full max-w-2xl bg-white/10 border border-white/10 rounded-2xl p-12 shadow-2xl relative z-20 backdrop-blur-md bg-clip-padding transition-all duration-500 hover:shadow-3xl flex flex-col gap-8">
        {isSubmitted ? (
          <ThankYouScreen />
        ) : (
          <>
            {/* Progress Bar */}
            {role && (
              <div className="w-full mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/70 text-sm">Step {step + 1} of {totalSteps + 1}</span>
                  <span className="text-white/70 text-sm font-mono">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-2 bg-[#bf0414] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
            <div ref={stepRef}>
            {step === 0 && (
              <div className="flex flex-col items-center gap-12">
                <h1 className="text-3xl font-black text-white mb-4 text-center tracking-tight">Please select the appropriate</h1>
                <div className="flex gap-8 w-full justify-center">
                  {(["kid", "parent"] as const).map((r, i) => (
                    <button
                      key={r}
                      ref={el => { roleBtnRefs.current[i] = el; }}
                      className={`flex-1 flex flex-col items-center justify-center gap-4 bg-white/10 border border-white/20 rounded-xl p-10 transition-colors duration-300 text-white text-xl font-semibold shadow-lg hover:shadow-xl ${roleClicked === r ? "ring-4 ring-[#bf0414]/40" : ""}`}
                      onClick={() => handleRole(r)}
                      style={{
                        transform: roleClicked === r ? "scale(1.1)" : undefined,
                        zIndex: roleClicked === r ? 2 : 1,
                      }}
                      disabled={!!roleClicked}
                    >
                      <span className="text-5xl">{r === "kid" ? "🧒" : "👨‍👩‍👧‍👦"}</span>
                      <span>{r.charAt(0).toUpperCase() + r.slice(1)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* KID FLOW */}
            {role === "kid" && step === 1 && (
              <div className="flex flex-col gap-10">
                <div ref={el => { fieldRefs.current[0] = el; }} className="flex flex-col gap-2">
                  <label className="text-lg text-white font-semibold mb-1">What's your name?</label>
                  <input
                    className={`p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none transition-all duration-300 text-lg ${fieldFocus === "kidName" ? "ring-2 ring-[#bf0414]/60 scale-105" : ""}`}
                    placeholder="Your name"
                    value={kidInfo.name}
                    onChange={e => setKidInfo({ ...kidInfo, name: e.target.value })}
                    {...focusProps("kidName")}
                  />
                  {errors.name && <span className="text-[#bf0414] text-base animate-fade-in mt-1">{errors.name}</span>}
                </div>
                <div ref={el => { fieldRefs.current[1] = el; }} className="flex flex-col gap-2">
                  <label className="text-lg text-white font-semibold mb-1">How old are you?</label>
                  <input
                    className={`p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none transition-all duration-300 text-lg ${fieldFocus === "kidAge" ? "ring-2 ring-[#bf0414]/60 scale-105" : ""}`}
                    placeholder="Your age"
                    value={kidInfo.age}
                    onChange={e => setKidInfo({ ...kidInfo, age: e.target.value })}
                    {...focusProps("kidAge")}
                  />
                  {errors.age && <span className="text-[#bf0414] text-base animate-fade-in mt-1">{errors.age}</span>}
                </div>
                <div className="flex gap-6 mt-8 justify-between">
                  <button
                    onClick={handleBack}
                    aria-label="Back"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#bf0414]/40 bg-transparent transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-125"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="#bf0414" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#bf0414]/40 bg-transparent transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-125"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="#bf0414" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}
            {role === "kid" && step === 2 && (
              <div className="flex flex-col gap-10">
                <div ref={el => { fieldRefs.current[0] = el; }} className="flex flex-col gap-2">
                  <label className="text-lg text-white font-semibold mb-1">How do we contact you?</label>
                  <input
                    className={`p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none transition-all duration-300 text-lg ${fieldFocus === "kidEmail" ? "ring-2 ring-[#bf0414]/60 scale-105" : ""}`}
                    placeholder="Email"
                    value={kidContact.email}
                    onChange={e => setKidContact({ ...kidContact, email: e.target.value })}
                    {...focusProps("kidEmail")}
                  />
                  {errors.email && <span className="text-[#bf0414] text-base animate-fade-in mt-1">{errors.email}</span>}
                  <input
                    className={`p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none transition-all duration-300 mt-2 text-lg ${fieldFocus === "kidPhone" ? "ring-2 ring-[#bf0414]/60 scale-105" : ""}`}
                    placeholder="Phone"
                    value={kidContact.phone}
                    onChange={e => setKidContact({ ...kidContact, phone: e.target.value })}
                    {...focusProps("kidPhone")}
                  />
                  {errors.phone && <span className="text-[#bf0414] text-base animate-fade-in mt-1">{errors.phone}</span>}
                </div>
                <div ref={el => { fieldRefs.current[1] = el; }} className="flex flex-col gap-2">
                  <label className="text-lg text-white font-semibold mb-1">Where do you live?</label>
                  <input
                    className={`p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none transition-all duration-300 text-lg ${fieldFocus === "kidCity" ? "ring-2 ring-[#bf0414]/60 scale-105" : ""}`}
                    placeholder="City"
                    value={kidContact.city}
                    onChange={e => setKidContact({ ...kidContact, city: e.target.value })}
                    {...focusProps("kidCity")}
                  />
                  {errors.city && <span className="text-[#bf0414] text-base animate-fade-in mt-1">{errors.city}</span>}
                </div>
                <div className="flex gap-6 mt-8 justify-between">
                  <button
                    onClick={handleBack}
                    aria-label="Back"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#bf0414]/40 bg-transparent transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-125"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="#bf0414" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#bf0414]/40 bg-transparent transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-125"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="#bf0414" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}
            {role === "kid" && step === 3 && (
              <div className="flex flex-col gap-10">
                <div ref={el => { fieldRefs.current[0] = el; }} className="flex flex-col gap-2">
                  <label className="text-lg text-white font-semibold mb-1">What are you most curious about?</label>
                  <textarea
                    className={`p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none min-h-[80px] transition-all duration-300 text-lg ${fieldFocus === "kidCurious" ? "ring-2 ring-[#bf0414]/60 scale-105" : ""}`}
                    placeholder="I'm curious about..."
                    value={kidCurious.curious}
                    onChange={e => setKidCurious({ ...kidCurious, curious: e.target.value })}
                    {...focusProps("kidCurious")}
                  />
                  {errors.curious && <span className="text-[#bf0414] text-base animate-fade-in mt-1">{errors.curious}</span>}
                </div>
                <div className="flex gap-6 mt-8 justify-between">
                  <button
                    onClick={handleBack}
                    aria-label="Back"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#bf0414]/40 bg-transparent transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-125"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="#bf0414" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#bf0414]/40 bg-transparent transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-125"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="#bf0414" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}
            {/* PARENT FLOW */}
            {role === "parent" && step === 1 && (
              <div className="flex flex-col gap-10">
                <div ref={el => { fieldRefs.current[0] = el; }} className="flex flex-col gap-2">
                  <label className="text-lg text-white font-semibold mb-1">Your name</label>
                  <input
                    className={`p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none transition-all duration-300 text-lg ${fieldFocus === "parentName" ? "ring-2 ring-[#bf0414]/60 scale-105" : ""}`}
                    placeholder="Your name"
                    value={parentInfo.name}
                    onChange={e => setParentInfo({ ...parentInfo, name: e.target.value })}
                    {...focusProps("parentName")}
                  />
                  {errors.name && <span className="text-[#bf0414] text-base animate-fade-in mt-1">{errors.name}</span>}
                </div>
                <div className="flex gap-6 mt-8 justify-between">
                  <button
                    onClick={handleBack}
                    aria-label="Back"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#bf0414]/40 bg-transparent transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-125"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="#bf0414" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#bf0414]/40 bg-transparent transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-125"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="#bf0414" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}
            {role === "parent" && step === 2 && (
              <div className="flex flex-col gap-10">
                <div ref={el => { fieldRefs.current[0] = el; }} className="flex flex-col gap-2">
                  <label className="text-lg text-white font-semibold mb-1">Your contact</label>
                  <input
                    className={`p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none transition-all duration-300 text-lg ${fieldFocus === "parentEmail" ? "ring-2 ring-[#bf0414]/60 scale-105" : ""}`}
                    placeholder="Email"
                    value={parentContact.email}
                    onChange={e => setParentContact({ ...parentContact, email: e.target.value })}
                    {...focusProps("parentEmail")}
                  />
                  {errors.email && <span className="text-[#bf0414] text-base animate-fade-in mt-1">{errors.email}</span>}
                  <input
                    className={`p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none transition-all duration-300 mt-2 text-lg ${fieldFocus === "parentPhone" ? "ring-2 ring-[#bf0414]/60 scale-105" : ""}`}
                    placeholder="Phone"
                    value={parentContact.phone}
                    onChange={e => setParentContact({ ...parentContact, phone: e.target.value })}
                    {...focusProps("parentPhone")}
                  />
                  {errors.phone && <span className="text-[#bf0414] text-base animate-fade-in mt-1">{errors.phone}</span>}
                </div>
                <div ref={el => { fieldRefs.current[1] = el; }} className="flex flex-col gap-2">
                  <label className="text-lg text-white font-semibold mb-1">Your city</label>
                  <input
                    className={`p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none transition-all duration-300 text-lg ${fieldFocus === "parentCity" ? "ring-2 ring-[#bf0414]/60 scale-105" : ""}`}
                    placeholder="City"
                    value={parentContact.city}
                    onChange={e => setParentContact({ ...parentContact, city: e.target.value })}
                    {...focusProps("parentCity")}
                  />
                  {errors.city && <span className="text-[#bf0414] text-base animate-fade-in mt-1">{errors.city}</span>}
                </div>
                <div className="flex gap-6 mt-8 justify-between">
                  <button
                    onClick={handleBack}
                    aria-label="Back"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#bf0414]/40 bg-transparent transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-125"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="#bf0414" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#bf0414]/40 bg-transparent transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-125"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="#bf0414" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}
            {role === "parent" && step === 3 && (
              <div className="flex flex-col gap-10">
                <div ref={el => { fieldRefs.current[0] = el; }} className="flex flex-col gap-2">
                  <label className="text-lg text-white font-semibold mb-1">Your kid's name & age</label>
                  <input
                    className={`p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none transition-all duration-300 text-lg ${fieldFocus === "parentKidName" ? "ring-2 ring-[#bf0414]/60 scale-105" : ""}`}
                    placeholder="Kid's name"
                    value={parentKid.kidName}
                    onChange={e => setParentKid({ ...parentKid, kidName: e.target.value })}
                    {...focusProps("parentKidName")}
                  />
                  {errors.kidName && <span className="text-[#bf0414] text-base animate-fade-in mt-1">{errors.kidName}</span>}
                  <input
                    className={`p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none transition-all duration-300 mt-2 text-lg ${fieldFocus === "parentKidAge" ? "ring-2 ring-[#bf0414]/60 scale-105" : ""}`}
                    placeholder="Kid's age"
                    value={parentKid.kidAge}
                    onChange={e => setParentKid({ ...parentKid, kidAge: e.target.value })}
                    {...focusProps("parentKidAge")}
                  />
                  {errors.kidAge && <span className="text-[#bf0414] text-base animate-fade-in mt-1">{errors.kidAge}</span>}
                </div>
                <div ref={el => { fieldRefs.current[1] = el; }} className="flex flex-col gap-2">
                  <label className="text-lg text-white font-semibold mb-1">What do you think your child is deeply curious about?</label>
                  <textarea
                    className={`p-4 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none min-h-[80px] transition-all duration-300 text-lg ${fieldFocus === "parentCurious" ? "ring-2 ring-[#bf0414]/60 scale-105" : ""}`}
                    placeholder="My child is curious about..."
                    value={parentKid.curious}
                    onChange={e => setParentKid({ ...parentKid, curious: e.target.value })}
                    {...focusProps("parentCurious")}
                  />
                  {errors.curious && <span className="text-[#bf0414] text-base animate-fade-in mt-1">{errors.curious}</span>}
                </div>
                <div className="flex gap-6 mt-8 justify-between">
                  <button
                    onClick={handleBack}
                    aria-label="Back"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#bf0414]/40 bg-transparent transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-125"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="#bf0414" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next"
                    className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#bf0414]/40 bg-transparent transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-125"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="#bf0414" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}
            </div>
          </>
        )}
      </div>
      {!isSubmitted && <FAQAccordion />}
    </main>
  );
}

// Add fade-in animation for error messages
// (Tailwind: animate-fade-in)
// Add this to your global CSS if not present:
// @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
// .animate-fade-in { animation: fade-in 0.3s ease; } 