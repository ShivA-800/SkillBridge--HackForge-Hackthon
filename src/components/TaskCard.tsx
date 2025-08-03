import { Calendar, Users, ThumbsUp, Clock, Target, MessageCircle } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onTaskClick: (task: Task) => void;
  onUpvote: (taskId: string) => void;
  onMessageOwner: (task: Task) => void;
}

export default function TaskCard({ task, onTaskClick, onUpvote, onMessageOwner }: TaskCardProps) {
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

  const isDeadlineSoon = () => {
    const deadline = new Date(task.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer group overflow-hidden relative">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
      
      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 
              className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-all duration-300 line-clamp-2 leading-tight"
              onClick={() => onTaskClick(task)}
            >
              {task.title}
            </h3>
            <p className="text-sm text-gray-500 mt-2 font-medium">by {task.mentorName}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMessageOwner(task);
              }}
              className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-600 rounded-full transition-all duration-300 group/msg transform hover:scale-105 shadow-sm hover:shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Message</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpvote(task.id);
              }}
              className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-emerald-50 hover:to-emerald-100 rounded-full transition-all duration-300 group/btn transform hover:scale-105 shadow-sm hover:shadow-md"
            >
              <ThumbsUp className="w-4 h-4 text-gray-500 group-hover/btn:text-emerald-600 transition-colors duration-300" />
              <span className="text-sm text-gray-600 group-hover/btn:text-emerald-700 font-semibold">{task.upvotes}</span>
            </button>
          </div>
        </div>

        <p 
          className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
          onClick={() => onTaskClick(task)}
        >
          {task.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {task.skillTags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300 transform group-hover:scale-105"
            >
              {tag}
            </span>
          ))}
          {task.skillTags.length > 3 && (
            <span className="px-4 py-2 bg-gray-50 text-gray-500 text-xs rounded-full font-medium group-hover:bg-gray-100 transition-all duration-300">
              +{task.skillTags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 group-hover:text-gray-700 transition-colors duration-300">
              <Calendar className="w-4 h-4" />
              <span className={`${isDeadlineSoon() ? 'text-red-600 font-semibold' : ''}`}>
                {new Date(task.deadline).toLocaleDateString()}
              </span>
              {isDeadlineSoon() && (
                <Clock className="w-4 h-4 text-red-500 ml-1 animate-pulse" />
              )}
            </div>
            <div className="flex items-center space-x-2 group-hover:text-gray-700 transition-colors duration-300">
              <Users className="w-4 h-4" />
              <span className="font-medium">{task.submissions.length} submissions</span>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${getDifficultyColor(task.difficulty)}`}>
            {task.difficulty}
          </span>
        </div>

        <div className="pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300" />
            <span className="text-xs text-gray-500 line-clamp-1 group-hover:text-gray-700 transition-colors duration-300 font-medium">{task.expectedOutcome}</span>
          </div>
        </div>
      </div>
    </div>
  );
}