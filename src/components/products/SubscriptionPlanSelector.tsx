
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  savings: string;
}

interface SubscriptionPlanSelectorProps {
  plans: SubscriptionPlan[];
  selectedPlan: string;
  onPlanChange: (planId: string) => void;
  showOneTime?: boolean;
}

const SubscriptionPlanSelector: React.FC<SubscriptionPlanSelectorProps> = ({
  plans,
  selectedPlan,
  onPlanChange,
  showOneTime = true
}) => {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sage-800">Purchase Options</h3>
      <RadioGroup value={selectedPlan} onValueChange={onPlanChange}>
        {showOneTime && (
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-time" id="one-time" />
            <Label htmlFor="one-time" className="text-sm text-sage-800">
              One-time purchase
            </Label>
          </div>
        )}
        
        {plans.map(plan => (
          <div key={plan.id} className="flex items-center space-x-2">
            <RadioGroupItem value={plan.id} id={plan.id} />
            <Label htmlFor={plan.id} className="flex items-center text-sm text-sage-800">
              <Calendar className="h-3.5 w-3.5 mr-1 text-sage-500" />
              <span>{plan.name}</span>
              <span className="text-xs text-sage-500 ml-1">
                (Save {plan.savings})
              </span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default SubscriptionPlanSelector;
