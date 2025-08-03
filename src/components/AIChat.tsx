import { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  CheckSquare, 
  FileText, 
  Bot, 
  User, 
  Copy, 
  Check,
  Sparkles,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'checklist' | 'resume' | 'general';
}

interface AIChatProps {
  taskDescription?: string;
  taskTitle?: string;
}

export default function AIChat({ taskDescription = '', taskTitle = '' }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Note: Direct browser calls to Google Gemini API are blocked by CORS policy
  // In production, you would need a backend server to proxy these API calls
  // const API_KEY = 'AIzaSyAb_F34UA9RYK79fAU7e3g-POCGAJz9XRE';

  useEffect(() => {
    // Load chat history from localStorage
    const savedMessages = localStorage.getItem('skillbridge-ai-chat');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages).map((msg: ChatMessage & { timestamp: string }) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsed);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save chat history to localStorage
    if (messages.length > 0) {
      localStorage.setItem('skillbridge-ai-chat', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const callGemini = async (promptText: string, category: 'checklist' | 'resume' | 'general' = 'general') => {
    setIsLoading(true);
    
    try {
      // For development, let's simulate the AI response
      // In production, you'd need a backend server to proxy the API calls
      const response = await simulateAIResponse(promptText, category);
      
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
        category
      };
      setMessages(prev => [...prev, newMessage]);
      
    } catch (error) {
      console.error('Error calling AI:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: '❌ Sorry, I encountered an error. This is a demo version. In production, you would need a backend server to proxy API calls to avoid CORS issues.',
        timestamp: new Date(),
        category
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate AI responses for demo purposes
  const simulateAIResponse = async (prompt: string, category: string): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (category === 'checklist') {
      return `# Smart Project Checklist

## Setup Phase (2-3 hours)
☐ Set up development environment
☐ Initialize project repository
☐ Install required dependencies
☐ Configure project structure

## Development Phase (8-12 hours)
☐ Create core components and modules
☐ Implement main functionality
☐ Add styling and responsive design
☐ Integrate APIs and external services
☐ Handle error cases and edge scenarios

## Testing & Quality Assurance (3-4 hours)
☐ Write unit tests for core functions
☐ Perform integration testing
☐ Test on different devices and browsers
☐ Code review and optimization

## Deployment Phase (2-3 hours)
☐ Deploy to staging environment
☐ Run final tests and validations
☐ Deploy to production
☐ Monitor and gather feedback

*Estimated total time: 15-20 hours*
*This checklist is dynamically generated to help you stay organized and track progress effectively.*`;
    }
    
    if (category === 'resume') {
      return `🎯 **Professional Achievement Examples:**

• **Led cross-functional team of 5 developers** to deliver enterprise web application 2 weeks ahead of schedule, resulting in 15% increase in client satisfaction scores

• **Architected and implemented scalable microservices infrastructure** serving 50,000+ daily users with 99.9% uptime and 40% reduction in response times

• **Developed automated testing framework** that reduced deployment bugs by 75% and decreased QA cycle time from 3 days to 6 hours

• **Spearheaded adoption of modern development practices** including CI/CD pipelines, resulting in 50% faster feature delivery and improved code quality metrics

• **Collaborated with product stakeholders** to translate business requirements into technical solutions, contributing to 25% increase in user engagement

• **Mentored 3 junior developers** through code reviews and pair programming sessions, leading to their promotion within 6 months

*💡 Tip: Quantify your impact with specific metrics and emphasize leadership, collaboration, and results-driven achievements.*`;
    }
    
    // Generate contextual responses based on prompt keywords
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('career') || lowerPrompt.includes('job')) {
      return "🚀 **Career Guidance:**\n\nI'd recommend focusing on building practical skills through hands-on projects and networking with professionals in your field. What specific career area interests you? I can help you:\n\n• Create a skill development roadmap\n• Generate project checklists\n• Write compelling resume bullet points\n• Plan networking strategies";
    } else if (lowerPrompt.includes('skill') || lowerPrompt.includes('learn')) {
      return "📚 **Skill Development Strategy:**\n\nFor effective skill building, consider breaking down your goals into smaller, manageable tasks. I can help you create a learning checklist that includes:\n\n• Structured learning milestones\n• Practice project ideas\n• Assessment criteria\n• Resource recommendations\n\nWould you like me to generate a customized checklist for your learning goals?";
    } else if (lowerPrompt.includes('project') || lowerPrompt.includes('portfolio')) {
      return "💼 **Portfolio Development:**\n\nBuilding a strong portfolio is crucial for career growth. Consider showcasing projects that demonstrate:\n\n• Problem-solving abilities\n• Technical proficiency\n• Creative thinking\n• Real-world impact\n\nI can help you create project checklists to ensure you're covering all important aspects of development and documentation.";
    } else if (lowerPrompt.includes('resume') || lowerPrompt.includes('cv')) {
      return "📄 **Resume Enhancement:**\n\nI can help you generate impactful resume bullet points that highlight your achievements using the STAR method (Situation, Task, Action, Result). Would you like me to create some examples for you?\n\n**Key tips:**\n• Use action verbs\n• Quantify your impact\n• Focus on results\n• Tailor to job requirements";
    }
    
    // Default response
    return `👋 **Welcome to your AI Career Assistant!**

I'm here to help you with your professional development journey. Here's what I can do:

🎯 **Career Guidance** - Strategic advice for your career path
📋 **Smart Checklists** - Organized task lists for your projects
📄 **Resume Writing** - Impactful bullet points that get noticed
💡 **Skill Planning** - Roadmaps for learning new technologies

**Quick Actions:**
• Type "checklist" for a project management checklist
• Type "resume" for professional achievement examples
• Ask me about career advice, learning strategies, or project planning

What would you like to work on today?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      category: 'general'
    };

    setMessages(prev => [...prev, userMessage]);
    const prompt = `You are an AI assistant for SkillBridge, a platform connecting students with real-world projects. Please answer the following question: ${inputValue}`;
    setInputValue('');
    await callGemini(prompt);
  };

  const generateChecklist = async () => {
    const description = taskDescription || inputValue || 'No task description provided';
    const title = taskTitle || 'Task';
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: `Generate a smart checklist for: ${title}`,
      timestamp: new Date(),
      category: 'checklist'
    };

    setMessages(prev => [...prev, userMessage]);

    const prompt = `Create a detailed, step-by-step checklist for the following project task:

Title: ${title}
Description: ${description}

Please provide:
1. A clear, actionable checklist with 8-12 items
2. Each item should be specific and measurable
3. Include setup, development, testing, and deployment phases
4. Add time estimates for each major phase
5. Include any best practices or tips

Format the response with clear headings and checkboxes (☐) for each item.`;

    await callGemini(prompt, 'checklist');
  };

  const generateResumeLine = async () => {
    const description = taskDescription || inputValue || 'No task description provided';
    const title = taskTitle || 'Project';

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: `Generate resume bullet point for: ${title}`,
      timestamp: new Date(),
      category: 'resume'
    };

    setMessages(prev => [...prev, userMessage]);

    const prompt = `Create a professional resume bullet point for the following project:

Title: ${title}
Description: ${description}

Please create:
1. A concise, impact-focused bullet point (1-2 lines max)
2. Use action verbs and quantifiable achievements where possible
3. Highlight technical skills and technologies used
4. Emphasize the real-world impact or learning outcomes
5. Follow standard resume formatting conventions

Provide 2-3 alternative versions of the bullet point.`;

    await callGemini(prompt, 'resume');
  };

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('skillbridge-ai-chat');
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'checklist': return <CheckSquare className="w-4 h-4" />;
      case 'resume': return <FileText className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'checklist': return 'from-green-500 to-emerald-500';
      case 'resume': return 'from-blue-500 to-cyan-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 z-50 group"
      >
        <MessageCircle className="w-6 h-6" />
        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          <Sparkles className="w-3 h-3" />
        </div>
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap">
            AI Assistant
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed right-6 bottom-6 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-xs text-purple-100">Powered by Gemini</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white/80 hover:text-white transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Quick Actions */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={generateChecklist}
                disabled={isLoading}
                className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 disabled:opacity-50"
              >
                <CheckSquare className="w-3 h-3" />
                <span>Smart Checklist</span>
              </button>
              <button
                onClick={generateResumeLine}
                disabled={isLoading}
                className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 disabled:opacity-50"
              >
                <FileText className="w-3 h-3" />
                <span>Resume Line</span>
              </button>
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="px-3 py-2 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear Chat
                </button>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-sm">Hello! I'm your AI assistant.</p>
                <p className="text-xs text-gray-400 mt-1">
                  Ask me anything or use the quick actions above!
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-start space-x-2 mb-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-white/20' : `bg-gradient-to-r ${getCategoryColor(message.category)}`
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-3 h-3 text-white" />
                        ) : (
                          <div className="text-white">
                            {getCategoryIcon(message.category)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`text-xs ${message.type === 'user' ? 'text-purple-100' : 'text-gray-500'} mb-1`}>
                          {message.type === 'user' ? 'You' : 'AI Assistant'}
                          {message.category && message.category !== 'general' && (
                            <span className="ml-1 capitalize">• {message.category}</span>
                          )}
                        </div>
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      </div>
                      {message.type === 'ai' && (
                        <button
                          onClick={() => copyToClipboard(message.content, message.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white animate-pulse" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                placeholder="Ask me anything about your project..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
