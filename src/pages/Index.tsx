
import React, { useState, useEffect } from 'react';
import { ProgressRing } from '@/components/ProgressRing';
import { DrinkLogger } from '@/components/DrinkLogger';
import { IntakeCalculator } from '@/components/IntakeCalculator';
import { WaterStats } from '@/components/WaterStats';
import { Header } from '@/components/Header';
import { Droplet, Settings, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const Index = () => {
  const [dailyGoal, setDailyGoal] = useState(2000); // Default 2L
  const [currentIntake, setCurrentIntake] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedGoal = localStorage.getItem('dailyGoal');
    const savedIntake = localStorage.getItem('currentIntake');
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('lastDate');
    
    if (savedGoal) setDailyGoal(parseInt(savedGoal));
    
    // Reset intake if it's a new day
    if (lastDate !== today) {
      setCurrentIntake(0);
      localStorage.setItem('currentIntake', '0');
      localStorage.setItem('lastDate', today);
    } else if (savedIntake) {
      setCurrentIntake(parseInt(savedIntake));
    }
  }, []);

  // Save data to localStorage when values change
  useEffect(() => {
    localStorage.setItem('dailyGoal', dailyGoal.toString());
  }, [dailyGoal]);

  useEffect(() => {
    localStorage.setItem('currentIntake', currentIntake.toString());
  }, [currentIntake]);

  const addIntake = (amount: number) => {
    setCurrentIntake(prev => Math.min(prev + amount, dailyGoal * 1.5)); // Cap at 150% of goal
  };

  const progressPercentage = Math.min((currentIntake / dailyGoal) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-md">
        {/* Main Progress Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Droplet className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-800">Today's Progress</h2>
            </div>
            
            <ProgressRing 
              percentage={progressPercentage}
              currentIntake={currentIntake}
              dailyGoal={dailyGoal}
            />
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-sm text-blue-600 font-medium">Current</p>
                <p className="text-2xl font-bold text-blue-700">{currentIntake}ml</p>
              </div>
              <div className="bg-cyan-50 rounded-2xl p-4">
                <p className="text-sm text-cyan-600 font-medium">Goal</p>
                <p className="text-2xl font-bold text-cyan-700">{dailyGoal}ml</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <DrinkLogger onAddIntake={addIntake} />

        {/* Stats Section */}
        <WaterStats currentIntake={currentIntake} dailyGoal={dailyGoal} />

        {/* Settings */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            Settings
          </h3>
          
          <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:from-blue-600 hover:to-cyan-600"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Personal Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <IntakeCalculator 
                onCalculate={(goal) => {
                  setDailyGoal(goal);
                  setShowCalculator(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Index;
