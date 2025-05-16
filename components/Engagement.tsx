'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Response {
  city: string;
  idea: string;
  emoji: string;
}

export default function Engagement() {
  const [input, setInput] = useState('');
  const [userCity, setUserCity] = useState<string>('');
  const [responses, setResponses] = useState<Response[]>([
    { city: 'Bangalore', idea: 'Solar-powered drone for traffic monitoring', emoji: '🚁' },
    { city: 'Delhi', idea: 'Smart garden system for urban spaces', emoji: '🌱' },
    { city: 'Mumbai', idea: 'AI-powered waste sorting robot', emoji: '🤖' },
    { city: 'Chennai', idea: 'Water purification using nanotechnology', emoji: '💧' },
    { city: 'Hyderabad', idea: 'AR-based learning platform', emoji: '🎮' },
    { city: 'Kolkata', idea: 'Smart street lighting system', emoji: '💡' },
    { city: 'Pune', idea: 'Eco-friendly packaging solution', emoji: '📦' },
    { city: 'Jaipur', idea: 'Virtual reality museum tours', emoji: '🏛️' },
    { city: 'Ahmedabad', idea: 'Smart parking management system', emoji: '🅿️' },
    { city: 'Lucknow', idea: 'Air quality monitoring network', emoji: '🌫️' },
    { city: 'Kanpur', idea: 'Automated irrigation system', emoji: '🌾' },
    { city: 'Nagpur', idea: 'Solar-powered charging stations', emoji: '⚡' },
    { city: 'Indore', idea: 'Smart waste collection system', emoji: '🗑️' },
    { city: 'Thane', idea: 'Urban vertical farming solution', emoji: '🌿' },
    { city: 'Bhopal', idea: 'Smart traffic signal system', emoji: '🚦' },
    { city: 'Visakhapatnam', idea: 'Coastal erosion monitoring', emoji: '🌊' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSubmission, setNewSubmission] = useState<Response | null>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const newSubmissionRef = useRef<HTMLDivElement>(null);

  // Fetch user's city on component mount
  useEffect(() => {
    const fetchUserCity = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserCity(data.city || 'Your City');
      } catch (error) {
        console.error('Error fetching city:', error);
        setUserCity('Your City');
      }
    };

    fetchUserCity();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsSubmitting(true);
    const newResponse = {
      city: userCity,
      idea: input,
      emoji: '💡'
    };

    // First show the new submission prominently
    setNewSubmission(newResponse);
    
    // After a delay, add it to the marquee
    setTimeout(() => {
      setResponses(prev => [newResponse, ...prev]);
      setNewSubmission(null);
      setInput('');
      setIsSubmitting(false);
    }, 2000);
  };

  useEffect(() => {
    // Marquee animation
    if (marqueeRef.current) {
      const marquee = marqueeRef.current;
      
      // Create a single animation that loops
      gsap.to(marquee, {
        x: `-${marquee.offsetWidth / 2}px`,
        duration: 12,
        ease: "none",
        repeat: -1,
        yoyo: true
      });
    }

    // New submission highlight animation
    if (newSubmissionRef.current) {
      gsap.from(newSubmissionRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
    }
  }, [newSubmission]);

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(191,4,20,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(191,4,20,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="container mx-auto px-4 md:px-20 lg:px-40 relative z-10">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Title */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-[#f2f2f2] leading-tight">
              Share Your <span className="text-[#bf0414]">Mad</span> Idea
            </h2>
            <p className="text-lg text-[#f2f2f2]/80">
              Join the movement of innovators and dreamers
            </p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What's your mad idea?"
                className="flex-1 h-14 bg-[#121212] border border-[#333] rounded-full px-6 text-lg text-[#f2f2f2] placeholder-[#666] focus:outline-none focus:border-[#bf0414] transition-colors duration-300"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-14 bg-[#bf0414] hover:bg-[#950505] transition-all duration-300 px-6 rounded-full flex items-center justify-center disabled:opacity-50"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2} 
                  stroke="#fff" 
                  className={`w-6 h-6 transition-transform duration-300 ${isSubmitting ? 'animate-spin' : 'group-hover:scale-110'}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.67 20.29a2.5 2.5 0 01-3.54 0l-5.42-5.42a7 7 0 01-6.36-9.19c.13-.36.6-.45.85-.2l3.1 3.1a1 1 0 001.41 0l2.12-2.12a1 1 0 000-1.41l-3.1-3.1c-.25-.25-.16-.72.2-.85a7 7 0 019.19 6.36l5.42 5.42a2.5 2.5 0 010 3.54l-2.12 2.12z" />
                </svg>
              </button>
            </div>
          </form>

          {/* New Submission Highlight */}
          {newSubmission && (
            <div 
              ref={newSubmissionRef}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#121212] p-8 rounded-2xl shadow-2xl border-2 border-[#bf0414] z-50"
            >
              <div className="text-center space-y-4">
                <span className="text-4xl">{newSubmission.emoji}</span>
                <p className="text-2xl font-bold text-[#f2f2f2]">{newSubmission.idea}</p>
                <p className="text-[#bf0414] font-medium">{newSubmission.city}</p>
              </div>
            </div>
          )}

          {/* Marquee Container */}
          <div className="relative overflow-hidden bg-[#121212]/40 backdrop-blur-sm rounded-2xl border border-[#333]">
            <div className="py-2">
              <div 
                ref={marqueeRef}
                className="flex space-x-8 whitespace-nowrap"
              >
                {responses.map((response, index) => (
                  <div 
                    key={index}
                    className="inline-flex items-center space-x-4 px-4 py-2 bg-[#121212] rounded-full border border-[#333] hover:border-[#bf0414] transition-colors duration-300"
                  >
                    <span className="text-xl">{response.emoji}</span>
                    <div>
                      <p className="text-base font-semibold text-[#f2f2f2]">{response.idea}</p>
                      <p className="text-sm text-[#bf0414]">{response.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 