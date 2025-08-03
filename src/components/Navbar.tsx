import { Code, Users, BookOpen, Info, MessageCircle } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  unreadMessagesCount?: number;
}

export default function Navbar({ currentView, onViewChange, unreadMessagesCount = 0 }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Code },
    { id: 'post-task', label: 'Post a Task', icon: BookOpen },
    { id: 'explore', label: 'Explore Tasks', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageCircle, badge: unreadMessagesCount },
    { id: 'about', label: 'About', icon: Info }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                SkillBridge
              </h1>
              <p className="text-xs text-gray-500">Industry-Guided Learning</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 relative ${
                    currentView === item.id
                      ? 'bg-emerald-50 text-emerald-700 font-medium'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="md:hidden">
            <button className="text-gray-600 hover:text-emerald-600">
              <Users className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-100">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg relative ${
                  currentView === item.id
                    ? 'text-emerald-700'
                    : 'text-gray-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}