import React from 'react';
import { cn } from '../../lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  isDark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className,
  isDark = true,
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
        "rounded-xl flex items-center justify-center shadow-md",
        isDark
          ? "bg-gradient-to-br from-sky-400 via-cyan-500 to-slate-900 border border-white/20"
          : "bg-gradient-to-br from-white via-sky-100 to-cyan-100 border border-sky-200"
      )}>
        <svg 
          width={currentSize.iconSize} 
          height={currentSize.iconSize} 
          viewBox="0 0 24 24" 
          fill="none" 
          className={cn(
            "drop-shadow",
            isDark ? "text-white/90" : "text-slate-800"
          )}
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
          "tracking-tight select-none",
          isDark ? "text-white" : "text-slate-900"
        )}>
          Network <span className={cn(isDark ? "text-cyan-300" : "text-sky-500")}>Diagram</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
