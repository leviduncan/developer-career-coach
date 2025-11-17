
export enum AppState {
  Welcome,
  ResumeUpload,
  TakingExam,
  Analyzing,
  Results
}

export interface ExamQuestion {
  section: string;
  question: string;
}

export interface Competency {
  skill: string;
  analysis: string;
}

export interface TeamLeadAssessment {
  readinessScore: string;
  summary: string;
  competencies: Competency[];
}

export interface StrengthReport {
  topStrengths: string[];
  summary: string;
}

export interface ImprovementGap {
  area: string;
  details: string;
}

export interface Resource {
  type: 'Video' | 'Article' | 'Book' | 'GitHub' | 'Course';
  title: string;
  url: string;
}

export interface GrowthPlanItem {
  month: number;
  focus: string;
  resources: Resource[];
  project: string;
}

export interface AnalysisResult {
  examScore: number;
  developerLevel: 'Junior' | 'Mid-Level' | 'Senior' | 'Staff-level';
  teamLeadAssessment: TeamLeadAssessment;
  strengthsReport: StrengthReport;
  improvementGaps: {
    areas: ImprovementGap[];
  };
  growthPlan: GrowthPlanItem[];
}
