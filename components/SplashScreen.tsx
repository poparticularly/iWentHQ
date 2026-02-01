
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 2.5 seconds
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    // Unmount after exit animation (3s total)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#00D46A] transition-opacity duration-700 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Animated Logo Figure */}
      <div className="relative w-48 h-48 mb-4">
        {/* We use an SVG to represent the 3 parts of the abstract 'W' figure for the wave effect */}
        <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-2xl filter">
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="4" dy="8" stdDeviation="0" floodColor="#000" floodOpacity="1"/>
            </filter>
          </defs>
          
          <g filter="url(#shadow)">
            {/* Part 1: Left Swoosh */}
            <path 
              d="M40,120 C20,120 10,80 40,40 C60,10 70,30 50,80 C40,105 50,120 70,120" 
              fill="none" 
              stroke="white" 
              strokeWidth="28" 
              strokeLinecap="round"
              className="animate-wave origin-bottom"
              style={{ animationDelay: '0ms' }}
            />
            
            {/* Part 2: Middle Arch */}
            <path 
              d="M75,120 C85,60 100,40 125,40 C150,40 145,90 145,120" 
              fill="none" 
              stroke="white" 
              strokeWidth="28" 
              strokeLinecap="round"
              className="animate-wave origin-bottom"
              style={{ animationDelay: '150ms' }}
            />
            
            {/* Part 3: Right Stroke */}
            <path 
              d="M165,120 L185,20" 
              fill="none" 
              stroke="white" 
              strokeWidth="28" 
              strokeLinecap="round"
              className="animate-wave origin-bottom"
              style={{ animationDelay: '300ms' }}
            />
          </g>
        </svg>
      </div>

      {/* Static Text */}
      <h1 className="text-6xl font-black tracking-tighter text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] relative z-10" style={{ fontFamily: "'Manrope', sans-serif" }}>
        iWENT
      </h1>
      
      {/* Decorative dots for "i" and accent - static */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-12 -translate-y-20 w-6 h-6 bg-white rounded-full border-4 border-[#00D46A] z-20"></div>

    </div>
  );
};
