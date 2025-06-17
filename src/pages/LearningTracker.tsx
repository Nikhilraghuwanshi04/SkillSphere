import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  BookOpen, 
  Calendar, 
  Target, 
  Award,
  TrendingUp,
  Clock,
  CheckCircle2,
  Circle,
  Flame,
  Star
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { format } from 'date-fns';

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  technology: string;
  progress: number;
  targetDate: string;
  status: 'active' | 'completed' | 'paused';
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
}

export const LearningTracker: React.FC = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const learningGoals: LearningGoal[] = [
    {
      id: '1',
      title: 'Master React Hooks',
      description: 'Deep dive into React Hooks including useState, useEffect, useContext, and custom hooks',
      technology: 'React',
      progress: 75,
      targetDate: '2024-02-28',
      status: 'active',
      milestones: [
        { id: '1', title: 'Learn useState and useEffect', completed: true, completedAt: '2024-01-15' },
        { id: '2', title: 'Master useContext and useReducer', completed: true, completedAt: '2024-01-22' },
        { id: '3', title: 'Build custom hooks', completed: false },
        { id: '4', title: 'Create a project using advanced hooks', completed: false }
      ]
    },
    {
      id: '2',
      title: 'TypeScript Fundamentals',
      description: 'Learn TypeScript basics and advanced types for better JavaScript development',
      technology: 'TypeScript',
      progress: 45,
      targetDate: '2024-03-15',
      status: 'active',
      milestones: [
        { id: '1', title: 'Basic types and interfaces', completed: true, completedAt: '2024-01-10' },
        { id: '2', title: 'Generics and utility types', completed: false },
        { id: '3', title: 'Advanced type manipulation', completed: false },
        { id: '4', title: 'TypeScript with React', completed: false }
      ]
    },
    {
      id: '3',
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js, Express, and MongoDB',
      technology: 'Node.js',
      progress: 90,
      targetDate: '2024-01-30',
      status: 'completed',
      milestones: [
        { id: '1', title: 'Express.js fundamentals', completed: true, completedAt: '2024-01-05' },
        { id: '2', title: 'Database integration', completed: true, completedAt: '2024-01-12' },
        { id: '3', title: 'Authentication and authorization', completed: true, completedAt: '2024-01-20' },
        { id: '4', title: 'Deploy to production', completed: true, completedAt: '2024-01-25' }
      ]
    }
  ];

  const streak = 15;
  const totalGoals = learningGoals.length;
  const completedGoals = learningGoals.filter(goal => goal.status === 'completed').length;
  const activeGoals = learningGoals.filter(goal => goal.status === 'active').length;

  const weeklyProgress = [
    { day: 'Mon', hours: 2 },
    { day: 'Tue', hours: 1.5 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 2.5 },
    { day: 'Fri', hours: 1 },
    { day: 'Sat', hours: 4 },
    { day: 'Sun', hours: 2 }
  ];

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    // In a real app, this would update the state
    console.log('Toggle milestone:', goalId, milestoneId);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Learning Tracker
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400"
            >
              Track your learning progress and achieve your goals
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button onClick={() => setShowAddGoal(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Goal
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{streak}</p>
                  <p className="text-gray-400">Day Streak</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{activeGoals}</p>
                  <p className="text-gray-400">Active Goals</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{completedGoals}</p>
                  <p className="text-gray-400">Completed</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">16.5</p>
                  <p className="text-gray-400">Hours This Week</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Goals */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-blue-400" />
                Learning Goals
              </h2>
            </motion.div>

            <div className="space-y-6">
              {learningGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Card 
                    hover 
                    onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          goal.status === 'completed' ? 'bg-green-500' :
                          goal.status === 'active' ? 'bg-blue-500' : 'bg-gray-500'
                        }`}></div>
                        <h3 className="text-xl font-semibold text-white">{goal.title}</h3>
                      </div>
                      <span className={`px-3 py-1 text-xs rounded-full ${
                        goal.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        goal.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {goal.technology}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-4">{goal.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm">Due: {format(new Date(goal.targetDate), 'MMM dd, yyyy')}</span>
                      </div>
                      <span className="text-sm text-gray-400">{goal.progress}%</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            goal.status === 'completed' ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                          }`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {selectedGoal === goal.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-gray-700 pt-4 mt-4"
                        >
                          <h4 className="text-lg font-semibold text-white mb-3">Milestones</h4>
                          <div className="space-y-2">
                            {goal.milestones.map((milestone) => (
                              <div
                                key={milestone.id}
                                className="flex items-center p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleMilestone(goal.id, milestone.id);
                                }}
                              >
                                {milestone.completed ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                                ) : (
                                  <Circle className="w-5 h-5 text-gray-400 mr-3" />
                                )}
                                <div className="flex-1">
                                  <p className={`${milestone.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                                    {milestone.title}
                                  </p>
                                  {milestone.completedAt && (
                                    <p className="text-xs text-gray-500">
                                      Completed on {format(new Date(milestone.completedAt), 'MMM dd, yyyy')}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Weekly Progress
                </h3>
                <div className="space-y-3">
                  {weeklyProgress.map((day, index) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{day.day}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${(day.hours / 4) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400 w-8">{day.hours}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  Recent Achievements
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-yellow-500/10 rounded-lg">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">First Goal Completed!</p>
                      <p className="text-xs text-gray-400">Completed Node.js Backend Development</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-orange-500/10 rounded-lg">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <Flame className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">15 Day Streak!</p>
                      <p className="text-xs text-gray-400">Keep up the consistency</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-500/10 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Goal Setter</p>
                      <p className="text-xs text-gray-400">Created your first learning goal</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};