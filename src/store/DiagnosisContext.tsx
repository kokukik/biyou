import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { DiagnosisState, PersonalityType } from '@/types/diagnosis';

type DiagnosisAction = 
  | { type: 'SET_PERSONALITY_ANSWER'; question: string; answer: string }
  | { type: 'SET_DETAIL_ANSWER'; question: string; answer: any }
  | { type: 'SET_PERSONALITY_TYPE'; personalityType: PersonalityType }
  | { type: 'RESET' };

const initialState: DiagnosisState = {
  personalityAnswers: {
    homework: '',
    studyStyle: '',
    readingAbility: '',
    focusTime: '',
  },
  detailAnswers: {
    examTiming: 'next',
    status: 'current',
    previousExam: 'none',
    weakSubjects: [],
  },
  personalityType: null,
};

const DiagnosisContext = createContext<{
  state: DiagnosisState;
  dispatch: React.Dispatch<DiagnosisAction>;
} | null>(null);

function diagnosisReducer(state: DiagnosisState, action: DiagnosisAction): DiagnosisState {
  switch (action.type) {
    case 'SET_PERSONALITY_ANSWER':
      return {
        ...state,
        personalityAnswers: {
          ...state.personalityAnswers,
          [action.question]: action.answer,
        },
      };
    case 'SET_DETAIL_ANSWER':
      return {
        ...state,
        detailAnswers: {
          ...state.detailAnswers,
          [action.question]: action.answer,
        },
      };
    case 'SET_PERSONALITY_TYPE':
      return {
        ...state,
        personalityType: action.personalityType,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function DiagnosisProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(diagnosisReducer, initialState);

  return (
    <DiagnosisContext.Provider value={{ state, dispatch }}>
      {children}
    </DiagnosisContext.Provider>
  );
}

export function useDiagnosis() {
  const context = useContext(DiagnosisContext);
  if (!context) {
    throw new Error('useDiagnosis must be used within a DiagnosisProvider');
  }
  return context;
}