
import React from 'react';
import { Calendar, Droplet, Bell } from 'lucide-react';

interface WaterStatsProps {
  currentIntake: number;
  dailyGoal: number;
}

export const WaterStats = ({ currentIntake, dailyGoal }: WaterStatsProps) => {
  const percentage = Math.min((currentIntake / dailyGoal) * 100, 100);
  
  const getHydrationLevel = () => {
    if (percentage < 25) return { level: 'Low', color: 'text-orange-600', bg: 'bg-orange-50' };
    if (percentage < 50) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (percentage < 75) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage < 100) return { level: 'Great', color: 'text-green-600', bg: 'bg-green-50' };
    return { level: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-50' };
  };

  const hydrationStatus = getHydrationLevel();

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">Today's Summary</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
          <div className="flex items-center gap-3">
            <Droplet className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Hydration Level</span>
          </div>
          <div className={`px-3 py-1 rounded-full ${hydrationStatus.bg}`}>
            <span className={`text-sm font-medium ${hydrationStatus.color}`}>
              {hydrationStatus.level}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Next Reminder</span>
          </div>
          <span className="text-sm text-gray-500">In 30 min</span>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Glasses consumed</p>
              <p className="text-2xl font-bold">{Math.floor(currentIntake / 250)}</p>
            </div>
            <div className="text-4xl opacity-80">🥤</div>
          </div>
        </div>
      </div>
    </div>
  );
};
