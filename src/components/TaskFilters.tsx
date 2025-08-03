import { Search, Filter, X } from 'lucide-react';
import { FilterType } from '../types';

interface TaskFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  availableSkills: string[];
  taskCount: number;
}

export default function TaskFilters({ filters, onFiltersChange, availableSkills, taskCount }: TaskFiltersProps) {
  const difficultyOptions = ['', 'Beginner', 'Intermediate', 'Advanced'];
  
  const clearFilters = () => {
    onFiltersChange({ skillTag: '', difficulty: '', search: '' });
  };

  const hasActiveFilters = filters.skillTag || filters.difficulty || filters.search;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Filter Tasks</h3>
            <p className="text-sm text-gray-500">
              {taskCount} {taskCount === 1 ? 'task' : 'tasks'} found
            </p>
          </div>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200 font-medium"
          >
            <X className="w-4 h-4" />
            <span>Clear all filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-3">
            🔍 Real-time Search
          </label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-200" />
            <input
              type="text"
              id="search"
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
              placeholder="Search tasks by title, description, or mentor..."
            />
            {filters.search && (
              <button
                onClick={() => onFiltersChange({ ...filters, search: '' })}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="skillTag" className="block text-sm font-semibold text-gray-700 mb-3">
            🏷️ Skill Domain
          </label>
          <select
            id="skillTag"
            value={filters.skillTag}
            onChange={(e) => onFiltersChange({ ...filters, skillTag: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
          >
            <option value="">All Technologies</option>
            {availableSkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-700 mb-3">
            📊 Difficulty Level
          </label>
          <select
            id="difficulty"
            value={filters.difficulty}
            onChange={(e) => onFiltersChange({ ...filters, difficulty: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
          >
            <option value="">All Levels</option>
            {difficultyOptions.slice(1).map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-semibold text-gray-700">Active Filters:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.search && (
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-sm rounded-full font-medium shadow-sm">
                🔍 "{filters.search}"
                <button
                  onClick={() => onFiltersChange({ ...filters, search: '' })}
                  className="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.skillTag && (
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm rounded-full font-medium shadow-sm">
                🏷️ {filters.skillTag}
                <button
                  onClick={() => onFiltersChange({ ...filters, skillTag: '' })}
                  className="ml-2 text-green-600 hover:text-green-800 transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.difficulty && (
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 text-sm rounded-full font-medium shadow-sm">
                📊 {filters.difficulty}
                <button
                  onClick={() => onFiltersChange({ ...filters, difficulty: '' })}
                  className="ml-2 text-purple-600 hover:text-purple-800 transition-colors duration-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}