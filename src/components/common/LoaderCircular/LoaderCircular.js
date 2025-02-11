import React, { useState, useEffect } from 'react';

const CircularProgressBar = ({ size = 100, strokeWidth = 10, duration = 2 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, (duration * 1000) / 100);

    return () => clearInterval(timer);
  }, [duration]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colorLoader = "#2AA75C"

  return (
    <div className="relative flex items-center justify-center font-sans">
      <svg
        role="img"
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="gray"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2AA75C"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-linear"
        />
      </svg>
      <div className="absolute text-xl font-semibold text-color-azul-oscuro-grisáceo dark:text-white">{`${progress}%`}</div>
    </div>
  );
};

export default CircularProgressBar;