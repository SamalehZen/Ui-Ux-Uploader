import React, { useState } from 'react';
import { GlassCard } from './components/GlassCard';

const App: React.FC = () => {
  const [appStatus, setAppStatus] = useState("Idle");

  return (
    <div className="min-h-screen w-full bg-[#050B14] relative flex flex-col items-center overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* Top Header UI */}
      <div className="w-full max-w-7xl px-10 py-8 flex justify-between items-center z-20">
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
             <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
             <line x1="16" y1="2" x2="16" y2="6"></line>
             <line x1="8" y1="2" x2="8" y2="6"></line>
             <line x1="3" y1="10" x2="21" y2="10"></line>
           </svg>
           <span className="text-sm font-medium text-gray-200">Daily Design Challenge</span>
        </div>
        
        <div className="px-5 py-2 rounded-full bg-[#0A101D] border border-white/5 text-gray-400 text-sm tracking-wide">
          Day 17 / 23
        </div>
      </div>

      {/* Main Content Centered */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full">
        
        {/* The "Aurora" Light Effect Behind the Card */}
        {/* We use two gradients to create that curved blue horizon effect */}
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[600px] z-0 pointer-events-none">
           {/* The sharp bright arc */}
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/20 rounded-[100%] blur-[80px]"></div>
           
           {/* The bottom wider blue glow */}
           <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 w-[120vw] h-[400px] bg-blue-900/40 rounded-[100%] blur-[100px]"></div>
           
           {/* The distinct horizon line illusion */}
           <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 w-[150%] h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent blur-md"></div>
        </div>

        {/* The Card Component */}
        <div className="z-10 transform transition-all duration-700 hover:scale-[1.01]">
          <GlassCard onStatusChange={setAppStatus} />
        </div>

      </div>

      {/* Footer / User Profile */}
      <div className="absolute bottom-10 z-20 flex items-center space-x-3 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
           <img src="https://picsum.photos/100/100" alt="User Avatar" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white tracking-wide">@mhmoradi</span>
          <span className="text-xs text-gray-500 font-medium">Product Designer</span>
        </div>
      </div>
      
      {/* Status Overlay (Optional debug/visual aid) */}
      <div className="fixed bottom-5 right-5 text-[10px] text-white/10 pointer-events-none">
        System Status: {appStatus}
      </div>

    </div>
  );
};

export default App;