import React from 'react';

export const CustomFileIcon: React.FC = () => {
  return (
    <div className="relative w-36 h-36 flex items-center justify-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]">
      {/* SVG Container */}
      <svg width="110" height="130" viewBox="0 0 110 130" className="overflow-visible">
        <defs>
          {/* Richer Blue Gradient for Paper */}
          <linearGradient id="paperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" /> 
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          
          {/* Subtle Grid Pattern */}
          <pattern id="grid" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          </pattern>

          {/* Drop Shadow Filter */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Main Sheet with Corner Fold */}
        <g filter="url(#shadow)">
          <path d="M10,0 L75,0 L110,35 L110,120 Q110,130 100,130 L10,130 Q0,130 0,120 L0,10 Q0,0 10,0 Z" 
                fill="url(#paperGradient)" />
          <path d="M10,0 L75,0 L110,35 L110,120 Q110,130 100,130 L10,130 Q0,130 0,120 L0,10 Q0,0 10,0 Z" 
                fill="url(#grid)" />
        </g>

        {/* The Folded Corner (Lighter) */}
        <path d="M75,0 L75,25 Q75,35 85,35 L110,35" 
              fill="rgba(255,255,255,0.2)" 
              stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
        
        {/* Subtle highlight on top edge */}
        <path d="M10,1 L74,1" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
      </svg>

      {/* Metal Plate Badge - Positioned perfectly over the paper */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-16 rounded-lg 
                      bg-gradient-to-br from-[#334155] to-[#0F172A]
                      border border-white/10 
                      shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] 
                      flex items-center justify-center z-10">
        
        {/* Metallic Noise/Texture Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] rounded-lg mix-blend-overlay"></div>

        {/* Screws */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#94A3B8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)]"></div>
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#94A3B8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)]"></div>
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#94A3B8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)]"></div>
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#94A3B8] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)]"></div>
        
        {/* Engraved Text Effect */}
        <span className="text-3xl font-bold tracking-widest text-[#1e293b]" 
              style={{ textShadow: '0px 1px 0px rgba(255,255,255,0.1), 0px -1px 0px rgba(0,0,0,0.5)' }}>
          TXT
        </span>
      </div>
    </div>
  );
};