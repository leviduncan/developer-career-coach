
import { ExamQuestion } from './types';

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // Section 1: JavaScript
  { section: 'JavaScript', question: '1. Explain event loop tick, microtask queue, and macrotask queue with examples.' },
  { section: 'JavaScript', question: '2. Why is async/await just syntactic sugar?' },
  { section: 'JavaScript', question: '3. What happens when you call `Promise.resolve().then()` inside a `setTimeout()` 0ms?' },
  { section: 'JavaScript', question: '4. Explain closures and give a real-world scenario.' },
  { section: 'JavaScript', question: '5. What does `this` evaluate to inside an arrow function?' },
  { section: 'JavaScript', question: '6. Why is mutation dangerous in large codebases, and how do you prevent it?' },
  { section: 'JavaScript', question: '7. What is structural sharing and when is it useful?' },
  { section: 'JavaScript', question: '8. Describe a time you eliminated a performance bottleneck caused by JS allocation or DOM thrashing.' },

  // Section 2: React + TypeScript
  { section: 'React + TypeScript', question: '9. Explain the difference between controlled and uncontrolled components.' },
  { section: 'React + TypeScript', question: '10. Explain React’s reconciliation process.' },
  { section: 'React + TypeScript', question: '11. What is the React compiler (2024+) and how does it change rendering?' },
  { section: 'React + TypeScript', question: '12. When would you choose Context API vs Zustand vs Redux Toolkit vs React Query?' },
  { section: 'React + TypeScript', question: '13. How would you reduce re-renders in a high-traffic checkout page?' },
  { section: 'React + TypeScript', question: '14. Explain why `useEffect` often leads to bugs and how to avoid them.' },
  { section: 'React + TypeScript', question: '15. Describe the difference between server components and client components (Next.js).' },
  { section: 'React + TypeScript', question: '16. Give an example of a TypeScript utility type you wrote to streamline a large app.' },
  { section: 'React + TypeScript', question: '17. Explain how you implement dynamic form validation with TypeScript generics.' },
  { section: 'React + TypeScript', question: '18. Explain a time you rebuilt a complex UI component to be more maintainable.' },

  // Section 3: Web Performance & Architecture
  { section: 'Web Performance & Architecture', question: '19. Compare TTI, CLS, LCP, INP — what affects revenue the most?' },
  { section: 'Web Performance & Architecture', question: '20. How do you measure long tasks in production?' },
  { section: 'Web Performance & Architecture', question: '21. Describe an architecture to reduce React bundle size by 40%.' },
  { section: 'Web Performance & Architecture', question: '22. How to make an app resilient during peak traffic spikes?' },
  { section: 'Web Performance & Architecture', question: '23. What is code splitting and when does it *not* help?' },
  { section: 'Web Performance & Architecture', question: '24. What performance issues do jQuery-heavy websites suffer from?' },
  { section: 'Web Performance & Architecture', question: '25. How would you migrate Bootstrap 3 → 5 without breaking layout?' },
  { section: 'Web Performance & Architecture', question: '26. Explain how to build a Lighthouse CI pipeline.' },
  { section: 'Web Performance & Architecture', question: '27. Explain how to tune a slow checkout page in a legacy e-commerce platform.' },
  { section: 'Web Performance & Architecture', question: '28. Explain a reactive architecture for live user sessions (websockets, SSE).' },

  // Section 4: System Design for Front-End
  { section: 'System Design for Front-End', question: '29. How do you design a reusable component library?' },
  { section: 'System Design for Front-End', question: '30. How do you design a data-layer that supports offline-first functionality?' },
  { section: 'System Design for Front-End', question: '31. How should you structure React routes for a multi-brand e-commerce site?' },
  { section: 'System Design for Front-End', question: '32. How do you architect a feature flagging system?' },
  { section: 'System Design for Front-End', question: '33. How would you build an audit dashboard like your Landing Page Auditor App at scale?' },
  { section: 'System Design for Front-End', question: '34. How do you integrate AI agents safely into front-end flows?' },

  // Section 5: Leadership & Team Lead Readiness
  { section: 'Leadership & Team Lead Readiness', question: '35. How do you resolve a conflict between two engineers on your team?' },
  { section: 'Leadership & Team Lead Readiness', question: '36. How do you mentor a junior who keeps rewriting code incorrectly?' },
  { section: 'Leadership & Team Lead Readiness', question: '37. How do you influence product direction without authority?' },
  { section: 'Leadership & Team Lead Readiness', question: '38. How do you handle a situation where a deadline is impossible?' },
  { section: 'Leadership & Team Lead Readiness', question: '39. How do you define success for your team?' },
  { section: 'Leadership & Team Lead Readiness', question: '40. A developer pushed breaking code into production twice. How do you handle it?' }
];
