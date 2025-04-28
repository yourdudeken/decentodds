import React from 'react';
import { BarChart2 } from 'lucide-react';

interface LogoProps {
  size?: number;
}

const Logo = ({ size = 24 }: LogoProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center justify-center blur-sm opacity-70">
        <BarChart2 size={size} className="text-primary-400" />
      </div>
      <BarChart2 size={size} className="relative z-10 text-primary-500" />
    </div>
  );
};

export default Logo;