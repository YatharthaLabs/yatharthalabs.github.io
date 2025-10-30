import React from 'react';

interface JetProps {
  className?: string;
}

const Jet: React.FC<JetProps> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 100" 
      className={className}
      aria-label="Animated F-16 fighter jet graphic"
    >
      <defs>
        <linearGradient id="jet-body-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#90cdf4' }} />
          <stop offset="100%" style={{ stopColor: '#4A5568' }} />
        </linearGradient>
        <linearGradient id="jet-trail-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" style={{ stopColor: 'rgba(255, 100, 0, 0.8)' }} />
          <stop offset="30%" style={{ stopColor: 'rgba(255, 200, 0, 0.6)' }} />
          <stop offset="100%" style={{ stopColor: 'rgba(118, 209, 255, 0)' }} />
        </linearGradient>
        <filter id="jet-glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Wrapper group to rotate the jet 180 degrees around its center (100, 50) */}
      <g transform="rotate(180 100 50)">

        {/* Jet Trail (moved behind the jet) */}
        <g transform="translate(150, 0)">
          <path
            d="M5 50 Q 60 45, 195 35 L 195 65 Q 60 55, 5 50 Z"
            fill="url(#jet-trail-gradient)"
          />
        </g>

        {/* F-16 Jet Body */}
        <g filter="url(#jet-glow)">
          {/* Main Fuselage and Wings */}
          <path 
            d="M 25 50 C 40 50, 80 45, 110 45 L 180 20 L 170 48 L 195 48 C 200 50, 200 50, 195 52 L 170 52 L 180 80 L 110 55 C 80 55, 40 50, 25 50 Z" 
            fill="url(#jet-body-gradient)"
            stroke="#e2e8f0"
            strokeWidth="1"
          />
          {/* Vertical Tail Fin */}
          <path 
            d="M 155 48 L 150 30 L 170 32 L 170 48 Z" 
            fill="url(#jet-body-gradient)"
            stroke="#e2e8f0"
            strokeWidth="0.5"
          />
          {/* Air Intake underbelly */}
          <path
            d="M 80 53 C 90 65, 110 65, 120 53 L 110 55 L 90 55 Z"
            fill="#2d3748"
          />
          {/* Cockpit Canopy */}
          <path 
            d="M 90 50 C 100 42, 120 42, 130 50 Z"
            fill="#0b2345"
            stroke="#63b3ed"
            strokeWidth="1"
          />
        </g>
      </g>
    </svg>
  );
};

export default Jet;