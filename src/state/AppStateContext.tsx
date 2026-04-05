import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type Stats = {
  attempts: number;
  correct: number;
  completedSessions: number;
};

type PersistedState = {
  stats: Stats;
  missedQuestionIds: string[];
};

type AppStateValue = {
  stats: Stats;
  missedQuestionIds: string[];
  isReady: boolean;
  recordAnswer: (questionId: string, isCorrect: boolean) => void;
  completeSession: () => void;
  resetProgress: () => Promise<void>;
};

const STORAGE_KEY = "droneid/progress-v1";

const defaultStats: Stats = {
  attempts: 0,
  correct: 0,
  completedSessions: 0,
};

const AppStateContext = createContext<AppStateValue | null>(null);

export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [missedQuestionIds, setMissedQuestionIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) {
          return;
        }
        const parsed = JSON.parse(raw) as PersistedState;
        if (mounted) {
          setStats(parsed.stats ?? defaultStats);
          setMissedQuestionIds(parsed.missedQuestionIds ?? []);
        }
      } catch {
        if (mounted) {
          setStats(defaultStats);
          setMissedQuestionIds([]);
        }
      } finally {
        if (mounted) {
          setIsReady(true);
        }
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const persisted: PersistedState = {
      stats,
      missedQuestionIds,
    };

    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  }, [stats, missedQuestionIds, isReady]);

  const recordAnswer = useCallback((questionId: string, isCorrect: boolean) => {
    setStats((prev) => ({
      ...prev,
      attempts: prev.attempts + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
    }));

    setMissedQuestionIds((prev) => {
      if (isCorrect) {
        return prev.filter((id) => id !== questionId);
      }

      if (prev.includes(questionId)) {
        return prev;
      }

      return [...prev, questionId];
    });
  }, []);

  const completeSession = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      completedSessions: prev.completedSessions + 1,
    }));
  }, []);

  const resetProgress = useCallback(async () => {
    setStats(defaultStats);
    setMissedQuestionIds([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      stats,
      missedQuestionIds,
      isReady,
      recordAnswer,
      completeSession,
      resetProgress,
    }),
    [stats, missedQuestionIds, isReady, recordAnswer, completeSession, resetProgress],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
};
