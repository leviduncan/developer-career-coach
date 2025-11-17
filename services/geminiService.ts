
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';
import { EXAM_QUESTIONS } from '../constants';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    examScore: { type: Type.NUMBER, description: "A score from 0-40 based on the answers." },
    developerLevel: { type: Type.STRING, enum: ['Junior', 'Mid-Level', 'Senior', 'Staff-level'], description: "The assessed developer level." },
    teamLeadAssessment: {
      type: Type.OBJECT,
      properties: {
        readinessScore: { type: Type.STRING, description: "A qualitative score like 'Ready', 'Almost Ready', or 'Needs Development'." },
        summary: { type: Type.STRING, description: "A summary of team lead capabilities." },
        competencies: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              skill: { type: Type.STRING, description: "The competency skill name." },
              analysis: { type: Type.STRING, description: "Analysis of this competency based on resume and answers." }
            },
            required: ['skill', 'analysis']
          }
        }
      },
      required: ['readinessScore', 'summary', 'competencies']
    },
    strengthsReport: {
      type: Type.OBJECT,
      properties: {
        topStrengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of top strengths." },
        summary: { type: Type.STRING, description: "A summary of the developer's key strengths." }
      },
      required: ['topStrengths', 'summary']
    },
    improvementGaps: {
        type: Type.OBJECT,
        properties: {
            areas: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        area: { type: Type.STRING, description: "Area needing improvement." },
                        details: { type: Type.STRING, description: "Detailed explanation of the gap." }
                    },
                    required: ['area', 'details']
                }
            }
        },
        required: ['areas']
    },
    growthPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          month: { type: Type.NUMBER, description: "Month number for the plan (1, 2, 3, etc.)." },
          focus: { type: Type.STRING, description: "The main focus for this month." },
          resources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, enum: ['Video', 'Article', 'Book', 'GitHub', 'Course'], description: "Type of the resource." },
                title: { type: Type.STRING, description: "Title of the resource." },
                url: { type: Type.STRING, description: "URL to the resource." }
              },
              required: ['type', 'title', 'url']
            }
          },
          project: { type: Type.STRING, description: "A suggested project to apply the learning." }
        },
        required: ['month', 'focus', 'resources', 'project']
      }
    }
  },
  required: ['examScore', 'developerLevel', 'teamLeadAssessment', 'strengthsReport', 'improvementGaps', 'growthPlan']
};


export const analyzeDeveloperProfile = async (resumeText: string, answers: string[]): Promise<AnalysisResult> => {
  const model = 'gemini-2.5-pro';

  const prompt = `
    You are an expert CTO and Senior Staff Engineer at a top tech company. Your task is to conduct a detailed evaluation of a developer based on their resume and their answers to a 40-question technical and leadership exam. Provide a comprehensive analysis in a structured JSON format.

    **SCORING GUIDE:**
    - 0–15 = Junior
    - 16–26 = Mid-Level
    - 27–34 = Senior
    - 35+ = Staff-level

    **CANDIDATE RESUME:**
    ---
    ${resumeText}
    ---

    **EXAM QUESTIONS AND ANSWERS:**
    ---
    ${EXAM_QUESTIONS.map((q, i) => `${q.question}\nAnswer: ${answers[i] || 'No answer provided.'}\n`).join('---\n')}
    ---

    Based on all the provided information, generate a complete JSON response adhering to the specified schema. Be thorough, insightful, and act as a true career coach. Your analysis should be critical but constructive.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};
