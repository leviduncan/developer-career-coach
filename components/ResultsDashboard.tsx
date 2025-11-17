
import React, { useState } from 'react';
import { AnalysisResult, Resource } from '../types';
import ScoreCard from './ScoreCard';
import { ExternalLinkIcon, RetryIcon } from './Icons';

interface ResultsDashboardProps {
  result: AnalysisResult;
  onRestart: () => void;
}

type Tab = 'score' | 'strengths' | 'gaps' | 'growth' | 'lead';

const TabButton: React.FC<{ activeTab: Tab; tabName: Tab; label: string; onClick: (tab: Tab) => void; }> = ({ activeTab, tabName, label, onClick }) => (
    <button
        onClick={() => onClick(tabName)}
        className={`px-4 py-2 text-sm sm:text-base font-medium rounded-md transition-colors ${activeTab === tabName ? 'bg-brand-primary text-white' : 'bg-base-300 hover:bg-base-300/70 text-content'}`}
    >
        {label}
    </button>
);

const ResourceLink: React.FC<{ resource: Resource }> = ({ resource }) => (
    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-brand-secondary hover:text-brand-primary transition-colors group">
        <span>{resource.title} ({resource.type})</span>
        <ExternalLinkIcon className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
);

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, onRestart }) => {
  const [activeTab, setActiveTab] = useState<Tab>('score');

  const renderContent = () => {
    switch (activeTab) {
      case 'score':
        return <ScoreCard score={result.examScore} level={result.developerLevel} />;
      case 'strengths':
        return (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-brand-primary mb-4">Strengths Report</h3>
            <p className="mb-6 text-content/80">{result.strengthsReport.summary}</p>
            <ul className="space-y-3 list-disc list-inside">
              {result.strengthsReport.topStrengths.map((strength, i) => (
                <li key={i} className="text-content">{strength}</li>
              ))}
            </ul>
          </div>
        );
      case 'gaps':
        return (
           <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-brand-primary mb-4">Areas for Improvement</h3>
            <div className="space-y-4">
              {result.improvementGaps.areas.map((gap, i) => (
                <div key={i} className="bg-base-100 p-4 rounded-md">
                  <h4 className="font-bold text-brand-secondary">{gap.area}</h4>
                  <p className="text-content/80">{gap.details}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'growth':
        return (
            <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-brand-primary mb-4">Personalized Growth Plan</h3>
                <div className="space-y-6">
                    {result.growthPlan.map((item) => (
                        <div key={item.month} className="bg-base-100 p-4 rounded-md">
                            <h4 className="text-xl font-bold text-brand-secondary">Month {item.month}: {item.focus}</h4>
                            <div className="mt-4">
                                <h5 className="font-semibold text-content mb-2">Recommended Resources:</h5>
                                <ul className="space-y-2 list-disc list-inside ml-4">
                                    {item.resources.map((res, i) => <li key={i}><ResourceLink resource={res} /></li>)}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <h5 className="font-semibold text-content mb-2">Suggested Project:</h5>
                                <p className="text-content/80">{item.project}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
       case 'lead':
        return (
            <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-brand-primary mb-4">Team Lead Readiness</h3>
                <div className="text-center my-4 p-4 bg-brand-dark/30 rounded-md">
                    <p className="text-lg">Readiness Score:</p>
                    <p className="text-3xl font-bold text-brand-primary">{result.teamLeadAssessment.readinessScore}</p>
                </div>
                 <p className="mb-6 text-content/80">{result.teamLeadAssessment.summary}</p>
                <div className="space-y-4">
                  {result.teamLeadAssessment.competencies.map((comp, i) => (
                    <div key={i} className="bg-base-100 p-4 rounded-md">
                      <h4 className="font-bold text-brand-secondary">{comp.skill}</h4>
                      <p className="text-content/80">{comp.analysis}</p>
                    </div>
                  ))}
                </div>
            </div>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-base-200 p-6 sm:p-8 rounded-lg shadow-2xl animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-brand-primary">Your Assessment Results</h2>
          <p className="text-content/70">Here's your detailed breakdown. Use this to guide your career growth.</p>
        </div>
        <button onClick={onRestart} className="bg-base-300 hover:bg-brand-dark/50 text-white font-bold py-2 px-4 rounded-full transition-colors flex items-center text-sm">
            <RetryIcon className="w-4 h-4 mr-2" />
            Start Over
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 border-b border-base-300 pb-4">
        <TabButton activeTab={activeTab} tabName="score" label="Score & Level" onClick={setActiveTab} />
        <TabButton activeTab={activeTab} tabName="strengths" label="Strengths" onClick={setActiveTab} />
        <TabButton activeTab={activeTab} tabName="gaps" label="Gaps" onClick={setActiveTab} />
        <TabButton activeTab={activeTab} tabName="growth" label="Growth Plan" onClick={setActiveTab} />
        <TabButton activeTab={activeTab} tabName="lead" label="Team Lead" onClick={setActiveTab} />
      </div>

      <div className="p-1 min-h-[300px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default ResultsDashboard;
