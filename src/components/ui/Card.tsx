import React, { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'outlined';
}

const Card = ({ className = '', children, variant = 'default' }: CardProps) => {
  const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-dark-800/80 backdrop-blur-md shadow-xl',
    gradient: 'bg-gradient-to-br from-dark-800/80 to-dark-900/90 backdrop-blur-md shadow-xl border border-dark-700',
    outlined: 'border border-dark-700 bg-dark-800/40 backdrop-blur-sm',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;