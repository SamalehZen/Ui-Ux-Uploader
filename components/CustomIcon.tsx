import React from 'react';

export const CustomFileIcon: React.FC = () => {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]">
      {/* Back Paper */}
      <svg width="100" height="120" viewBox="0 0 100 120" className="drop-shadow-lg">
        <defs>
          <linearGradient id="paperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A88EB" />
            <stop offset="100%" stopColor="#243B55" />
          </linearGradient>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        
        {/* Main Sheet */}
        <path d="M10,0 L70,0 L100,30 L100,110 Q100,120 90,120 L10,120 Q0,120 0,110 L0,10 Q0,0 10,0 Z" 
              fill="url(#paperGradient)" />
        
        {/* Grid Overlay */}
        <path d="M10,0 L70,0 L100,30 L100,110 Q100,120 90,120 L10,120 Q0,120 0,110 L0,10 Q0,0 10,0 Z" 
              fill="url(#grid)" />

        {/* Folded Corner */}
        <path d="M70,0 L70,25 Q70,30 75,30 L100,30" fill="rgba(255,255,255,0.3)" />
      </svg>

      {/* Metal Plate Badge */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-16 rounded-xl border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.6)] backdrop-blur-sm bg-gradient-to-br from-white/10 to-black/40 flex items-center justify-center">
        {/* Screws */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-gray-400 shadow-inner"></div>
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gray-400 shadow-inner"></div>
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-gray-400 shadow-inner"></div>
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-gray-400 shadow-inner"></div>
        
        {/* Text */}
        <span className="text-2xl font-bold tracking-widest text-black/40 drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]" style={{ textShadow: '-1px -1px 0 rgba(0,0,0,0.5), 1px 1px 0 rgba(255,255,255,0.1)' }}>
          TXT
        </span>
      </div>
    </div>
  );
};