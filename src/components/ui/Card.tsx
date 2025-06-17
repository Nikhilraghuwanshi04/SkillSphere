import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false,
  onClick 
}) => {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      className={clsx(
        'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6',
        {
          'hover:bg-gray-800/70 hover:border-gray-600/50 transition-all duration-200': hover,
          'cursor-pointer': onClick
        },
        className
      )}
      onClick={onClick}
      whileHover={hover ? { y: -2 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </Component>
  );
};