import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const PROGRESS_KEY = 'vibecoin-progress';

const defaultProgress = {
  learnedBasics: false,
  completedBuySim: false,
  completedSeedGame: false,
  completedScamGame: false,
  completedSendSim: false,
  quizScore: 0,
  quizCompleted: false,
  visitedMap: false,
  badges: [],
};

/**
 * Hook para el progreso de aprendizaje y logros.
 * Setters envueltos en useCallback para referencia estable y evitar bucles.
 */
export function useProgress() {
  const [progress, setProgress] = useLocalStorage(PROGRESS_KEY, defaultProgress);

  const markLearnedBasics = useCallback(() => setProgress((p) => ({ ...p, learnedBasics: true })), [setProgress]);
  const markBuySimDone = useCallback(() => setProgress((p) => ({ ...p, completedBuySim: true })), [setProgress]);
  const markSeedGameDone = useCallback(() => setProgress((p) => ({ ...p, completedSeedGame: true })), [setProgress]);
  const markScamGameDone = useCallback(() => setProgress((p) => ({ ...p, completedScamGame: true })), [setProgress]);
  const markSendSimDone = useCallback(() => setProgress((p) => ({ ...p, completedSendSim: true })), [setProgress]);
  const markVisitedMap = useCallback(() => setProgress((p) => ({ ...p, visitedMap: true })), [setProgress]);

  const setQuizResult = useCallback(
    (score, completed) =>
      setProgress((p) => ({
        ...p,
        quizScore: Math.max(p.quizScore, score),
        quizCompleted: completed,
      })),
    [setProgress]
  );

  const addBadge = useCallback(
    (badgeId) =>
      setProgress((p) => ({
        ...p,
        badges: p.badges.includes(badgeId) ? p.badges : [...p.badges, badgeId],
      })),
    [setProgress]
  );

  const completedCount = [
    progress.learnedBasics,
    progress.completedBuySim,
    progress.completedSeedGame,
    progress.completedScamGame,
    progress.completedSendSim,
    progress.quizCompleted,
    progress.visitedMap,
  ].filter(Boolean).length;

  return {
    progress,
    setProgress,
    completedCount,
    totalSteps: 7,
    markLearnedBasics,
    markBuySimDone,
    markSeedGameDone,
    markScamGameDone,
    markSendSimDone,
    setQuizResult,
    markVisitedMap,
    addBadge,
  };
}
