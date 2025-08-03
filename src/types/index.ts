export interface Task {
  id: string;
  title: string;
  description: string;
  skillTags: string[];
  deadline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  expectedOutcome: string;
  mentorName: string;
  mentorEmail: string;
  createdAt: string;
  upvotes: number;
  submissions: Submission[];
}

export interface Submission {
  id: string;
  taskId: string;
  studentName: string;
  studentEmail: string;
  githubLink: string;
  note: string;
  submittedAt: string;
}

export interface Message {
  id: string;
  taskId: string;
  taskTitle: string;
  from: string;
  fromEmail: string;
  to: string;
  toEmail: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
}

export interface User {
  name: string;
  email: string;
  role: 'mentor' | 'student';
  tasksPosted?: number;
  tasksCompleted?: number;
  totalUpvotes?: number;
}

export type FilterType = {
  skillTag: string;
  difficulty: string;
  search: string;
};