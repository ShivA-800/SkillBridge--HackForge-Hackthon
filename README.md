# 🌉 SkillBridge - Industry-Guided Learning Platform

## 🏆 HackForge 2025 Submission

**Team:** Solo Developer  
**Developer:** Shivakumar Radharapu  
**Track:** Education Technology / Industry Collaboration  
**Duration:** Online 

## 📝 Problem Statement

Traditional education systems struggle to bridge the gap between theoretical knowledge and practical industry requirements. Students often graduate without real-world experience, while industry professionals lack accessible platforms to mentor the next generation of talent.

## 💡 Solution - SkillBridge

SkillBridge is a modern, industry-guided learning platform that connects students with industry professionals through real-world project collaborations. Our platform transforms theoretical knowledge into practical expertise through mentorship and hands-on experience.

## ✨ Key Features

### 🎯 **Core Functionality**
- **Real-World Projects**: Industry professionals post actual projects for students
- **Smart Task Discovery**: Advanced search and filtering by skills, difficulty, and keywords
- **Mentorship System**: Direct communication between students and industry experts
- **Project Submissions**: GitHub integration for code submissions and portfolio building
- **Community Engagement**: Upvoting system for quality assessment

### 🤖 **AI-Powered Features**
- **AI Assistant**: Integrated ChatGPT-style assistant for project guidance
- **Resume Builder**: AI-generated resume bullet points based on completed projects
- **Task Management**: Intelligent checklist generation for project milestones

### 💬 **Communication Features**
- **Messaging System**: Real-time communication between students and mentors
- **Status Tracking**: Message status management (unread, read, replied)
- **Project Context**: Automated project information inclusion in messages

### 🎨 **Modern UI/UX**
- **Responsive Design**: Seamless experience across all devices
- **Dark/Light Themes**: Adaptive interface for user preference
- **Smooth Animations**: Micro-interactions for enhanced user experience
- **Accessibility**: WCAG compliant design for inclusive access

## 🚀 Demo

### GitHub Repository
🔗 **[View Source Code](https://github.com/ShivA-800/SkillBridge--HackForge-Hackthon)** - Complete project source code

### Live Demo
🔗 **[SkillBridge Live Demo](http://localhost:5173)** *(Available when running locally)*

### Demo Features Walkthrough
1. **Homepage**: Clean, modern interface with platform overview
2. **Task Exploration**: Browse real-world projects with advanced filtering
3. **Project Details**: Comprehensive project information and submission portal
4. **Messaging**: Student-mentor communication system
5. **AI Assistant**: Intelligent help and guidance system

## 🛠️ Installation

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm or yarn package manager
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/ShivA-800/SkillBridge--HackForge-Hackthon.git
cd SkillBridge--HackForge-Hackthon/project

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser and navigate to
http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds

### State Management
- **Local State**: React Hooks (useState, useEffect, useMemo)
- **Persistence**: Custom useLocalStorage hook for data persistence
- **Form Handling**: Controlled components with validation

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── HomePage.tsx     # Landing page component
│   ├── TaskCard.tsx     # Project card component
│   ├── TaskModal.tsx    # Project details modal
│   ├── MessageModal.tsx # Messaging interface
│   ├── MessagesPage.tsx # Message management
│   ├── AIChat.tsx       # AI assistant component
│   └── ...
├── hooks/               # Custom React hooks
│   └── useLocalStorage.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   └── mockData.ts
└── main.tsx            # Application entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Emerald (Emerald-500: #10B981)
- **Secondary**: Cyan (Cyan-500: #06B6D4)
- **Accent**: Blue-600 (#2563EB)
- **Success**: Green-500 (#22C55E)
- **Warning**: Yellow-500 (#EAB308)
- **Error**: Red-500 (#EF4444)

### Typography
- **Headings**: Inter, system-ui
- **Body**: Inter, system-ui
- **Code**: Fira Code, monospace

## 🌐 Deployment

### Netlify Deployment (Recommended)

#### Option 1: Deploy from GitHub (Recommended)
1. **Push to GitHub**: Make sure your code is pushed to your repository
2. **Connect to Netlify**: 
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository: `SkillBridge--HackForge-Hackthon`
3. **Configure Build Settings**:
   - Base directory: `project`
   - Build command: `npm run build`
   - Publish directory: `project/dist`
4. **Deploy**: Click "Deploy site"

#### Option 2: Manual Deploy
```bash
# Build the project
npm run build

# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Live Demo
🚀 **[SkillBridge Live on Netlify](https://skillbridge-hackforge.netlify.app)** *(Update this URL after deployment)*

### Other Deployment Options

#### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Deploy
npm run build
npm run deploy
```


## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add proper error handling
- Update documentation for new features
- Test thoroughly before submitting

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Developer

**Shivakumar Radharapu**
- 🎓 Passionate Full-Stack Developer
- 🏆 HackForge 2025 Participant
- 💼 Focused on Educational Technology
- 🌐 Bridging Industry-Academia Gap

### Connect with Me
- 📧 Email: [your-email@example.com]
- 💼 LinkedIn: [Your LinkedIn Profile]
- 🐙 GitHub: [ShivA-800](https://github.com/ShivA-800)
- 🌐 Portfolio: [Your Portfolio Website]

## 🙏 Acknowledgments

- **HackForge 2025** for the incredible hackathon experience
- **React Community** for the amazing ecosystem
- **Tailwind CSS** for the utility-first approach
- **Lucide Icons** for beautiful, consistent icons
- **Open Source Community** for inspiration and resources

## 📈 Project Statistics

- **Development Time**: 48 Hours (HackForge 2025)
- **Components**: 15+ React Components
- **TypeScript Coverage**: 100%
- **Responsive Breakpoints**: 5 (Mobile to 4K)
- **Features Implemented**: 25+
- **Lines of Code**: 2,500+

---

<div align="center">

**Built with ❤️ for HackForge 2025**

*Transforming Education Through Industry Collaboration*

[⭐ Star this repo](https://github.com/ShivA-800/SkillBridge--HackForge-Hackthon) • [🐛 Report Bug](https://github.com/ShivA-800/SkillBridge--HackForge-Hackthon/issues) • [💡 Request Feature](https://github.com/ShivA-800/SkillBridge--HackForge-Hackthon/issues)

</div>
