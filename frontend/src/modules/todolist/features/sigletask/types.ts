export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface TaskModel {
  id: string;
  title: string;
  description: string;
  position: number;
  status: TaskStatus;
  isPin: boolean;
}
