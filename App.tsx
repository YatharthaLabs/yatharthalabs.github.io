import React, { useState, useEffect } from 'react';

//=================================================================
// Jet Component
//=================================================================
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


//=================================================================
// Drone Component
//=================================================================
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


//=================================================================
// CountdownTimer Component
//=================================================================
interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft | null => {
  const difference = +targetDate - +new Date();
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return null;
};

const TimeDisplayBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg">
    <span className="text-3xl md:text-5xl font-bold text-cyan-300">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-xs md:text-sm font-light text-gray-400 tracking-widest mt-1">
      {label}
    </span>
  </div>
);


const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div className="mt-8 text-3xl font-bold text-green-400">
        We Have Launched!
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4 mt-6">
      <TimeDisplayBox value={timeLeft.days} label="DAYS" />
      <TimeDisplayBox value={timeLeft.hours} label="HOURS" />
      <TimeDisplayBox value={timeLeft.minutes} label="MINUTES" />
      <TimeDisplayBox value={timeLeft.seconds} label="SECONDS" />
    </div>
  );
};


//=================================================================
// AnimationStyles Component
//=================================================================
const AnimationStyles = () => (
  <style>
    {`
      @keyframes float-1 {
        0%, 100% { transform: translateY(0px) rotate(-3deg); }
        50% { transform: translateY(-25px) rotate(3deg); }
      }
      @keyframes float-2 {
        0%, 100% { transform: translateY(0px) rotate(4deg); }
        50% { transform: translateY(-15px) rotate(-4deg); }
      }
      @keyframes float-3 {
        0%, 100% { transform: translateY(0px) rotate(2deg); }
        50% { transform: translateY(-20px) rotate(-2deg); }
      }
      @keyframes fly-across-1 {
        0% { transform: translate(-100vw, -20vh) rotate(14deg) scale(0.8); opacity: 1; }
        100% { transform: translate(100vw, 30vh) rotate(14deg) scale(0.8); opacity: 1; }
      }
      @keyframes fly-across-2 {
        0% { transform: translate(100vw, 70vh) rotate(194deg) scale(0.6); opacity: 1; }
        100% { transform: translate(-100vw, 20vh) rotate(194deg) scale(0.6); opacity: 1; }
      }
       @keyframes fly-across-3 {
        0% { transform: translate(30vw, -20vh) rotate(57deg) scale(0.7); opacity: 1; }
        100% { transform: translate(120vw, 120vh) rotate(57deg) scale(0.7); opacity: 1; }
      }
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
      .animate-float-2 { animation: float-2 10s ease-in-out infinite; }
      .animate-float-3 { animation: float-3 7s ease-in-out infinite; }
      
      .animate-fly-1 { 
        animation: fly-across-1 15s linear infinite; 
      }
      .animate-fly-2 { 
        animation: fly-across-2 20s linear infinite; 
        /* animation-delay: 5s;  <- Removed */
      }
      .animate-fly-3 { 
        animation: fly-across-3 25s linear infinite; 
        /* animation-delay: 10s; <- Removed */
      }
      
      .animate-fade-in { animation: fade-in 1s ease-out forwards; }

      .parallax-layer {
        transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        transform: translate(calc(var(--mouse-x, 0) * 1px), calc(var(--mouse-y, 0) * 1px));
      }
      .parallax-layer-deep {
        transform: translate(calc(var(--mouse-x, 0) * 5px), calc(var(--mouse-y, 0) * 5px));
      }
      .parallax-layer-drone {
        transition: transform 0.2s ease-out;
        transform: translate(calc(var(--mouse-x, 0) * -15px), calc(var(--mouse-y, 0) * -15px));
      }
      .parallax-layer-drone-fast {
        transition: transform 0.2s ease-out;
        transform: translate(calc(var(--mouse-x, 0) * -25px), calc(var(--mouse-y, 0) * -25px));
      }
      .glow {
        filter: drop-shadow(0 0 15px rgba(118, 209, 255, 0.4)) drop-shadow(0 0 40px rgba(74, 144, 226, 0.3));
      }
    `}
  </style>
);

//=================================================================
// Main App Component
//=================================================================
const App: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      document.documentElement.style.setProperty('--mouse-x', `${x * 10}`);
      document.documentElement.style.setProperty('--mouse-y', `${y * 10}`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

// This is a fixed date and time is in UTC
const launchDate = new Date('2025-11-29T17:00:00Z');

  return (
    <>
      <AnimationStyles />
      <main className="font-poppins bg-gray-900 text-white h-screen w-screen overflow-hidden relative flex items-center justify-center p-4">
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#032f5e] opacity-80 parallax-layer-deep"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 parallax-layer"></div>
        
        {/* Animated Drones */}
        <div className="absolute top-[10%] left-[5%] w-24 h-24 md:w-32 md:h-32 opacity-70 parallax-layer-drone-fast">
          <Drone className="animate-float-1 glow" />
        </div>
        <div className="absolute bottom-[15%] right-[8%] w-20 h-20 md:w-28 md:h-28 opacity-60 parallax-layer-drone">
          <Drone className="animate-float-2 glow" />
        </div>
        <div className="hidden lg:block absolute top-[20%] right-[15%] w-16 h-16 opacity-50 parallax-layer-drone-fast">
          <Drone className="animate-float-3 glow" />
        </div>
        <div className="hidden md:block absolute bottom-[5%] left-[12%] w-12 h-12 opacity-40 parallax-layer-drone">
          <Drone className="animate-float-1 glow" />
        </div>
        <div className="absolute top-[50%] left-[20%] w-10 h-10 opacity-30 parallax-layer-drone-fast">
            <Drone className="animate-float-2 glow" />
        </div>
        <div className="absolute top-[60%] right-[25%] w-20 h-20 opacity-20 parallax-layer-drone">
            <Drone className="animate-float-3 glow" />
        </div>

        {/* Fighter Jets */}
        <div className="absolute top-0 left-0 w-48 h-24 md:w-64 md:h-32 opacity-50 pointer-events-none">
          <Jet className="animate-fly-1" />
        </div>
        <div className="absolute top-0 left-0 w-32 h-16 md:w-48 md:h-24 opacity-40 pointer-events-none">
          <Jet className="animate-fly-2" />
        </div>
        <div className="absolute top-0 left-0 w-40 h-20 md:w-56 md:h-28 opacity-30 pointer-events-none">
          <Jet className="animate-fly-3" />
        </div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <header className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
              Yathartha Labs
            </h1>
            <p className="mt-2 md:mt-4 text-lg md:text-2xl font-light text-gray-300 tracking-wide">
              Innovating the Future of Intelligence.
            </p>
          </header>

          <div className="mt-12 md:mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wider text-cyan-200">
              LAUNCHING SOON
            </h2>
            <CountdownTimer targetDate={launchDate} />
          </div>
        </div>

      </main>
    </>
  );
};

export default App;

