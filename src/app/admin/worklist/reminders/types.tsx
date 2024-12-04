// types.ts

// Type for a single Reminder
export type Reminder = {
  id: number; // Unique identifier for each reminder
  text: string; // The main content or text of the reminder
  completed: boolean; // Status of the reminder (completed or not)
  reminderTime: string; // Date and time for when the reminder is due (ISO string)
  priority: string; // Priority level (Low, Medium, High)
  status: string; // Status of the reminder (e.g., Pending, Completed)
  repeat: string; // Repeat setting (None, Daily, Weekly, Monthly)
  category: string; // Category (e.g., Work, Personal)
  project: string; // Associated project (e.g., Project A, Project B)
  description: string; // Detailed description of the reminder
};

// Type for MiniStatistics props
export interface MiniStatisticsProps {
  total: number;
  completed: number;
  pending: number;
  upcoming: number;
}

// Type for SimpleGrid props
export interface SimpleGridProps {
  total: number;
  completed: number;
  pending: number;
}

// Type for ReminderList props
export interface ReminderListProps {
  reminders: Reminder[];
  toggleCompleted: (id: number) => void;
  handleEditReminder: (reminder: Reminder) => void;
  handleDeleteReminder: (id: number) => void;
}

// Type for the modal form data (when adding or editing a reminder)
export interface ReminderFormData {
  reminderText: string;
  reminderTime: string;
  priority: string;
  status: string;
  repeat: string;
  category: string;
  project: string;
  description: string;
}

