import { ArrowRight, Users, Target, Award, Code, Lightbulb, Rocket } from 'lucide-react';

interface HomePageProps {
  onViewChange: (view: string) => void;
  taskCount: number;
  submissionCount: number;
}

export default function HomePage({ onViewChange, taskCount, submissionCount }: HomePageProps) {
  const features = [
    {
      icon: Target,
      title: 'Real-World Projects',
      description: 'Work on industry-relevant tasks posted by experienced mentors',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      description: 'Learn from professionals working in top tech companies',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      title: 'Skill Recognition',
      description: 'Build your portfolio with verified project completions',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Code,
      title: 'Diverse Technologies',
      description: 'Explore AI, Web Dev, ML, Cybersecurity, and more',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    {
      label: 'Active Tasks',
      value: taskCount,
      icon: Target,
      color: 'text-blue-600'
    },
    {
      label: 'Student Submissions',
      value: submissionCount,
      icon: Users,
      color: 'text-green-600'
    },
    {
      label: 'Skill Categories',
      value: '15+',
      icon: Code,
      color: 'text-purple-600'
    },
    {
      label: 'Success Rate',
      value: '94%',
      icon: Award,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <Code className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Bridge the Gap Between
                <span className="block bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  Learning & Industry
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Connect with industry professionals, work on real-world projects, and build skills that matter. 
                SkillBridge transforms theoretical knowledge into practical expertise.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => onViewChange('explore')}
                  className="group bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Explore Tasks</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                
                <button
                  onClick={() => alert('🚫 Access Denied! This feature is currently restricted to verified mentors only. Please contact support for mentor verification.')}
                  className="group bg-red-50 text-red-600 px-8 py-4 rounded-xl font-semibold border-2 border-red-200 hover:border-red-400 hover:bg-red-100 transition-all duration-200 flex items-center justify-center space-x-2 cursor-not-allowed"
                >
                  <Lightbulb className="w-5 h-5" />
                  <span>Access Denied</span>
                </button>
              </div>
            </div>

            {/* Right Column - 3D Spline Embed */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-3xl p-8 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-3xl"></div>
                
                {/* Visual Content Area */}
                <div className="relative z-10 w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-100 border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎓</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Learn. Build. Grow.</h3>
                    <p className="text-gray-600">Connect with industry experts</p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-80 animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60 animate-pulse"></div>
                
                {/* Tech Icons Floating */}
                <div className="absolute top-8 -left-6 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>
                  💻
                </div>
                <div className="absolute bottom-12 -right-6 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-2xl animate-bounce" style={{animationDelay: '1s'}}>
                  🚀
                </div>
                <div className="absolute top-1/2 -right-8 w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center text-xl animate-pulse">
                  ⭐
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/50 backdrop-blur-sm border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose SkillBridge?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We connect passionate learners with industry experts to create meaningful learning experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <Rocket className="w-16 h-16 text-white/80" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students and professionals already building the future together
            </p>
            <button
              onClick={() => onViewChange('explore')}
              className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}