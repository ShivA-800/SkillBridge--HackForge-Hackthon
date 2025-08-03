import { Task } from '../types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Build a Smart To-Do App with AI Categorization',
    description: 'Create a modern to-do application that uses AI to automatically categorize tasks and suggest priorities based on user behavior patterns.',
    skillTags: ['AI', 'Web Dev', 'React', 'Node.js'],
    deadline: '2025-02-15',
    difficulty: 'Intermediate',
    expectedOutcome: 'GitHub repository with deployed app and README documentation',
    mentorName: 'Sarah Chen',
    mentorEmail: 'sarah.chen@techcorp.com',
    createdAt: '2025-01-01',
    upvotes: 24,
    submissions: []
  },
  {
    id: '2',
    title: 'Cybersecurity Vulnerability Scanner',
    description: 'Develop a web-based tool that scans websites for common security vulnerabilities and provides actionable recommendations.',
    skillTags: ['Cybersecurity', 'Python', 'Web Security'],
    deadline: '2025-02-28',
    difficulty: 'Advanced',
    expectedOutcome: 'Python application with comprehensive security report generation',
    mentorName: 'Michael Rodriguez',
    mentorEmail: 'michael.r@securetech.com',
    createdAt: '2025-01-03',
    upvotes: 18,
    submissions: []
  },
  {
    id: '3',
    title: 'Personal Finance Dashboard',
    description: 'Create an intuitive dashboard for tracking personal expenses, budgeting, and financial goal setting with data visualizations.',
    skillTags: ['Web Dev', 'Data Visualization', 'React'],
    deadline: '2025-02-10',
    difficulty: 'Beginner',
    expectedOutcome: 'Interactive web application with charts and expense tracking',
    mentorName: 'Emily Johnson',
    mentorEmail: 'emily.j@fintech.com',
    createdAt: '2025-01-05',
    upvotes: 31,
    submissions: []
  },
  {
    id: '4',
    title: 'Machine Learning Image Classifier',
    description: 'Build an image classification model that can identify different types of plants and provide care recommendations.',
    skillTags: ['ML', 'Python', 'TensorFlow', 'Computer Vision'],
    deadline: '2025-03-01',
    difficulty: 'Advanced',
    expectedOutcome: 'Trained ML model with web interface for image uploads',
    mentorName: 'Dr. Alex Kim',
    mentorEmail: 'alex.kim@ai-labs.com',
    createdAt: '2025-01-07',
    upvotes: 27,
    submissions: []
  },
  {
    id: '5',
    title: 'Social Media Content Scheduler',
    description: 'Develop a tool that helps users schedule and manage their social media posts across multiple platforms with analytics.',
    skillTags: ['Web Dev', 'API Integration', 'Social Media'],
    deadline: '2025-02-20',
    difficulty: 'Intermediate',
    expectedOutcome: 'Web application with API integrations and scheduling features',
    mentorName: 'Jessica Liu',
    mentorEmail: 'jessica.liu@socialtech.com',
    createdAt: '2025-01-10',
    upvotes: 22,
    submissions: []
  }
];