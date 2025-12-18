import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Clock,
  Eye,
  MessageSquare,
  Plus,
  Search,
  Star,
  Tag
} from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
    badge?: string;
  };
  tags: string[];
  votes: number;
  replies: number;
  views: number;
  createdAt: string;
  lastActivity: string;
  solved: boolean;
  pinned: boolean;
}

export const Forum: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [votedPosts, setVotedPosts] = useState<Map<string, 'up' | 'down'>>(new Map());

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'How to optimize React component re-renders?',
      content: 'I\'m working on a large React application and noticing performance issues with unnecessary re-renders. What are the best practices for optimizing component performance?',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
        reputation: 1250,
        badge: 'Expert'
      },
      tags: ['React', 'Performance', 'JavaScript'],
      votes: 24,
      replies: 8,
      views: 156,
      createdAt: '2024-01-25T10:30:00Z',
      lastActivity: '2024-01-25T14:20:00Z',
      solved: false,
      pinned: true
    },
    {
      id: '2',
      title: 'Best practices for Node.js error handling',
      content: 'What are the recommended patterns for handling errors in Node.js applications? Should I use try-catch everywhere or are there better approaches?',
      author: {
        name: 'Mike Rodriguez',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
        reputation: 890,
      },
      tags: ['Node.js', 'Error Handling', 'Backend'],
      votes: 18,
      replies: 12,
      views: 203,
      createdAt: '2024-01-24T16:45:00Z',
      lastActivity: '2024-01-25T09:15:00Z',
      solved: true,
      pinned: false
    },
    {
      id: '3',
      title: 'TypeScript generic constraints confusion',
      content: 'I\'m struggling to understand when and how to use generic constraints in TypeScript. Can someone explain with practical examples?',
      author: {
        name: 'Emily Johnson',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
        reputation: 567,
      },
      tags: ['TypeScript', 'Generics', 'Types'],
      votes: 15,
      replies: 6,
      views: 89,
      createdAt: '2024-01-24T11:20:00Z',
      lastActivity: '2024-01-24T18:30:00Z',
      solved: false,
      pinned: false
    },
    {
      id: '4',
      title: 'Database design for social media app',
      content: 'I\'m building a social media application and need advice on database schema design. Should I use SQL or NoSQL? What about handling relationships?',
      author: {
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
        reputation: 1100,
        badge: 'Mentor'
      },
      tags: ['Database', 'Design', 'SQL', 'NoSQL'],
      votes: 32,
      replies: 15,
      views: 287,
      createdAt: '2024-01-23T14:10:00Z',
      lastActivity: '2024-01-25T11:45:00Z',
      solved: false,
      pinned: false
    },
    {
      id: '5',
      title: 'CSS Grid vs Flexbox - When to use which?',
      content: 'I often get confused about when to use CSS Grid versus Flexbox. Are there specific use cases where one is clearly better than the other?',
      author: {
        name: 'Lisa Park',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
        reputation: 445,
      },
      tags: ['CSS', 'Layout', 'Frontend'],
      votes: 21,
      replies: 9,
      views: 134,
      createdAt: '2024-01-23T09:30:00Z',
      lastActivity: '2024-01-24T16:20:00Z',
      solved: true,
      pinned: false
    },
    {
      id: '6',
      title: 'Docker containerization best practices',
      content: 'New to Docker and looking for best practices for containerizing a full-stack application. What should I include in my Dockerfile?',
      author: {
        name: 'Alex Turner',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
        reputation: 678,
      },
      tags: ['Docker', 'DevOps', 'Containerization'],
      votes: 12,
      replies: 4,
      views: 67,
      createdAt: '2024-01-22T13:15:00Z',
      lastActivity: '2024-01-23T10:30:00Z',
      solved: false,
      pinned: false
    }
  ];

  const popularTags = [
    'React', 'JavaScript', 'Node.js', 'TypeScript', 'Python', 'CSS', 'Database', 'Docker', 'AWS', 'Performance'
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = selectedTag === 'all' || post.tags.some(tag =>
      tag.toLowerCase() === selectedTag.toLowerCase()
    );

    return matchesSearch && matchesTag;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'votes':
        return b.votes - a.votes;
      case 'replies':
        return b.replies - a.replies;
      case 'views':
        return b.views - a.views;
      default: // recent
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
    }
  });

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setVotedPosts(prev => {
      const newMap = new Map(prev);
      const currentVote = newMap.get(postId);

      if (currentVote === voteType) {
        newMap.delete(postId);
      } else {
        newMap.set(postId, voteType);
      }

      return newMap;
    });
  };

  const getVoteColor = (postId: string, voteType: 'up' | 'down') => {
    const userVote = votedPosts.get(postId);
    if (userVote === voteType) {
      return voteType === 'up' ? 'text-green-400' : 'text-red-400';
    }
    return 'text-gray-400 hover:text-gray-300';
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Developer Forum 💬
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400"
            >
              Ask questions, share knowledge, and connect with the community
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button>
              <Plus className="w-5 h-5 mr-2" />
              Ask Question
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col lg:flex-row gap-4 mb-6"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions, answers, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Tags</option>
                  {popularTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="recent">Recent Activity</option>
                  <option value="votes">Most Voted</option>
                  <option value="replies">Most Replies</option>
                  <option value="views">Most Viewed</option>
                </select>
              </div>
            </motion.div>

            {/* Forum Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card hover className={`${post.pinned ? 'border-yellow-500/30 bg-yellow-500/5' : ''}`}>
                    <div className="flex gap-4">
                      {/* Vote Section */}
                      <div className="flex flex-col items-center space-y-2">
                        <button
                          onClick={() => handleVote(post.id, 'up')}
                          className={`p-1 rounded transition-colors ${getVoteColor(post.id, 'up')}`}
                        >
                          <ArrowUp className="w-5 h-5" />
                        </button>
                        <span className="text-white font-semibold">{post.votes}</span>
                        <button
                          onClick={() => handleVote(post.id, 'down')}
                          className={`p-1 rounded transition-colors ${getVoteColor(post.id, 'down')}`}
                        >
                          <ArrowDown className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {post.pinned && (
                              <Star className="w-4 h-4 text-yellow-500" />
                            )}
                            {post.solved && (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            )}
                            <h3 className="text-xl font-semibold text-white hover:text-blue-400 cursor-pointer">
                              {post.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-4 line-clamp-2">{post.content}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs cursor-pointer hover:bg-blue-500/30 transition-colors"
                              onClick={() => setSelectedTag(tag)}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Stats and Author */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {post.replies} replies
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {post.views} views
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {format(new Date(post.lastActivity), 'MMM dd, HH:mm')}
                            </div>
                          </div>

                          <div className="flex items-center">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <div className="text-right">
                              <div className="flex items-center">
                                <p className="text-white text-sm font-medium">{post.author.name}</p>
                                {post.author.badge && (
                                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${post.author.badge === 'Expert' ? 'bg-purple-500/20 text-purple-400' :
                                      post.author.badge === 'Mentor' ? 'bg-green-500/20 text-green-400' :
                                        'bg-gray-500/20 text-gray-400'
                                    }`}>
                                    {post.author.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-400 text-xs">{post.author.reputation} reputation</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('all');
                }}>
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-blue-400" />
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedTag === tag
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Forum Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-white mb-4">Forum Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Questions</span>
                    <span className="text-white font-semibold">2,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Answered</span>
                    <span className="text-green-400 font-semibold">1,892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Active Users</span>
                    <span className="text-blue-400 font-semibold">834</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Today's Posts</span>
                    <span className="text-purple-400 font-semibold">23</span>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  Top Contributors
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Sarah Chen', reputation: 1250, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2' },
                    { name: 'David Kim', reputation: 1100, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2' },
                    { name: 'Mike Rodriguez', reputation: 890, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=2' }
                  ].map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm mr-2">#{index + 1}</span>
                        <img
                          src={contributor.avatar}
                          alt={contributor.name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-white text-sm">{contributor.name}</span>
                      </div>
                      <span className="text-yellow-400 text-sm font-semibold">
                        {contributor.reputation}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};