import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'color' | 'white';
}

const Logo: React.FC<LogoProps> = ({ className = "h-10", showText = true, variant = 'color' }) => {
  // Brand colors
  const colorStart = "#8A3FFC";
  const colorEnd = "#CE4ADE";
  const textColor = variant === 'white' ? '#FFFFFF' : '#4B0082'; // Deep purple for text if not white

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Icon: Calendar/Chat Bubble with Heart */}
      <svg viewBox="0 0 100 100" className="h-full w-auto aspect-square overflow-visible">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>
        
        {/* Main Shape: Rounded Rect / Chat Bubble style */}
        <path 
          d="M20,10 H80 A18,18 0 0,1 98,28 V72 A18,18 0 0,1 80,90 H28 L10,98 V28 A18,18 0 0,1 20,10 Z" 
          fill="url(#logoGradient)" 
          stroke="none"
        />
        
        {/* Calendar Rings */}
        <path d="M35,5 V15 M65,5 V15" stroke="white" strokeWidth="6" strokeLinecap="round" />

        {/* Heart Icon Inside */}
        <path 
          d="M50,70 C50,70 72,55 72,42 C72,35 66,30 60,30 C55,30 52,33 50,36 C48,33 45,30 40,30 C34,30 28,35 28,42 C28,55 50,70 50,70 Z" 
          fill="white"
        />
      </svg>

      {/* Text Part */}
      {showText && (
        <span 
          className="font-bold tracking-tight" 
          style={{ 
            fontSize: '1.5em',
            background: variant === 'color' ? `linear-gradient(to right, ${colorStart}, ${colorEnd})` : 'white',
            WebkitBackgroundClip: variant === 'color' ? 'text' : 'none',
            WebkitTextFillColor: variant === 'color' ? 'transparent' : 'white',
            color: variant === 'white' ? 'white' : 'inherit'
          }}
        >
          مناسباتكم
        </span>
      )}
    </div>
  );
};

export default Logo;