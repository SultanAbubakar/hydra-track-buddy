
import React from 'react';
import { Droplet } from 'lucide-react';

export const Header = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
      <div className="container mx-auto px-4 py-4 max-w-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">HydraTrack</h1>
              <p className="text-sm text-gray-500">Stay Hydrated</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">{currentDate}</p>
      </div>
    </header>
  );
};
