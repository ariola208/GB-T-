import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8" }) => (
  <svg
    viewBox="0 0 350 60"
    role="img"
    aria-label="VôdooVista"
    className={`w-auto select-none ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#d1d5db" />
        <stop offset="100%" stopColor="#9ca3af" />
      </linearGradient>
    </defs>
    <text
      x="0"
      y="45"
      fontFamily="'Playfair Display', serif"
      fontSize="52"
      fontWeight="700"
      fill="url(#logo-gradient)"
      letterSpacing="-2"
    >
      VôdooVista
    </text>
    <path
      d="M 22 50 Q 40 40 58 50"
      stroke="#9ca3af"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

export default Logo;
