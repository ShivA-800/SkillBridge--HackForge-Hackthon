import React, { useState } from 'react';
import { X, MessageCircle, Send, User, Mail } from 'lucide-react';
import { Task, Message } from '../types';

interface MessageModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'status'>) => void;
}

export default function MessageModal({ task, isOpen, onClose, onSendMessage }: MessageModalProps) {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen || !task) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentEmail.trim() || !messageText.trim()) return;

    setIsSending(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    onSendMessage({
      taskId: task.id,
      taskTitle: task.title,
      from: studentName.trim(),
      fromEmail: studentEmail.trim(),
      to: task.mentorName,
      toEmail: task.mentorEmail,
      message: messageText.trim()
    });

    // Reset form
    setStudentName('');
    setStudentEmail('');
    setMessageText('');
    setIsSending(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Message Project Owner</h2>
              <p className="text-sm text-gray-500">Send a message to {task.mentorName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Project Info */}
        <div className="p-6 bg-gray-50 border-b border-gray-100">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-1">Project: {task.title}</h3>
            <p className="text-sm text-gray-600">by {task.mentorName}</p>
          </div>
        </div>

        {/* Message Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Your Name *</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Your Email *</span>
                  </div>
                </label>
                <input
                  type="email"
                  id="studentEmail"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="messageText" className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Your Message *</span>
                </div>
              </label>
              <textarea
                id="messageText"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Hi! I have a question about this project. Could you help me with..."
                required
                minLength={10}
                maxLength={1000}
              />
              <div className="flex justify-between mt-2">
                <p className="text-xs text-gray-500">Minimum 10 characters</p>
                <p className="text-xs text-gray-500">{messageText.length}/1000</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending || !studentName.trim() || !studentEmail.trim() || !messageText.trim() || messageText.length < 10}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isSending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
