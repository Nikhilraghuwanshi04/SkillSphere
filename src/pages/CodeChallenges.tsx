import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Code2,
  Medal,
  Play,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // in minutes
  points: number;
  tags: string[];
  submissions: number;
  successRate: number;
  createdAt: string;
  category: string;
}

interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    avatar: string;
  };
  score: number;
  solved: number;
  streak: number;
}

export const CodeChallenges: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Two Sum Problem',
      description: 'Given an array of integers and a target sum, return indices of two numbers that add up to the target.',
      difficulty: 'easy',
      timeLimit: 30,
      points: 50,
      tags: ['Arrays', 'Hash Table'],
      submissions: 1250,
      successRate: 85.2,
      createdAt: '2024-01-25',
      category: 'Arrays'
    },
    {
      id: '2',
      title: 'Binary Tree Inorder Traversal',
      description: 'Implement inorder traversal of a binary tree without using recursion.',
      difficulty: 'medium',
      timeLimit: 45,
      points: 100,
      tags: ['Trees', 'Stack', 'Iterative'],
      submissions: 890,
      successRate: 67.8,
      createdAt: '2024-01-24',
      category: 'Trees'
    },
    {
      id: '3',
      title: 'Merge K Sorted Lists',
      description: 'Merge k sorted linked lists and return it as one sorted list.',
      difficulty: 'hard',
      timeLimit: 60,
      points: 200,
      tags: ['Linked Lists', 'Divide & Conquer', 'Heap'],
      submissions: 456,
      successRate: 42.1,
      createdAt: '2024-01-23',
      category: 'Linked Lists'
    },
    {
      id: '4',
      title: 'Valid Parentheses',
      description: 'Given a string containing just the characters \'()\', \'[]\', \'{}\', determine if the input string is valid.',
      difficulty: 'easy',
      timeLimit: 20,
      points: 50,
      tags: ['Stack', 'String'],
      submissions: 2150,
      successRate: 78.6,
      createdAt: '2024-01-22',
      category: 'Stack'
    },
    {
      id: '5',
      title: 'Longest Palindromic Substring',
      description: 'Given a string, find the longest palindromic substring.',
      difficulty: 'medium',
      timeLimit: 40,
      points: 100,
      tags: ['String', 'Dynamic Programming'],
      submissions: 567,
      successRate: 56.3,
      createdAt: '2024-01-21',
      category: 'Dynamic Programming'
    },
    {
      id: '6',
      title: 'Regular Expression Matching',
      description: 'Implement regular expression matching with support for \'.\' and \'*\'.',
      difficulty: 'hard',
      timeLimit: 90,
      points: 250,
      tags: ['String', 'Dynamic Programming', 'Backtracking'],
      submissions: 234,
      successRate: 28.9,
      createdAt: '2024-01-20',
      category: 'Dynamic Programming'
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      user: {
        name: 'Alex Chen',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
      },
      score: 2450,
      solved: 127,
      streak: 15
    },
    {
      rank: 2,
      user: {
        name: 'Sarah Kim',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
      },
      score: 2280,
      solved: 118,
      streak: 12
    },
    {
      rank: 3,
      user: {
        name: 'Mike Johnson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
      },
      score: 2150,
      solved: 109,
      streak: 8
    },
    {
      rank: 4,
      user: {
        name: 'Emma Wilson',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
      },
      score: 1980,
      solved: 95,
      streak: 6
    },
    {
      rank: 5,
      user: {
        name: 'David Park',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
      },
      score: 1850,
      solved: 87,
      streak: 4
    }
  ];

  const categories = [
    'all', 'Arrays', 'Trees', 'Linked Lists', 'Stack', 'Dynamic Programming', 'String', 'Graph'
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
    return matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">#{rank}</span>;
    }
  };

  const stats = [
    { label: 'Total Challenges', value: '156', icon: Target, color: 'from-blue-500 to-cyan-500' },
    { label: 'Your Rank', value: '#23', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Solved', value: '45', icon: Trophy, color: 'from-purple-500 to-pink-500' },
    { label: 'Success Rate', value: '78%', icon: Star, color: 'from-orange-500 to-red-500' }
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
            Code Challenges 🏆
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Sharpen your coding skills with daily challenges and compete with developers worldwide
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Challenges List */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-6"
            >
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map(diff => (
                  <option key={diff.value} value={diff.value}>
                    {diff.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Challenges */}
            <div className="space-y-6">
              {filteredChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card hover>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{challenge.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                            {challenge.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-4">{challenge.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {challenge.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {challenge.timeLimit} min
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            {challenge.points} pts
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {challenge.submissions} solved
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {challenge.successRate}% success
                          </div>
                        </div>
                      </div>

                      <div className="ml-4">
                        <Button>
                          <Play className="w-4 h-4 mr-2" />
                          Solve
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Added {format(new Date(challenge.createdAt), 'MMM dd, yyyy')}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${challenge.successRate}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">{challenge.successRate}%</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Daily Challenge</h3>
                    <p className="text-purple-300 text-sm">Extra points today!</p>
                  </div>
                </div>
                <h4 className="text-white font-medium mb-2">Array Rotation</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Rotate an array to the right by k steps. Bonus: 2x points!
                </p>
                <Button className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Start Daily Challenge
                </Button>
              </Card>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                  Leaderboard
                </h3>
                <div className="space-y-4">
                  {leaderboard.map((entry) => (
                    <div key={entry.rank} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3">
                          {getRankIcon(entry.rank)}
                        </div>
                        <img
                          src={entry.user.avatar}
                          alt={entry.user.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <div>
                          <p className="text-white font-medium text-sm">{entry.user.name}</p>
                          <p className="text-gray-400 text-xs">{entry.solved} solved</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{entry.score}</p>
                        <p className="text-gray-400 text-xs">{entry.streak} streak</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Full Leaderboard
                </Button>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <Code2 className="w-5 h-5 mr-2 text-blue-400" />
                  Your Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <p className="text-white text-sm font-medium">Two Sum</p>
                        <p className="text-gray-400 text-xs">Solved in 12 minutes</p>
                      </div>
                    </div>
                    <span className="text-green-400 text-sm">+50 pts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      <div>
                        <p className="text-white text-sm font-medium">Binary Tree</p>
                        <p className="text-gray-400 text-xs">Time limit exceeded</p>
                      </div>
                    </div>
                    <span className="text-red-400 text-sm">+0 pts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      <div>
                        <p className="text-white text-sm font-medium">Valid Parentheses</p>
                        <p className="text-gray-400 text-xs">Partially correct</p>
                      </div>
                    </div>
                    <span className="text-yellow-400 text-sm">+25 pts</span>
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