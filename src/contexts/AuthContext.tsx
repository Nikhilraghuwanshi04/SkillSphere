import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'mentor' | 'admin';
  bio?: string;
  techStack: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  streak: number;
  totalProjects: number;
  totalChallenges: number;
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  techStack: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const storedUser = localStorage.getItem('skillSphereUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: '1',
        email,
        name: 'John Developer',
        role: 'user',
        bio: 'Full-stack developer passionate about React and Node.js',
        techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
        githubUrl: 'https://github.com/johndeveloper',
        linkedinUrl: 'https://linkedin.com/in/johndeveloper',
        streak: 7,
        totalProjects: 12,
        totalChallenges: 45,
        joinedAt: '2024-01-15'
      };

      setUser(mockUser);
      localStorage.setItem('skillSphereUser', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: 'user',
        techStack: userData.techStack,
        streak: 0,
        totalProjects: 0,
        totalChallenges: 0,
        joinedAt: new Date().toISOString()
      };

      setUser(newUser);
      localStorage.setItem('skillSphereUser', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillSphereUser');
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('skillSphereUser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};