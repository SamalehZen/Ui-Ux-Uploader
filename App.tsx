import React, { useState } from 'react';
import { GlassCard } from './components/GlassCard';

const App: React.FC = () => {
  const [appStatus, setAppStatus] = useState("Idle");

  return (
    <div className="min-h-screen w-full bg-[#050B14] relative flex flex-col items-center overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* --- REALISTIC HORIZON BACKGROUND --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
         
         {/* 1. The Planet Body (The dark mass at the bottom) */}
         {/* positioned to create a convex curve. Matches bg color to mask the glow behind it, creating the sharp edge. */}
         <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[170vw] h-[170vw] rounded-full bg-[#050B14] z-10 shadow-[0_-10px_100px_rgba(0,0,0,0.8)]">
            {/* The sharp rim light (The Horizon Line) */}
            <div className="absolute inset-0 rounded-full border-t-[2px] border-blue-400/50 opacity-100 shadow-[0_-4px_20px_rgba(59,130,246,0.6)]"></div>
            {/* A second finer rim for detail */}
            <div className="absolute inset-0 rounded-full border-t-[1px] border-white/30 opacity-40 mix-blend-overlay"></div>
         </div>

         {/* 2. The Atmosphere Glow (Behind the planet rim) */}
         {/* This creates the blue aurora effect rising from the horizon */}
         <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-[160vw] h-[160vw] bg-blue-600/20 blur-[120px] rounded-full z-0"></div>

         {/* 3. The Central Highlight (Sun/Core reflection) */}
         {/* Concentrated glow directly behind the card position */}
         <div className="absolute top-[54%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/15 blur-[80px] rounded-full z-10 mix-blend-screen"></div>
         
      </div>

      {/* Top Header UI */}
      <div className="w-full max-w-7xl px-8 py-8 md:px-12 md:py-10 flex justify-between items-center z-30">
        <div className="flex items-center space-x-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg transition-all hover:bg-white/10 cursor-default">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-200/80">
             <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
             <line x1="16" y1="2" x2="16" y2="6"></line>
             <line x1="8" y1="2" x2="8" y2="6"></line>
             <line x1="3" y1="10" x2="21" y2="10"></line>
           </svg>
           <span className="text-[13px] font-medium text-gray-200 tracking-wide">Daily Design Challenge</span>
        </div>
        
        <div className="px-6 py-2.5 rounded-full bg-[#0A101D]/80 border border-white/5 text-gray-400 text-[13px] tracking-widest shadow-lg backdrop-blur-sm">
          Day 17 / 23
        </div>
      </div>

      {/* Main Content Centered */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full mb-10 z-20">
        <div className="transform transition-transform duration-700 hover:scale-[1.02] hover:-translate-y-2 perspective-1000">
          <GlassCard onStatusChange={setAppStatus} />
        </div>
      </div>

      {/* Footer / User Profile */}
      <div className="absolute bottom-10 z-30 flex items-center space-x-4 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer group">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-lg group-hover:border-blue-400/50 transition-colors">
           <img src="https://picsum.photos/100/100" alt="User Avatar" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white tracking-wide group-hover:text-blue-300 transition-colors">@mhmoradi</span>
          <span className="text-xs text-gray-500 font-medium tracking-wide group-hover:text-gray-400">Product Designer</span>
        </div>
      </div>
      
    </div>
  );
};

export default App;