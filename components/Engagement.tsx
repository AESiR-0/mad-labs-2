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
    { city: 'Ahmedabad', idea: 'A sneaker brand for kids', emoji: '👟' },
    { city: 'Mumbai', idea: 'A Pokémon review YouTube channel', emoji: '🎥' },
    { city: 'Delhi', idea: 'A community to feed poor daily', emoji: '🥣' },
    { city: 'Bangalore', idea: 'Anti-boring notebooks', emoji: '📓' },
    { city: 'Pune', idea: 'A robot dog', emoji: '🤖' },
    { city: 'Ahmedabad', idea: "A school, that's a game", emoji: '🎮' },
    { city: 'Surat', idea: 'A vending machine for unlimited chocolate', emoji: '🍫' },
    { city: 'Vadodara', idea: 'Do-my-homework robot', emoji: '📚' },
    { city: 'Bangalore', idea: 'A YouTube show with my brother', emoji: '🎬' },
    { city: 'Jaipur', idea: 'A drone that follows me', emoji: '🚁' },
    { city: 'Mumbai', idea: 'A secret clubhouse', emoji: '🗝' },
    { city: 'Indore', idea: 'An app to grade teachers', emoji: '📱' },
    { city: 'Guwahati', idea: 'A solar-powered quick-dry for clothes', emoji: '🌞' },
    { city: 'Ahmedabad', idea: 'A card game about Indian History', emoji: '🃏' },
    { city: 'Bangalore', idea: 'Spotify for poems', emoji: '🎵' },
    { city: 'Goa', idea: 'Trash picking robot for beaches', emoji: '🤖' },
    { city: 'Rajkot', idea: 'Notebook with memes', emoji: '🔔' },
    { city: 'Vadodara', idea: 'A bag with a built-in charger', emoji: '🎒' },
    { city: 'Gandhinagar', idea: 'A board game about running a business', emoji: '🎲' },
    { city: 'Delhi', idea: 'A hoodie that shows my mood', emoji: '🧥' }
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

    // Add to marquee immediately
    setResponses(prev => [newResponse, ...prev]);
    
    // Show the highlight animation
    setNewSubmission(newResponse);

    // After a delay, clear the highlight and scroll to launch section
    setTimeout(() => {
      setNewSubmission(null);
      setInput('');
      setIsSubmitting(false);
      
      // Scroll to launch section
      const launchSection = document.getElementById('launch');
      if (launchSection) {
        launchSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 2000);
  };

  useEffect(() => {
    // Marquee animation
    if (marqueeRef.current) {
      const marquee = marqueeRef.current;

      // Create a single animation that loops from left to right
      gsap.to(marquee, {
        x: `-${300 * responses.length}px`,
        duration: 35,
        ease: "none",
        repeat: -1,
        yoyo: false
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
    <section className="min-h-[60vh] w-full flex flex-col justify-center items-center bg-[#121212] relative overflow-hidden">
      {/* Animated grid background */}

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="max-w-6xl mx-auto space-y-5 md:space-y-8">
          {/* Title */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-[2.5rem] font-bold text-[#f2f2f2] leading-tight">
              What would you build (or break) <br /> if nobody said no?
            </h2>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="A satellite. A tiny business. Something weird."
                className="w-full h-12 bg-[#121212] border border-[#333] rounded-md  px-5 text-base  text-[#f2f2f2] placeholder-[#666] focus:outline-none focus:border-[#bf0414] transition-colors duration-300"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-0 top-0 h-12 w-10 bg-[#bf0414] hover:bg-[#950505] transition-all duration-300 flex items-center justify-center disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wrench"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              </button>
            </div>
          </form>

          {/* New Submission Highlight */}
          {newSubmission && (
            <div
              ref={newSubmissionRef}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#121212] p-2 rounded-lg shadow-2xl border-2 border-[#bf0414] z-50 w-[90%] md:w-auto"
            >
              <div className="text-center space-y-4">
                <span className="text-3xl md:text-4xl">{newSubmission.emoji}</span>
                <p className="text-xl md:text-2xl font-bold text-[#f2f2f2]">{newSubmission.idea}</p>
                <p className="text-[#bf0414] font-medium">{newSubmission.city}</p>
              </div>
            </div>
          )}

          {/* Marquee Container */}
          <div className="relative overflow-hidden bg-[#121212]/40 backdrop-blur-sm rounded-lg border border-[#333]">
            <div className="py-1 w-full">
              <div
                ref={marqueeRef}
                className="flex space-x-4 md:space-x-8 w-full whitespace-nowrap"
              >
                {responses.map((response, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center space-x-2 md:space-x-4 px-3 md:px-4 py-2 rounded-none hover:border-[#bf0414] transition-colors duration-300"
                  >
                    <span className="text-lg md:text-xl">{response.emoji}</span>
                    <div className='flex gap-2 md:gap-4 items-center'>
                      <p className="text-sm md:text-base text-[#bf0414]">{response.city}</p>
                      <p className="text-sm md:text-base">-</p>
                      <p className="text-sm md:text-base font-semibold text-[#f2f2f2]"> {response.idea}</p>
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