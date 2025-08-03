import React from 'react';
import { Trophy, Medal, Award, Users, ThumbsUp, Target } from 'lucide-react';
import { Task, User } from '../types';

interface LeaderboardProps {
  tasks: Task[];
}

export default function Leaderboard({ tasks }: LeaderboardProps) {
  // Calculate mentor statistics
  const mentorStats = tasks.reduce((acc, task) => {
    const mentor = task.mentorName;
    if (!acc[mentor]) {
      acc[mentor] = {
        name: mentor,
        email: task.mentorEmail,
        role: 'mentor' as const,
        tasksPosted: 0,
        totalUpvotes: 0,
        tasksCompleted: 0
      };
    }
    acc[mentor].tasksPosted += 1;
    acc[mentor].totalUpvotes += task.upvotes;
    acc[mentor].tasksCompleted += task.submissions.length;
    return acc;
  }, {} as Record<string, User>);

  // Calculate student statistics
  const studentStats = tasks.reduce((acc, task) => {
    task.submissions.forEach(submission => {
      const student = submission.studentName;
      if (!acc[student]) {
        acc[student] = {
          name: student,
          email: submission.studentEmail,
          role: 'student' as const,
          tasksCompleted: 0,
          totalUpvotes: 0
        };
      }
      acc[student].tasksCompleted += 1;
    });
    return acc;
  }, {} as Record<string, User>);

  const topMentors = Object.values(mentorStats)
    .sort((a, b) => (b.totalUpvotes || 0) - (a.totalUpvotes || 0))
    .slice(0, 5);

  const topStudents = Object.values(studentStats)
    .sort((a, b) => (b.tasksCompleted || 0) - (a.tasksCompleted || 0))
    .slice(0, 5);

  const mostPopularTasks = [...tasks]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 3);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">{index + 1}</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
            <p className="text-gray-600">Top contributors and popular tasks</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Top Mentors */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Top Mentors</h2>
          </div>
          
          <div className="space-y-4">
            {topMentors.length > 0 ? (
              topMentors.map((mentor, index) => (
                <div key={mentor.name} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                  <div className="flex-shrink-0">
                    {getRankIcon(index)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{mentor.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Target className="w-3 h-3" />
                        <span>{mentor.tasksPosted} tasks</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{mentor.totalUpvotes} upvotes</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No mentors yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Students */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Top Students</h2>
          </div>
          
          <div className="space-y-4">
            {topStudents.length > 0 ? (
              topStudents.map((student, index) => (
                <div key={student.name} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex-shrink-0">
                    {getRankIcon(index)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{student.name}</h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Target className="w-3 h-3" />
                      <span>{student.tasksCompleted} tasks completed</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No submissions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Most Popular Tasks */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
            <ThumbsUp className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Most Popular Tasks</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mostPopularTasks.length > 0 ? (
            mostPopularTasks.map((task, index) => (
              <div key={task.id} className="relative p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                <div className="absolute top-4 right-4">
                  {getRankIcon(index)}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 pr-8 line-clamp-2">{task.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-pink-700">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{task.upvotes} upvotes</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{task.submissions.length}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              <ThumbsUp className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No tasks available yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}