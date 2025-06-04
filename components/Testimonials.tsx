"use client";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Mad Labs gave my kid the confidence to build something real. She came home every day excited to show what she made.",
      name: "Priya S.",
      role: "Parent"
    },
    {
      quote: "I never thought I could actually launch my own project. Now I know I can.",
      name: "Aarav, 13",
      role: "Cohort 1 Kid"
    },
    {
      quote: "The mentors didn't just teach—they challenged and inspired. My son found his voice.",
      name: "Rohit M.",
      role: "Parent"
    },
    {
      quote: "I learned more in 15 days than in a whole year of school projects.",
      name: "Maya, 12",
      role: "Cohort 1 Kid"
    }
  ];
  return (
    <section className="w-full max-w-2xl mx-auto mt-20 mb-12">
      <h2 className="text-2xl font-bold text-white mb-8">Testimonials</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md flex flex-col gap-4">
            <p className="text-lg text-white/90 italic">“{t.quote}”</p>
            <div className="text-white/70 text-base font-semibold mt-2">{t.name}</div>
            {t.role && <div className="text-white/40 text-sm">{t.role}</div>}
          </div>
        ))}
      </div>
    </section>
  );
} 