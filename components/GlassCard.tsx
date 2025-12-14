import React, { useRef, useState, useEffect } from 'react';
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

    // Simulate upload progress
    const duration = 2000; // 2 seconds
    const interval = 20;
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
      onStatusChange("Analyzing with Gemini...");
      const text = await uploadedFile.text();
      const summary = await analyzeFileContent(text);
      setGeminiSummary(summary);
      onStatusChange("Done");
    } else {
       // Mock analysis for non-text files for demo purposes
       setTimeout(() => {
         setGeminiSummary("File uploaded successfully. (Gemini analysis available for .txt files)");
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

  // Calculate opacity for the 'Uploading' text vs 'Completed'
  const isDone = progress === 100;

  return (
    <div 
      onClick={handleCardClick}
      className={`
        relative w-[480px] h-[340px] rounded-3xl
        bg-gradient-to-b from-white/10 to-transparent
        border border-white/10
        backdrop-blur-2xl
        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]
        flex flex-col items-center justify-between
        p-8 overflow-hidden
        transition-all duration-500 group
        ${!file ? 'cursor-pointer hover:border-white/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]' : ''}
      `}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />

      {/* Close Button */}
      <div className="absolute top-5 right-5 z-20">
        <button 
          onClick={file ? reset : undefined}
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M1 1L9 9M9 1L1 9" className="text-gray-400" />
          </svg>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full z-10 space-y-2 mt-4">
        {/* Icon & Details */}
        <div className="flex items-center space-x-6 w-full px-4">
          <div className="transition-transform duration-500 transform group-hover:scale-105">
            <CustomFileIcon />
          </div>
          
          <div className="flex flex-col items-start space-y-1">
            <h2 className="text-2xl font-normal tracking-tight text-white">
              {file ? (file.name.length > 18 ? file.name.substring(0,15) + '...' : file.name) : defaultFileName}
            </h2>
            <p className="text-gray-400 text-sm font-light">
               {file ? `${(file.size / 1024).toFixed(2)} KB` : defaultFileSize}
            </p>
            
            {geminiSummary && (
               <div className="mt-2 text-xs text-blue-200/80 max-w-[200px] max-h-[60px] overflow-y-auto leading-relaxed pr-2">
                 {geminiSummary}
               </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="w-full space-y-3 z-10 mt-4">
        <div className="flex justify-between items-center text-lg font-light tracking-wide">
          <div className="flex items-center space-x-3">
             {/* Spinner for Uploading state */}
             {isUploading && (
               <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
             )}
             {!isUploading && progress === 0 && (
                 <span className="text-gray-400 text-base">Click to upload</span>
             )}
             {(isUploading || progress > 0) && (
                <span className="text-gray-300">
                    {progress === 100 ? (geminiSummary ? "Analyzed" : "Completed") : "Uploading ..."}
                </span>
             )}
          </div>
          <span className="text-3xl font-light tabular-nums">{progress} %</span>
        </div>

        {/* Progress Bar Container */}
        <div className="h-2 w-full bg-gray-700/30 rounded-full overflow-hidden backdrop-blur-sm">
          {/* Active Bar with Glow */}
          <div 
            className="h-full bg-white rounded-full relative shadow-[0_0_15px_rgba(255,255,255,0.7)] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          >
             {/* Leading edge light */}
             <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_20px_5px_rgba(255,255,255,0.8)] rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Background Gradient Mesh (Optional subtle internal glow) */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
};