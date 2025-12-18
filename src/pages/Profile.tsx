import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  Activity,
  BookOpen,
  Calendar,
  Code2,
  Edit3,
  Github,
  Linkedin,
  MapPin,
  Save,
  Star,
  Trophy,
  User,
  Users,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    githubUrl: user?.githubUrl || '',
    linkedinUrl: user?.linkedinUrl || '',
    location: 'San Francisco, CA',
    website: 'https://johndeveloper.dev'
  });

  const handleSave = async () => {
    await updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      bio: user?.bio || '',
      githubUrl: user?.githubUrl || '',
      linkedinUrl: user?.linkedinUrl || '',
      location: 'San Francisco, CA',
      website: 'https://johndeveloper.dev'
    });
    setIsEditing(false);
  };

  const achievements = [
    { title: 'First Project', description: 'Shared your first project', icon: Code2, color: 'from-blue-500 to-cyan-500', earned: true },
    { title: 'Problem Solver', description: 'Solved 50 coding challenges', icon: Trophy, color: 'from-yellow-500 to-orange-500', earned: true },
    { title: 'Helpful Member', description: 'Received 100+ upvotes in forum', icon: Star, color: 'from-purple-500 to-pink-500', earned: true },
    { title: 'Learning Streak', description: 'Maintained 30-day learning streak', icon: Activity, color: 'from-green-500 to-emerald-500', earned: false },
    { title: 'Mentor', description: 'Helped 10+ developers', icon: Users, color: 'from-indigo-500 to-purple-500', earned: false },
    { title: 'Knowledge Sharer', description: 'Posted 25+ forum answers', icon: BookOpen, color: 'from-red-500 to-pink-500', earned: false }
  ];

  const recentActivity = [
    { type: 'project', title: 'Shared "AI Task Manager"', time: '2 hours ago', icon: Code2 },
    { type: 'challenge', title: 'Solved "Binary Tree Traversal"', time: '5 hours ago', icon: Trophy },
    { type: 'forum', title: 'Answered "React Optimization"', time: '1 day ago', icon: BookOpen },
    { type: 'learning', title: 'Completed "Advanced TypeScript"', time: '2 days ago', icon: BookOpen },
    { type: 'project', title: 'Updated "Weather App"', time: '3 days ago', icon: Code2 }
  ];

  const stats = [
    { label: 'Projects Shared', value: user?.totalProjects || 0, icon: Code2, color: 'from-blue-500 to-cyan-500' },
    { label: 'Challenges Solved', value: user?.totalChallenges || 0, icon: Trophy, color: 'from-yellow-500 to-orange-500' },
    { label: 'Forum Reputation', value: 1250, icon: Star, color: 'from-purple-500 to-pink-500' },
    { label: 'Learning Streak', value: user?.streak || 0, icon: Activity, color: 'from-green-500 to-emerald-500' }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white"
          >
            Profile Settings
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {isEditing ? (
              <div className="flex space-x-2">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="text-2xl font-bold text-white bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-center w-full mb-2"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
                  )}
                  <p className="text-gray-400">{user.email}</p>
                  <div className="flex items-center justify-center text-gray-400 text-sm mt-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined {format(new Date(user.joinedAt), 'MMMM yyyy')}
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Bio</h3>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white resize-none"
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-300">
                      {user.bio || 'No bio added yet.'}
                    </p>
                  )}
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.techStack.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                        placeholder="Location"
                      />
                    ) : (
                      <span className="text-gray-300">San Francisco, CA</span>
                    )}
                  </div>

                  <div className="flex items-center">
                    <Github className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                        placeholder="GitHub URL"
                      />
                    ) : (
                      <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                        {user.githubUrl?.replace('https://', '') || 'Not provided'}
                      </a>
                    )}
                  </div>

                  <div className="flex items-center">
                    <Linkedin className="w-5 h-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.linkedinUrl}
                        onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                        placeholder="LinkedIn URL"
                      />
                    ) : (
                      <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                        {user.linkedinUrl?.replace('https://', '') || 'Not provided'}
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Your Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={stat.label} hover className="relative overflow-hidden">
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
                  );
                })}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <Card
                      key={achievement.title}
                      className={`relative overflow-hidden ${achievement.earned ? 'border-yellow-500/30' : 'opacity-60'
                        }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-${achievement.earned ? '10' : '5'}`}></div>
                      <div className="relative flex items-center">
                        <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center mr-4 ${!achievement.earned ? 'grayscale' : ''
                          }`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{achievement.title}</h3>
                          <p className="text-gray-400 text-sm">{achievement.description}</p>
                        </div>
                        {achievement.earned && (
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-white fill-current" />
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Recent Activity</h2>
              <Card>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-700/30 transition-colors">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-4">
                          <Icon className="w-5 h-5 text-gray-300" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{activity.title}</p>
                          <p className="text-gray-400 text-sm">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};