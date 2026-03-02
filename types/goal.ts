export type GoalStatus = 'progress' | 'completed' | 'abandoned';

export interface Goal {
  id: string;
  title: string;
  status: GoalStatus;
  createdAt: number;
}
