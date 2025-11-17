
import React from 'react';
import { ArrowRightIcon } from './Icons';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center bg-base-200 p-8 rounded-lg shadow-2xl animate-fade-in">
      <h1 className="text-4xl sm:text-5xl font-bold text-brand-primary mb-4">
        Developer Career Coach AI
      </h1>
      <p className="text-lg text-content max-w-2xl mx-auto mb-8">
        Get a real-world evaluation of your developer skills. Upload your resume, complete a comprehensive exam, and receive an AI-driven report on your level, strengths, and a personalized growth plan.
      </p>
      <div className="space-y-4 max-w-lg mx-auto text-left mb-10">
          <div className="flex items-start space-x-3">
              <span className="text-brand-primary mt-1">✔</span>
              <p>An expert-level skills exam to gauge your true seniority.</p>
          </div>
          <div className="flex items-start space-x-3">
              <span className="text-brand-primary mt-1">✔</span>
              <p>A diagnostic report on your strengths and weaknesses based on your resume.</p>
          </div>
          <div className="flex items-start space-x-3">
              <span className="text-brand-primary mt-1">✔</span>
              <p>A personalized growth plan with free resources to reach the next level.</p>
          </div>
      </div>
      <button
        onClick={onStart}
        className="bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 duration-300 ease-in-out flex items-center justify-center mx-auto group"
      >
        Start Your Assessment
        <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default WelcomeScreen;
