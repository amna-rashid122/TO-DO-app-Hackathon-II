
export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum Category {
  WORK = 'Work',
  PERSONAL = 'Personal',
  URGENT = 'Urgent',
  SHOPPING = 'Shopping',
  HEALTH = 'Health',
  OTHER = 'Other'
}

export enum RepeatType {
  NONE = 'None',
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly'
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate: string; // ISO string
  createdAt: string; // ISO string
  repeat: RepeatType;
}

export type SortOption = 'newest' | 'oldest' | 'priority' | 'alphabetical' | 'dueDate';
export type FilterStatus = 'all' | 'active' | 'completed';
