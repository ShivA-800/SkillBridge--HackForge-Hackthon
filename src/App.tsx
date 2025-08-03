import { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Task, Submission, FilterType, Message } from './types';
import { mockTasks } from './utils/mockData';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import PostTaskForm from './components/PostTaskForm';
import TaskFilters from './components/TaskFilters';
import Leaderboard from './components/Leaderboard';
import AboutPage from './components/AboutPage';
import AIChat from './components/AIChat';
import Footer from './components/Footer';
import MessageModal from './components/MessageModal';
import MessagesPage from './components/MessagesPage';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useLocalStorage<Task[]>('skillbridge-tasks', mockTasks);
  const [messages, setMessages] = useLocalStorage<Message[]>('skillbridge-messages', []);
  const [selectedTaskForMessage, setSelectedTaskForMessage] = useState<Task | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterType>({
    skillTag: '',
    difficulty: '',
    search: ''
  });

  // Generate unique IDs
  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

  // Filter tasks based on current filters with enhanced search
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = !filters.search || 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower) ||
        task.mentorName.toLowerCase().includes(searchLower) ||
        task.expectedOutcome.toLowerCase().includes(searchLower) ||
        task.skillTags.some(tag => tag.toLowerCase().includes(searchLower));
      
      const matchesSkill = !filters.skillTag || task.skillTags.includes(filters.skillTag);
      const matchesDifficulty = !filters.difficulty || task.difficulty === filters.difficulty;
      
      return matchesSearch && matchesSkill && matchesDifficulty;
    });
  }, [tasks, filters]);

  // Get available skills for filter dropdown
  const availableSkills = useMemo(() => {
    const allSkills = tasks.flatMap(task => task.skillTags);
    return Array.from(new Set(allSkills)).sort();
  }, [tasks]);

  // Calculate total submissions
  const totalSubmissions = useMemo(() => {
    return tasks.reduce((sum, task) => sum + task.submissions.length, 0);
  }, [tasks]);

  // Calculate unread messages count
  const unreadMessagesCount = useMemo(() => {
    return messages.filter(msg => msg.status === 'unread').length;
  }, [messages]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleMessageOwner = (task: Task) => {
    setSelectedTaskForMessage(task);
    setIsMessageModalOpen(true);
  };

  const handleUpvote = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, upvotes: task.upvotes + 1 }
          : task
      )
    );
  };

  const handleSubmitSolution = (submission: Omit<Submission, 'id' | 'submittedAt'>) => {
    const newSubmission: Submission = {
      ...submission,
      id: generateId(),
      submittedAt: new Date().toISOString()
    };

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === submission.taskId
          ? { ...task, submissions: [...task.submissions, newSubmission] }
          : task
      )
    );
  };

  const handlePostTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'upvotes' | 'submissions'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      upvotes: 0,
      submissions: []
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
    setCurrentView('explore');
  };

  const handleSendMessage = (messageData: Omit<Message, 'id' | 'timestamp' | 'status'>) => {
    const newMessage: Message = {
      ...messageData,
      id: generateId(),
      timestamp: new Date().toISOString(),
      status: 'unread'
    };

    setMessages(prevMessages => [newMessage, ...prevMessages]);
  };

  const handleMarkAsRead = (messageId: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId
          ? { ...msg, status: 'read' as const }
          : msg
      )
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomePage
            onViewChange={setCurrentView}
            taskCount={tasks.length}
            submissionCount={totalSubmissions}
          />
        );
      
      case 'post-task':
        return <PostTaskForm onSubmit={handlePostTask} />;
      
      case 'explore':
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Tasks</h1>
              <p className="text-gray-600">Discover real-world projects and start building your skills</p>
            </div>
            
            <TaskFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableSkills={availableSkills}
              taskCount={filteredTasks.length}
            />
            
            {filteredTasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTasks.map((task, index) => (
                  <div 
                    key={task.id}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TaskCard
                      task={task}
                      onTaskClick={handleTaskClick}
                      onUpvote={handleUpvote}
                      onMessageOwner={handleMessageOwner}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks found</h3>
                <p className="text-gray-600 mb-6">
                  {filters.search || filters.skillTag || filters.difficulty
                    ? 'Try adjusting your filters to find more tasks'
                    : 'Be the first to post a task for students to work on!'
                  }
                </p>
                {!filters.search && !filters.skillTag && !filters.difficulty && (
                  <button
                    onClick={() => setCurrentView('post-task')}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200"
                  >
                    Post Your First Task
                  </button>
                )}
              </div>
            )}
          </div>
        );
      
      case 'about':
        return <AboutPage onViewChange={setCurrentView} />;
      
      case 'messages':
        return <MessagesPage messages={messages} onMarkAsRead={handleMarkAsRead} />;
      
      default:
        return <Leaderboard tasks={tasks} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        unreadMessagesCount={unreadMessagesCount}
      />
      
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={handleSubmitSolution}
        onUpvote={handleUpvote}
      />

      <MessageModal
        task={selectedTaskForMessage}
        isOpen={isMessageModalOpen}
        onClose={() => {
          setIsMessageModalOpen(false);
          setSelectedTaskForMessage(null);
        }}
        onSendMessage={handleSendMessage}
      />
      
      {/* Global AI Chat Assistant */}
      <AIChat />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;