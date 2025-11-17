
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Analyzing your architectural decisions...",
  "Evaluating your React & TypeScript proficiency...",
  "Cross-referencing your resume with your answers...",
  "Assessing leadership and system design patterns...",
  "Calibrating your developer level...",
  "Generating your personalized growth plan...",
  "This can take up to 60 seconds. Thank you for your patience."
];

const AnalysisScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto bg-base-200 p-8 rounded-lg shadow-2xl text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-brand-primary mb-6">Analyzing Your Profile...</h2>
      
      <div className="flex justify-center items-center space-x-2 my-8">
        <div className="w-4 h-4 rounded-full bg-brand-primary animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-brand-primary animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 rounded-full bg-brand-primary animate-pulse"></div>
      </div>

      <p className="text-content text-lg min-h-[2.5rem] transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default AnalysisScreen;
