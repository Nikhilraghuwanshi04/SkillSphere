import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  Github, 
  Filter,
  Search,
  Star,
  Eye,
  Calendar,
  User
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { format } from 'date-fns';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  techStack: string[];
  likes: number;
  comments: number;
  views: number;
  demoUrl?: string;
  githubUrl?: string;
  createdAt: string;
  featured: boolean;
}

export const ProjectShowcase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());

  const projects: Project[] = [
    {
      id: '1',
      title: 'AI-Powered Task Manager',
      description: 'A modern task management application with AI-powered categorization and priority suggestions.',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
      },
      techStack: ['React', 'Node.js', 'OpenAI', 'MongoDB'],
      likes: 124,
      comments: 32,
      views: 2456,
      demoUrl: 'https://task-manager-demo.com',
      githubUrl: 'https://github.com/sarah/task-manager',
      createdAt: '2024-01-20',
      featured: true
    },
    {
      id: '2',
      title: 'Cryptocurrency Portfolio Tracker',
      description: 'Real-time cryptocurrency portfolio tracking with advanced analytics and alerts.',
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      author: {
        name: 'Mike Rodriguez',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
      },
      techStack: ['Vue.js', 'TypeScript', 'Chart.js', 'WebSocket'],
      likes: 89,
      comments: 18,
      views: 1872,
      demoUrl: 'https://crypto-tracker-demo.com',
      githubUrl: 'https://github.com/mike/crypto-tracker',
      createdAt: '2024-01-18',
      featured: false
    },
    {
      id: '3',
      title: 'Social Media Dashboard',
      description: 'Unified dashboard for managing multiple social media accounts with analytics.',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      author: {
        name: 'Emily Johnson',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
      },
      techStack: ['React', 'Next.js', 'Tailwind', 'Prisma'],
      likes: 156,
      comments: 45,
      views: 3241,
      demoUrl: 'https://social-dashboard-demo.com',
      githubUrl: 'https://github.com/emily/social-dashboard',
      createdAt: '2024-01-15',
      featured: true
    },
    {
      id: '4',
      title: 'Weather Forecast App',
      description: 'Beautiful weather application with location-based forecasts and interactive maps.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      author: {
        name: 'David Kim',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
      },
      techStack: ['Angular', 'TypeScript', 'Leaflet', 'OpenWeather API'],
      likes: 67,
      comments: 12,
      views: 1543,
      demoUrl: 'https://weather-app-demo.com',
      githubUrl: 'https://github.com/david/weather-app',
      createdAt: '2024-01-12',
      featured: false
    },
    {
      id: '5',
      title: 'E-commerce Platform',
      description: 'Full-featured e-commerce platform with payment integration and admin dashboard.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      author: {
        name: 'Lisa Park',
        avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
      },
      techStack: ['React', 'Node.js', 'Stripe', 'PostgreSQL'],
      likes: 203,
      comments: 67,
      views: 4521,
      demoUrl: 'https://ecommerce-demo.com',
      githubUrl: 'https://github.com/lisa/ecommerce-platform',
      createdAt: '2024-01-10',
      featured: true
    },
    {
      id: '6',
      title: 'Music Streaming Player',
      description: 'Spotify-like music player with playlist management and music discovery features.',
      image: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2',
      author: {
        name: 'Alex Turner',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
      },
      techStack: ['React', 'Web Audio API', 'Firebase', 'Material-UI'],
      likes: 145,
      comments: 28,
      views: 2876,
      demoUrl: 'https://music-player-demo.com',
      githubUrl: 'https://github.com/alex/music-player',
      createdAt: '2024-01-08',
      featured: false
    }
  ];

  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'featured', label: 'Featured' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'node', label: 'Node.js' },
    { value: 'typescript', label: 'TypeScript' }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'featured') return matchesSearch && project.featured;
    return matchesSearch && project.techStack.some(tech => 
      tech.toLowerCase().includes(selectedFilter.toLowerCase())
    );
  });

  const toggleLike = (projectId: string) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
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
              Project Showcase
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400"
            >
              Discover amazing projects from the developer community
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button>
              <Plus className="w-5 h-5 mr-2" />
              Share Project
            </Button>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, technologies, or developers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {filters.map(filter => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card hover className="h-full">
                {/* Project Image */}
                <div className="relative mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <Github className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center mb-4">
                    <img
                      src={project.author.avatar}
                      alt={project.author.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">{project.author.name}</p>
                      <p className="text-gray-400 text-xs flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {format(new Date(project.createdAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleLike(project.id)}
                        className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Heart 
                          className={`w-5 h-5 ${likedProjects.has(project.id) ? 'fill-current text-red-400' : ''}`} 
                        />
                        <span className="text-sm">{project.likes}</span>
                      </button>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{project.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Eye className="w-5 h-5" />
                        <span className="text-sm">{project.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setSelectedFilter('all');
            }}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};