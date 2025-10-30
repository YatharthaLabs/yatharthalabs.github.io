
import React, { useState, useEffect } from 'react';

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

export default CountdownTimer;
