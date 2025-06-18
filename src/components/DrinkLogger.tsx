
import React from 'react';
import { Button } from '@/components/ui/button';
import { Droplet, Plus } from 'lucide-react';

interface DrinkLoggerProps {
  onAddIntake: (amount: number) => void;
}

export const DrinkLogger = ({ onAddIntake }: DrinkLoggerProps) => {
  const quickAmounts = [
    { amount: 100, label: '100ml', icon: '🥃' },
    { amount: 250, label: '250ml', icon: '☕' },
    { amount: 500, label: '500ml', icon: '🥤' },
    { amount: 750, label: '750ml', icon: '🍶' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Plus className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">Log Your Drink</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {quickAmounts.map((item) => (
          <Button
            key={item.amount}
            onClick={() => onAddIntake(item.amount)}
            variant="outline"
            className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 hover:scale-105"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-sm font-medium text-gray-700">{item.label}</span>
          </Button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-2xl">
        <p className="text-xs text-blue-600 text-center">
          💡 Tip: Tap any amount to quickly log your water intake
        </p>
      </div>
    </div>
  );
};
