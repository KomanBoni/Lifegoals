import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Goal, GoalStatus } from '../types/goal';
import { generateId } from '../utils/id';

interface GoalsContextValue {
  goals: Goal[];
  addGoal: (title: string) => void;
  updateGoalStatus: (id: string, status: GoalStatus) => void;
  deleteGoal: (id: string) => void;
}

const GoalsContext = createContext<GoalsContextValue | null>(null);

export function GoalsProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = useCallback((title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setGoals((prev) => [
      ...prev,
      {
        id: generateId(),
        title: trimmed,
        status: 'progress',
        createdAt: Date.now(),
      },
    ]);
  }, []);

  const updateGoalStatus = useCallback((id: string, status: GoalStatus) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status } : g))
    );
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const value: GoalsContextValue = {
    goals,
    addGoal,
    updateGoalStatus,
    deleteGoal,
  };

  return (
    <GoalsContext.Provider value={value}>
      {children}
    </GoalsContext.Provider>
  );
}

export function useGoals(): GoalsContextValue {
  const ctx = useContext(GoalsContext);
  if (!ctx) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return ctx;
}
