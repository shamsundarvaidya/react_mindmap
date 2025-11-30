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
      container: 'w-7 h-7',
      iconSize: 14,
      text: 'text-sm font-semibold'
    },
    md: {
      container: 'w-9 h-9',
      iconSize: 18,
      text: 'text-lg font-bold'
    },
    lg: {
      container: 'w-11 h-11',
      iconSize: 22,
      text: 'text-xl font-bold'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        currentSize.container,
        "bg-gradient-to-br from-sky-400 via-cyan-500 to-slate-900 rounded-xl flex items-center justify-center shadow-md border border-white/20"
      )}>
        <svg 
          width={currentSize.iconSize} 
          height={currentSize.iconSize} 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-white/90 drop-shadow"
        >
          {/* Stylized network glyph */}
          <circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="18" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" />
          <path d="M7.8 7.4L11 11M16.2 7.4L13 11M12 13.2V15.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
      {showText && (
        <div className={cn(
          currentSize.text,
          "text-white tracking-tight select-none"
        )}>
          Network <span className="text-cyan-300">Diagram</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
