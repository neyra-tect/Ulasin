'use client';

import { createContext, useContext, useReducer, useEffect, useState } from 'react';

const ProgressContext = createContext(null);

const initialState = {
  materiCompleted: [],
  contohViewed: [],
  quizScore: null,
  quizCompleted: false,
  guideShown: false,
  totalProgress: 0,
};

function progressReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'COMPLETE_MATERI':
      if (state.materiCompleted.includes(action.payload)) return state;
      newState = {
        ...state,
        materiCompleted: [...state.materiCompleted, action.payload],
      };
      break;
    case 'VIEW_CONTOH':
      if (state.contohViewed.includes(action.payload)) return state;
      newState = {
        ...state,
        contohViewed: [...state.contohViewed, action.payload],
      };
      break;
    case 'SET_QUIZ_SCORE':
      newState = {
        ...state,
        quizScore: action.payload,
        quizCompleted: true,
      };
      break;
    case 'SET_GUIDE_SHOWN':
      newState = {
        ...state,
        guideShown: true,
      };
      break;
    case 'RESET':
      newState = { ...initialState };
      break;
    case 'LOAD':
      newState = { ...action.payload };
      break;
    default:
      return state;
  }

  // Calculate total progress
  const materiProgress = (newState.materiCompleted.length / 7) * 40;
  const contohProgress = (newState.contohViewed.length / 3) * 20;
  const quizProgress = newState.quizCompleted ? 40 : 0;
  newState.totalProgress = Math.round(materiProgress + contohProgress + quizProgress);

  return newState;
}

export function ProgressProvider({ children }) {
  const [state, dispatch] = useReducer(progressReducer, initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ulasin-progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD', payload: { ...initialState, ...parsed } });
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('ulasin-progress', JSON.stringify(state));
      } catch (e) {
        console.error('Failed to save progress:', e);
      }
    }
  }, [state, isLoaded]);

  return (
    <ProgressContext.Provider value={{ state, dispatch, isLoaded }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }

  const { state, dispatch } = context;

  return {
    progress: state,
    completeMateri: (tabId) => dispatch({ type: 'COMPLETE_MATERI', payload: tabId }),
    viewContoh: (contohId) => dispatch({ type: 'VIEW_CONTOH', payload: contohId }),
    setQuizScore: (score) => dispatch({ type: 'SET_QUIZ_SCORE', payload: score }),
    setGuideShown: () => dispatch({ type: 'SET_GUIDE_SHOWN' }),
    resetProgress: () => dispatch({ type: 'RESET' }),
  };
}
