import React, { useRef, useState } from 'react';
import { CustomFileIcon } from './CustomIcon';
import { analyzeFileContent } from '../services/geminiService';

interface GlassCardProps {
  onStatusChange: (status: string) => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ onStatusChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [geminiSummary, setGeminiSummary] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultFileName = "Project Brief.txt";
  const defaultFileSize = "97.23 KB";

  const handleCardClick = () => {
    if (!isUploading && !file) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      startUploadSimulation(selectedFile);
    }
  };

  const startUploadSimulation = (selectedFile: File) => {
    setFile(selectedFile);
    setIsUploading(true);
    setProgress(0);
    setGeminiSummary(null);
    onStatusChange("Uploading...");

    const duration = 2500;
    const interval = 25;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsUploading(false);
        onStatusChange("Completed");
        handleAnalysis(selectedFile);
      }
    }, interval);
  };

  const handleAnalysis = async (uploadedFile: File) => {
    if (uploadedFile.type === "text/plain") {
      onStatusChange("Analyzing...");
      const text = await uploadedFile.text();
      const summary = await analyzeFileContent(text);
      setGeminiSummary(summary);
      onStatusChange("Done");
    } else {
       setTimeout(() => {
         setGeminiSummary("Upload complete. Gemini analysis is optimized for text files.");
         onStatusChange("Done");
       }, 500);
    }
  };

  const reset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setProgress(0);
    setGeminiSummary(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onStatusChange("Idle");
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`
        relative w-[520px] h-[340px] rounded-[32px]
        bg-[#111827]/40 
        backdrop-blur-2xl
        border border-white/10
        shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)]
        flex flex-col
        p-10
        transition-all duration-500 group
        ${!file ? 'cursor-pointer hover:bg-[#111827]/50 hover:border-white/15 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]' : ''}
      `}
    >
      {/* Top Inner Shadow Highlight - Enhanced */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-70"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent opacity-50"></div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />

      {/* Close Button */}
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={file ? reset : undefined}
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M1 1L9 9M9 1L1 9" className="text-gray-400 group-hover:text-white" />
          </svg>
        </button>
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col justify-between z-10">
        
        {/* Top Section: Icon & Metadata */}
        <div className="flex items-center space-x-8 pt-4">
          <div className="transition-transform duration-500 transform group-hover:scale-105 group-hover:-rotate-2">
            <CustomFileIcon />
          </div>
          
          <div className="flex flex-col space-y-2 max-w-[220px]">
            <h2 className="text-3xl font-medium tracking-tight text-white/95 leading-tight">
              {file ? (file.name.length > 18 ? file.name.substring(0,15) + '...' : file.name) : defaultFileName}
            </h2>
            <p className="text-gray-400 text-base font-light tracking-wide">
               {file ? `${(file.size / 1024).toFixed(2)} KB` : defaultFileSize}
            </p>
            
            {geminiSummary && (
               <div className="mt-1 text-xs text-blue-300/90 leading-relaxed line-clamp-2 animate-pulse">
                 {geminiSummary}
               </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Progress Bar */}
        <div className="w-full space-y-4 pb-2">
          
          {/* Status Text Row */}
          <div className="flex justify-between items-end">
            <div className="flex items-center space-x-3 text-lg text-gray-300 font-light">
               {isUploading && (
                 <div className="relative w-5 h-5">
                   <div className="absolute inset-0 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                   <div className="absolute inset-0 border-2 border-white/10 rounded-full"></div>
                 </div>
               )}
               <span className="tracking-wide">
                 {!isUploading && progress === 0 ? "Click to upload" : (isUploading ? "Uploading ..." : (geminiSummary ? "Analyzed" : "Completed"))}
               </span>
            </div>
            
            <span className="text-4xl font-extralight text-white tracking-tight">
              {progress} %
            </span>
          </div>

          {/* Progress Track */}
          <div className="h-1.5 w-full bg-[#0B111D] rounded-full overflow-visible relative">
            {/* Active Bar */}
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-white rounded-full relative transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            >
               {/* The "Spark" / Lens Flare at the tip */}
               {progress > 0 && progress < 100 && (
                 <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                   <div className="w-4 h-4 bg-white rounded-full blur-[6px]"></div>
                   <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
                 </div>
               )}
            </div>
            
            {/* Glow under the bar */}
             <div 
              className="absolute top-0 left-0 h-full bg-blue-500/50 blur-[6px] rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
             ></div>
          </div>
        </div>
      </div>
    </div>
  );
};