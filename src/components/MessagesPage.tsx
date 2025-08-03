import { useState } from 'react';
import { MessageCircle, User, Clock, Mail, Eye, EyeOff, Reply } from 'lucide-react';
import { Message } from '../types';

interface MessagesPageProps {
  messages: Message[];
  onMarkAsRead: (messageId: string) => void;
}

export default function MessagesPage({ messages, onMarkAsRead }: MessagesPageProps) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredMessages = messages.filter(message => {
    if (filter === 'all') return true;
    return message.status === filter;
  });

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'read':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'replied':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600">Manage messages from students about your projects</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
                <p className="text-sm text-gray-600">Total Messages</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <EyeOff className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                <p className="text-sm text-gray-600">Unread Messages</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Reply className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {messages.filter(m => m.status === 'replied').length}
                </p>
                <p className="text-sm text-gray-600">Replied</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Messages
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              filter === 'unread'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filter === 'read'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Read
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`bg-white rounded-xl border p-6 transition-all duration-200 hover:shadow-lg ${
                message.status === 'unread' ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{message.from}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3" />
                        <span>{message.fromEmail}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(message.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(message.status)}`}>
                    {message.status}
                  </span>
                  {message.status === 'unread' && (
                    <button
                      onClick={() => onMarkAsRead(message.id)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                      title="Mark as read"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-sm font-medium text-gray-700">
                    Project: <span className="text-blue-600">{message.taskTitle}</span>
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">{message.message}</p>
              </div>

              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200">
                  <Reply className="w-4 h-4" />
                  <span>Reply</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'unread' ? 'No unread messages' : 
               filter === 'read' ? 'No read messages' : 'No messages yet'}
            </h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'Messages from students will appear here when they contact you about your projects.'
                : `Switch to "All Messages" to see ${filter === 'unread' ? 'read' : 'unread'} messages.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
