
import React from 'react';

interface ScoreCardProps {
  score: number;
  level: 'Junior' | 'Mid-Level' | 'Senior' | 'Staff-level';
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, level }) => {
  const maxScore = 40;
  const percentage = (score / maxScore) * 100;

  const getLevelColor = () => {
    switch (level) {
      case 'Junior': return 'text-yellow-400';
      case 'Mid-Level': return 'text-sky-400';
      case 'Senior': return 'text-green-400';
      case 'Staff-level': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };
  
  const getLevelDescription = () => {
    switch (level) {
      case 'Junior': return 'You have foundational knowledge and are ready to grow and learn within a team.';
      case 'Mid-Level': return 'You can work independently on complex tasks and contribute significantly to projects.';
      case 'Senior': return 'You possess deep expertise, can lead technical initiatives, and mentor other engineers.';
      case 'Staff-level': return 'You operate at a strategic level, influencing technical direction across multiple teams.';
    }
  };

  return (
    <div className="text-center p-6 bg-base-100 rounded-lg animate-fade-in">
        <h3 className="text-2xl font-bold text-brand-primary mb-4">Your Score & Level</h3>
        <div className="relative w-48 h-48 mx-auto mb-4">
            <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                    className="text-base-300"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                />
                <path
                    className="text-brand-primary"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${percentage}, 100`}
                    strokeLinecap="round"
                    transform="rotate(-90 18 18)"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-content">{score}</span>
                <span className="text-base text-content/70">/ {maxScore}</span>
            </div>
        </div>
        <p className="text-3xl font-bold mb-2">
            <span className={getLevelColor()}>{level}</span>
        </p>
        <p className="text-content/80 max-w-md mx-auto">
            {getLevelDescription()}
        </p>
    </div>
  );
};

export default ScoreCard;
