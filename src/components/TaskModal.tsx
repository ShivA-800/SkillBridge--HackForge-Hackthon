import React, { useState } from 'react';
import { X, Calendar, Users, ThumbsUp, Target, Clock, Send, Github } from 'lucide-react';
import { Task, Submission } from '../types';

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submission: Omit<Submission, 'id' | 'submittedAt'>) => void;
  onUpvote: (taskId: string) => void;
}

export default function TaskModal({ task, isOpen, onClose, onSubmit, onUpvote }: TaskModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [githubLink, setGithubLink] = useState('');
  const [note, setNote] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  if (!isOpen || !task) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubLink.trim() || !studentName.trim() || !studentEmail.trim()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    onSubmit({
      taskId: task.id,
      studentName: studentName.trim(),
      studentEmail: studentEmail.trim(),
      githubLink: githubLink.trim(),
      note: note.trim()
    });

    // Reset form
    setGithubLink('');
    setNote('');
    setStudentName('');
    setStudentEmail('');
    setIsSubmitting(false);
    onClose();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Task Details</h2>
              <p className="text-sm text-gray-500">Review and submit your solution</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
                <p className="text-gray-600">Posted by {task.mentorName}</p>
              </div>
              <button
                onClick={() => onUpvote(task.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-50 hover:bg-emerald-50 rounded-xl transition-colors duration-200 group"
              >
                <ThumbsUp className="w-5 h-5 text-gray-500 group-hover:text-emerald-600" />
                <span className="text-sm font-medium text-gray-600 group-hover:text-emerald-600">
                  {task.upvotes}
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Deadline</span>
                </div>
                <p className="text-blue-800 font-semibold">
                  {new Date(task.deadline).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Difficulty</span>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(task.difficulty)}`}>
                  {task.difficulty}
                </span>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Submissions</span>
                </div>
                <p className="text-green-800 font-semibold">{task.submissions.length} students</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{task.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {task.skillTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-sm font-medium rounded-xl border border-blue-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Expected Outcome</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-amber-600 mt-0.5" />
                  <p className="text-amber-800">{task.expectedOutcome}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Your Solution</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="studentName"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="studentEmail"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Repository Link *
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      id="githubLink"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="https://github.com/username/repository"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Share your approach, challenges faced, or any additional information..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !githubLink.trim() || !studentName.trim() || !studentEmail.trim()}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Solution</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}