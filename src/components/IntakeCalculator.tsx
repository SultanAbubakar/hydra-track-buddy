
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calculator, User, Activity } from 'lucide-react';

interface IntakeCalculatorProps {
  onCalculate: (goal: number) => void;
}

export const IntakeCalculator = ({ onCalculate }: IntakeCalculatorProps) => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<'low' | 'moderate' | 'high'>('moderate');

  const calculateIntake = () => {
    if (!weight) return;
    
    const weightNum = parseFloat(weight);
    let baseIntake;
    
    // Base calculation: 35ml per kg for males, 31ml per kg for females
    if (gender === 'male') {
      baseIntake = weightNum * 35;
    } else {
      baseIntake = weightNum * 31;
    }
    
    // Adjust for activity level
    let multiplier = 1;
    switch (activityLevel) {
      case 'low':
        multiplier = 1;
        break;
      case 'moderate':
        multiplier = 1.2;
        break;
      case 'high':
        multiplier = 1.5;
        break;
    }
    
    const finalIntake = Math.round(baseIntake * multiplier);
    onCalculate(finalIntake);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold text-gray-800">Calculate Your Daily Goal</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-gray-600" />
            <Label className="text-sm font-medium text-gray-700">Gender</Label>
          </div>
          <RadioGroup value={gender} onValueChange={(value: 'male' | 'female') => setGender(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="weight" className="text-sm font-medium text-gray-700 mb-2 block">
            Weight (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder="Enter your weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-gray-600" />
            <Label className="text-sm font-medium text-gray-700">Activity Level</Label>
          </div>
          <RadioGroup value={activityLevel} onValueChange={(value: 'low' | 'moderate' | 'high') => setActivityLevel(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="low" />
              <Label htmlFor="low">Low (Office work, minimal exercise)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate" id="moderate" />
              <Label htmlFor="moderate">Moderate (Regular exercise, active lifestyle)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="high" />
              <Label htmlFor="high">High (Intense exercise, physical job)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          onClick={calculateIntake}
          disabled={!weight}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
        >
          Calculate My Goal
        </Button>
        
        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-xs text-blue-600 text-center">
            💡 This calculation is based on general health guidelines. Consult your doctor for personalized advice.
          </p>
        </div>
      </div>
    </div>
  );
};
