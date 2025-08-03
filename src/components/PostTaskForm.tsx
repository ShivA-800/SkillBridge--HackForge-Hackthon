import { useState } from 'react';
import { Plus, Calendar, Users, Tag, Target, FileText, User, Eye } from 'lucide-react';
import { Task } from '../types';

interface PostTaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'upvotes' | 'submissions'>) => void;
}

const skillOptions = [
  'AI', 'Machine Learning', 'Web Development', 'Mobile Development', 
  'Cybersecurity', 'Data Science', 'DevOps', 'Cloud Computing',
  'Blockchain', 'IoT', 'Game Development', 'UI/UX Design',
  'React', 'Node.js', 'Python', 'Java', 'C++', 'JavaScript'
];

const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced'] as const;

export default function PostTaskForm({ onSubmit }: PostTaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skillTags: [] as string[],
    deadline: '',
    difficulty: 'Beginner' as const,
    expectedOutcome: '',
    mentorName: '',
    mentorEmail: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillTags: prev.skillTags.includes(skill)
        ? prev.skillTags.filter(s => s !== skill)
        : [...prev.skillTags, skill]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || formData.skillTags.length === 0) {
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    onSubmit(formData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      skillTags: [],
      deadline: '',
      difficulty: 'Beginner',
      expectedOutcome: '',
      mentorName: '',
      mentorEmail: ''
    });
    setIsSubmitting(false);
    setShowPreview(false);
    setIsFormVisible(true);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
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

  const isFormValid = formData.title.trim() && formData.description.trim() && formData.skillTags.length > 0 && formData.mentorName.trim() && formData.mentorEmail.trim();

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Form Toggle Button */}
      <div className="mb-4">
        <button
          onClick={toggleFormVisibility}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200"
        >
          <Plus className={`w-4 h-4 transition-transform duration-200 ${isFormVisible ? 'rotate-45' : ''}`} />
          <span>{isFormVisible ? 'Hide Form' : 'Show Form'}</span>
        </button>
      </div>

      {/* Main Form Container with slide animation */}
      <div className={`transition-all duration-500 ease-in-out ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Post a New Task</h1>
                  <p className="text-emerald-100">Share a real-world project with students</p>
                </div>
              </div>
              
              {/* Preview Toggle Button */}
              {isFormValid && (
                <button
                  onClick={togglePreview}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="mentorName" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Your Name *</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="mentorName"
                  value={formData.mentorName}
                  onChange={(e) => setFormData(prev => ({ ...prev, mentorName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="mentorEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Email Address *</span>
                  </div>
                </label>
                <input
                  type="email"
                  id="mentorEmail"
                  value={formData.mentorEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, mentorEmail: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="your.email@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Task Title *</span>
                </div>
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Build a Smart To-Do App with AI Categorization"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Description *</span>
                </div>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Provide a detailed description of the task, what students will learn, and any specific requirements..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <span>Skill Tags * (Select at least one)</span>
                </div>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                      formData.skillTags.includes(skill)
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              {formData.skillTags.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Selected: {formData.skillTags.join(', ')}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Deadline *</span>
                  </div>
                </label>
                <input
                  type="date"
                  id="deadline"
                  value={formData.deadline}
                  min={minDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>Difficulty Level *</span>
                  </div>
                </label>
                <select
                  id="difficulty"
                  value={formData.difficulty}
                  onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as typeof formData.difficulty }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  {difficultyOptions.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="expectedOutcome" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>Expected Outcome *</span>
                </div>
              </label>
              <input
                type="text"
                id="expectedOutcome"
                value={formData.expectedOutcome}
                onChange={(e) => setFormData(prev => ({ ...prev, expectedOutcome: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., GitHub repository with working application and documentation"
                required
              />
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Publishing Task...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Publish Task</span>
                    </>
                  )}
                </button>

                {isFormValid && (
                  <button
                    type="button"
                    onClick={togglePreview}
                    className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Preview</span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && isFormValid && (
        <div className="mt-6 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Task Preview</span>
              </h2>
            </div>
            
            <div className="p-6">
              {/* Preview Task Card */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{formData.title}</h3>
                    <p className="text-sm text-gray-500 font-medium">by {formData.mentorName}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-xs font-semibold border ${getDifficultyColor(formData.difficulty)}`}>
                    {formData.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{formData.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {formData.skillTags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formData.deadline ? new Date(formData.deadline).toLocaleDateString() : 'No deadline set'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>0 submissions</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">{formData.expectedOutcome}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}