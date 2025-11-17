
import React, { useState, useCallback } from 'react';
import { AppState, AnalysisResult } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import ResumeUpload from './components/ResumeUpload';
import ExamView from './components/ExamView';
import AnalysisScreen from './components/AnalysisScreen';
import ResultsDashboard from './components/ResultsDashboard';
import { analyzeDeveloperProfile } from './services/geminiService';
import { EXAM_QUESTIONS } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Welcome);
  const [resumeText, setResumeText] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>(Array(EXAM_QUESTIONS.length).fill(''));
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setAppState(AppState.ResumeUpload);
  };

  const handleResumeUpload = (text: string) => {
    setResumeText(text);
    setAppState(AppState.TakingExam);
  };

  const handleExamSubmit = useCallback(async (finalAnswers: string[]) => {
    setAnswers(finalAnswers);
    setAppState(AppState.Analyzing);
    setError(null);

    try {
      const result = await analyzeDeveloperProfile(resumeText, finalAnswers);
      setAnalysisResult(result);
      setAppState(AppState.Results);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Sorry, the analysis failed. This could be due to a network issue or an API error. Please try again.");
      setAppState(AppState.TakingExam); // Go back to exam view on error
    }
  }, [resumeText]);

  const handleRestart = () => {
    setAppState(AppState.Welcome);
    setResumeText('');
    setAnswers(Array(EXAM_QUESTIONS.length).fill(''));
    setAnalysisResult(null);
    setError(null);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.Welcome:
        return <WelcomeScreen onStart={handleStart} />;
      case AppState.ResumeUpload:
        return <ResumeUpload onUpload={handleResumeUpload} />;
      case AppState.TakingExam:
        return <ExamView initialAnswers={answers} onSubmit={handleExamSubmit} error={error} />;
      case AppState.Analyzing:
        return <AnalysisScreen />;
      case AppState.Results:
        return analysisResult ? <ResultsDashboard result={analysisResult} onRestart={handleRestart} /> : <AnalysisScreen />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-5xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
