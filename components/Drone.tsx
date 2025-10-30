
import React from 'react';

interface DroneProps {
  className?: string;
}

const Drone: React.FC<DroneProps> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      className={className}
      aria-label="Animated drone graphic"
    >
      <defs>
        <radialGradient id="drone-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{stopColor: 'rgba(155, 229, 255, 0.8)'}} />
          <stop offset="100%" style={{stopColor: 'rgba(155, 229, 255, 0)'}} />
        </radialGradient>
      </defs>

      {/* Glow effect */}
      <circle cx="50" cy="50" r="40" fill="url(#drone-glow)" />

      {/* Arms */}
      <g fill="none" stroke="rgba(200, 240, 255, 0.6)" strokeWidth="2">
        <line x1="20" y1="20" x2="80" y2="80" />
        <line x1="80" y1="20" x2="20" y2="80" />
      </g>
      
      {/* Propellers */}
      <g fill="rgba(220, 250, 255, 0.9)">
        {/* Top-left */}
        <circle cx="20" cy="20" r="10" opacity="0.5" />
        <circle cx="20" cy="20" r="6" />
        {/* Top-right */}
        <circle cx="80" cy="20" r="10" opacity="0.5" />
        <circle cx="80" cy="20" r="6" />
        {/* Bottom-left */}
        <circle cx="20" cy="80" r="10" opacity="0.5" />
        <circle cx="20" cy="80" r="6" />
        {/* Bottom-right */}
        <circle cx="80" cy="80" r="10" opacity="0.5" />
        <circle cx="80" cy="80" r="6" />
      </g>
      
      {/* Body */}
      <g>
        <circle cx="50" cy="50" r="12" fill="#0b2345" stroke="#63b3ed" strokeWidth="1.5"/>
        <circle cx="50" cy="50" r="6" fill="#90cdf4" />
      </g>
    </svg>
  );
};

export default Drone;
