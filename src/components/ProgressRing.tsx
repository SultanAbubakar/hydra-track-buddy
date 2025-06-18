
import React from 'react';

interface ProgressRingProps {
  percentage: number;
  currentIntake: number;
  dailyGoal: number;
}

export const ProgressRing = ({ percentage, currentIntake, dailyGoal }: ProgressRingProps) => {
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getMotivationalMessage = () => {
    if (percentage === 0) return "Let's start hydrating! 💧";
    if (percentage < 25) return "Great start! Keep going! 🌟";
    if (percentage < 50) return "You're making progress! 💪";
    if (percentage < 75) return "Halfway there! Keep it up! 🚀";
    if (percentage < 100) return "Almost at your goal! 🎯";
    return "Goal achieved! Well done! 🏆";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 mb-4">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            stroke="#E5F3FF"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke="url(#gradient)"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-500 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-gray-800">
            {Math.round(percentage)}%
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {dailyGoal - currentIntake > 0 
              ? `${dailyGoal - currentIntake}ml to go`
              : 'Goal achieved!'
            }
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-full px-4 py-2">
        <p className="text-sm font-medium text-blue-700 text-center">
          {getMotivationalMessage()}
        </p>
      </div>
    </div>
  );
};
