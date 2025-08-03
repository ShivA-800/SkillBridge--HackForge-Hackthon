import React from 'react';
import { Users, Target, Heart, Lightbulb, Code, Award, ArrowRight, Mail } from 'lucide-react';

interface AboutPageProps {
  onViewChange: (view: string) => void;
}

export default function AboutPage({ onViewChange }: AboutPageProps) {
  const values = [
    {
      icon: Heart,
      title: 'Community First',
      description: 'We believe learning happens best in supportive, collaborative environments where everyone can thrive.'
    },
    {
      icon: Target,
      title: 'Real Impact',
      description: 'Every project on our platform is designed to solve real problems and create meaningful change.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We encourage creative thinking and cutting-edge solutions to push the boundaries of technology.'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'Platform Architect',
      expertise: 'Full-Stack Development, AI Systems',
      bio: 'Former Google engineer with 8+ years building scalable platforms'
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'Learning Experience Designer',
      expertise: 'Educational Technology, Cybersecurity',
      bio: 'PhD in Computer Science, passionate about hands-on learning'
    },
    {
      name: 'Emily Johnson',
      role: 'Community Manager',
      expertise: 'Community Building, Student Success',
      bio: 'Dedicated to creating inclusive learning environments'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SkillBridge
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to bridge the gap between academic learning and industry demands, 
            creating a platform where students can gain real-world experience through meaningful projects.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Traditional education often leaves a gap between what students learn and what the industry needs. 
                SkillBridge was created to solve this problem by connecting passionate learners with experienced 
                professionals who provide real-world projects and mentorship.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We believe that the best way to learn is by doing, and the best way to teach is by sharing 
                real challenges from the industry. Our platform facilitates these connections, creating 
                value for both students and mentors.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                <Target className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Practical Learning</h3>
                <p className="text-sm text-gray-600">Real projects from industry professionals</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <Users className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Mentorship</h3>
                <p className="text-sm text-gray-600">Direct guidance from experienced experts</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                <Code className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Skill Building</h3>
                <p className="text-sm text-gray-600">Hands-on experience with modern technologies</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
                <Award className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Portfolio</h3>
                <p className="text-sm text-gray-600">Build impressive projects for your resume</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 h-full">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate educators and technologists working to transform learning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-500 mb-4">{member.expertise}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Whether you're a student looking to gain real-world experience or a professional 
            wanting to mentor the next generation, there's a place for you here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onViewChange('explore')}
              className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Explore Tasks</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => onViewChange('post-task')}
              className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold border-2 border-white/20 hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Become a Mentor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}