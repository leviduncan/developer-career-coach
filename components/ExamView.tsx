
import React, { useState, useEffect } from 'react';
import { EXAM_QUESTIONS } from '../constants';
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon } from './Icons';

interface ExamViewProps {
  initialAnswers: string[];
  onSubmit: (answers: string[]) => void;
  error: string | null;
}

const ExamView: React.FC<ExamViewProps> = ({ initialAnswers, onSubmit, error }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(initialAnswers);
  const [showTutor, setShowTutor] = useState(false);

  useEffect(() => {
    // If there's an error on submit, stay on the last question to allow resubmission.
    if (error) {
      setCurrentQuestionIndex(EXAM_QUESTIONS.length - 1);
    }
  }, [error]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < EXAM_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = () => {
    if (window.confirm("Are you sure you want to submit your answers? You cannot change them after this.")) {
      onSubmit(answers);
    }
  };

  const currentQuestion = EXAM_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / EXAM_QUESTIONS.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto bg-base-200 p-6 sm:p-8 rounded-lg shadow-2xl animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-brand-primary mb-4">Developer Skills Exam</h2>
      
      {/* Progress Bar */}
      <div className="w-full bg-base-300 rounded-full h-2.5 mb-4">
        <div className="bg-brand-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-center text-content/70 mb-6">Question {currentQuestionIndex + 1} of {EXAM_QUESTIONS.length}</p>

      {/* Question Card */}
      <div className="bg-base-100 p-6 rounded-lg mb-6">
        <p className="text-sm font-semibold text-brand-secondary mb-2">{currentQuestion.section}</p>
        <p className="text-lg text-content font-medium">{currentQuestion.question}</p>
      </div>

      {/* Answer Text Area */}
      <textarea
        value={answers[currentQuestionIndex]}
        onChange={handleAnswerChange}
        placeholder="Your answer here..."
        className="w-full h-48 p-4 bg-base-300 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
      />

      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className="bg-base-300 hover:bg-brand-dark/50 text-white font-bold py-2 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Previous
        </button>
        
        {currentQuestionIndex < EXAM_QUESTIONS.length - 1 ? (
          <button
            onClick={nextQuestion}
            className="bg-brand-primary hover:bg-brand-dark text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center"
          >
            Next
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center"
          >
            <CheckCircleIcon className="w-5 h-5 mr-2" />
            Submit Exam
          </button>
        )}
      </div>

      {/* Tutor Hint */}
       <div className="text-center mt-8 text-sm text-content/60">
        <p>This is an open-book exam. Feel free to use the internet to research concepts.</p>
        <p>The goal is to assess your understanding and problem-solving process, not memorization.</p>
      </div>
    </div>
  );
};

export default ExamView;
