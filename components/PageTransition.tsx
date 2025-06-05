'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    // Generate particles only on client side
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 0.5
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    // Start transition immediately when pathname changes
    setIsTransitioning(true);
    
    // Keep content hidden during transition
    const contentTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);

    return () => clearTimeout(contentTimer);
  }, [pathname]);

  return (
    <>
      {/* Transition Overlay */}
      <div 
        className={`fixed inset-0 z-[9999] pointer-events-none transition-transform duration-800 ease-in-out ${
          isTransitioning ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="absolute inset-0 bg-[#bf0414]">
          {/* Interactive Particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-white/20 animate-[float_3s_ease-in-out_infinite]"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content - Hidden during transition */}
      <div 
        className={`transition-opacity duration-800 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ visibility: isTransitioning ? 'hidden' : 'visible' }}
      >
        {children}
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -10px);
          }
          50% {
            transform: translate(0, 20px);
          }
          75% {
            transform: translate(-10px, -10px);
          }
        }
      `}</style>
    </>
  );
}