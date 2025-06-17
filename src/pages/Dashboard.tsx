import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Trophy, 
  Users, 
  Code2, 
  TrendingUp,
  Calendar,
  Star,
  Target,
  Award,
  Activity
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const activityData = [
    { day: 'Mon', commits: 4, challenges: 2 },
    { day: 'Tue', commits: 6, challenges: 3 },
    { day: 'Wed', commits: 3, challenges: 1 },
    { day: 'Thu', commits: 8, challenges: 4 },
    { day: 'Fri', commits: 5, challenges: 2 },
    { day: 'Sat', commits: 7, challenges: 3 },
    { day: 'Sun', commits: 2, challenges: 1 }
  ];

  const progressData = [
    { month: 'Jan', progress: 20 },
    { month: 'Feb', progress: 35 },
    { month: 'Mar', progress: 45 },
    { month: 'Apr', progress: 60 },
    { month: 'May', progress: 75 },
    { month: 'Jun', progress: 85 }
  ];

  const recentProjects = [
    { name: 'E-commerce Dashboard', tech: 'React, TypeScript', status: 'In Progress', progress: 75 },
    { name: 'Weather App', tech: 'Vue.js, TailwindCSS', status: 'Completed', progress: 100 },
    { name: 'Task Manager API', tech: 'Node.js, MongoDB', status: 'In Progress', progress: 60 }
  ];

  const upcomingChallenges = [
    { title: 'Array Manipulation', difficulty: 'Medium', timeLeft: '2 hours' },
    { title: 'Binary Tree Traversal', difficulty: 'Hard', timeLeft: '1 day' },
    { title: 'String Algorithms', difficulty: 'Easy', timeLeft: '3 days' }
  ];

  const stats = [
    { label: 'Learning Streak', value: user?.streak || 0, icon: Activity, color: 'from-green-500 to-emerald-500' },
    { label: 'Projects', value: user?.totalProjects || 0, icon: Code2, color: 'from-blue-500 to-cyan-500' },
    { label: 'Challenges', value: user?.totalChallenges || 0, icon: Trophy, color: 'from-purple-500 to-pink-500' },
    { label: 'Connections', value: 127, icon: Users, color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Welcome back, {user?.name}! 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Here's your development journey overview
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10`}></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-gray-300 font-medium">{stat.label}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                Weekly Activity
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="commits" fill="#3B82F6" name="Commits" />
                  <Bar dataKey="challenges" fill="#8B5CF6" name="Challenges" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-400" />
                Learning Progress
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Code2 className="w-5 h-5 mr-2 text-blue-400" />
                  Recent Projects
                </h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <div key={project.name} className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{project.name}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        project.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{project.tech}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Upcoming Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-purple-400" />
                  Upcoming Challenges
                </h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {upcomingChallenges.map((challenge, index) => (
                  <div key={challenge.title} className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{challenge.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        challenge.difficulty === 'Easy' 
                          ? 'bg-green-500/20 text-green-400'
                          : challenge.difficulty === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {challenge.timeLeft}
                      </span>
                      <Button variant="outline" size="sm">
                        Attempt
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-12">
                <BookOpen className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
              <Button variant="outline" className="h-12">
                <Code2 className="w-5 h-5 mr-2" />
                Add Project
              </Button>
              <Button variant="outline" className="h-12">
                <Trophy className="w-5 h-5 mr-2" />
                Take Challenge
              </Button>
              <Button variant="outline" className="h-12">
                <Users className="w-5 h-5 mr-2" />
                Find Developers
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};