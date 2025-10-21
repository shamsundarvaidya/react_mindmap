import React from 'react';
import { cn } from '../../lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className 
}) => {
  const sizeClasses = {
    sm: {
      container: 'w-6 h-6',
      iconSize: 12,
      text: 'text-sm font-semibold'
    },
    md: {
      container: 'w-8 h-8',
      iconSize: 16,
      text: 'text-lg font-bold'
    },
    lg: {
      container: 'w-10 h-10',
      iconSize: 20,
      text: 'text-xl font-bold'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        currentSize.container,
        "bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md"
      )}>
        <svg 
          width={currentSize.iconSize} 
          height={currentSize.iconSize} 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-white"
        >
          <path 
            d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7l-10-5z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10z" 
            fill="currentColor" 
            fillOpacity="0.1"
          />
        </svg>
      </div>
      {showText && (
        <div className={cn(
          currentSize.text,
          "text-white tracking-tight select-none"
        )}>
          Mind<span className="text-blue-400">Map</span>
        </div>
      )}
    </div>
  );
};

export default Logo;