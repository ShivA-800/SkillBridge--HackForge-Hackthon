import { Heart, Github, Linkedin, Mail, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                SkillBridge
              </h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Connecting passionate learners with industry experts to create meaningful learning experiences. 
              Bridge the gap between theoretical knowledge and practical expertise.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by</span>
              <span className="font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Shivakumar Radharapu
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#explore" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Explore Tasks
                </a>
              </li>
              <li>
                <a href="#post-task" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Post a Task
                </a>
              </li>
              <li>
                <a href="#leaderboard" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Leaderboard
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">Connect</h4>
            <div className="space-y-3">
              <a 
                href="https://github.com/shivakumar-radharapu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a 
                href="https://linkedin.com/in/shivakumar-radharapu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="mailto:shivakumar.radharapu@gmail.com"
                className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 SkillBridge. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Support</span>
            </div>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-200">
                  Crafted with passion by
                </span>
                <Heart className="w-5 h-5 text-red-500 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                Shivakumar Radharapu
              </h3>
              <p className="text-gray-400 text-sm">
                Full Stack Developer • AI Enthusiast • Student Mentor
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
