import React from 'react';

interface InfinityLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
}

export const InfinityLogo: React.FC<InfinityLogoProps> = ({
  size = 'md',
  showText = true,
  showTagline = false,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', badge: 'text-[9px]', sub: 'text-[9px]' },
    md: { icon: 'w-10 h-10', text: 'text-xl', badge: 'text-[10px]', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', badge: 'text-xs', sub: 'text-xs' },
    xl: { icon: 'w-16 h-16', text: 'text-3xl', badge: 'text-sm', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Icon Wrapper */}
      <div className={`relative flex items-center justify-center ${currentSize.icon} rounded-2xl bg-gradient-to-br from-[#22C55E] via-[#06B6D4] to-[#F97316] p-[2px] shadow-md shadow-emerald-500/10 group-hover:scale-105 transition-all duration-300`}>
        <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center p-1.5 shadow-inner">
          <svg
            viewBox="0 0 100 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full group-hover:rotate-6 transition-transform duration-300"
          >
            <defs>
              <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
              <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>

            {/* Infinity loop path */}
            <path
              d="M30 30 C15 15, 5 22, 5 30 C5 38, 15 45, 30 30 C45 15, 55 15, 70 30 C85 45, 95 38, 95 30 C95 22, 85 15, 70 30 C55 45, 45 45, 30 30 Z"
              stroke="url(#infinityGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Merged Dumbbell Center Bar */}
            <line x1="42" y1="30" x2="58" y2="30" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
            
            {/* Dumbbell Inner Plates */}
            <rect x="39" y="22" width="4" height="16" rx="2" fill="#111827" />
            <rect x="57" y="22" width="4" height="16" rx="2" fill="#111827" />

            {/* Dumbbell Outer Plates */}
            <rect x="35" y="24" width="3" height="12" rx="1.5" fill="#22C55E" />
            <rect x="62" y="24" width="3" height="12" rx="1.5" fill="#22C55E" />

            {/* Leaf Accent overlay on right loop */}
            <path
              d="M75 18 C82 12, 90 15, 88 23 C85 30, 77 28, 75 18 Z"
              fill="url(#leafGrad)"
              opacity="0.9"
            />
            <path
              d="M77 20 Q83 18 86 22"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className={`${currentSize.text} font-black tracking-tight text-[#111827]`}>
              Infinityfit<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22C55E] via-[#06B6D4] to-[#F97316]">AI</span>
            </span>
          </div>
          {showTagline && (
            <span className={`block ${currentSize.sub} font-semibold text-[#6B7280] tracking-tight`}>
              Train Smarter. Eat Better. Live Stronger.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
