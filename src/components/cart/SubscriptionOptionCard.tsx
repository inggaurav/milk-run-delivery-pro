
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Leaf, Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SubscriptionOption {
  id: string;
  name: string;
  description: string;
  savings: string;
}

interface SubscriptionOptionCardProps {
  selectedOption: string;
  onOptionChange: (option: string) => void;
}

const SubscriptionOptionCard: React.FC<SubscriptionOptionCardProps> = ({
  selectedOption,
  onOptionChange
}) => {
  const subscriptionOptions: SubscriptionOption[] = [
    {
      id: "one-time",
      name: "One-time purchase",
      description: "No recurring deliveries",
      savings: "0%"
    },
    {
      id: "subscription-weekly",
      name: "Weekly subscription",
      description: "Delivered every week",
      savings: "5%"
    },
    {
      id: "subscription-monthly",
      name: "Monthly subscription",
      description: "Delivered once a month",
      savings: "8%"
    }
  ];

  return (
    <Card className="border-sage-100 mb-4">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-sage-600" />
          <h3 className="font-medium text-sage-800">Subscription Options</h3>
        </div>
        
        <p className="text-sm text-sage-600">
          Save up to 8% with a regular delivery subscription
        </p>
        
        <RadioGroup value={selectedOption} onValueChange={onOptionChange} className="pt-2">
          {subscriptionOptions.map(option => (
            <div key={option.id} className="flex items-start mb-3">
              <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
              <div className="ml-2">
                <Label htmlFor={option.id} className="flex items-center text-sage-800 font-medium cursor-pointer">
                  {option.name}
                  {option.id !== "one-time" && (
                    <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                      Save {option.savings}
                    </span>
                  )}
                </Label>
                <p className="text-xs text-sage-500 mt-0.5">{option.description}</p>
                
                {option.id !== "one-time" && (
                  <div className="flex items-center mt-1 text-xs text-sage-600">
                    <Leaf className="h-3 w-3 mr-1 text-sage-500" />
                    <span>Cancel or modify anytime</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </RadioGroup>
        
        {selectedOption !== "one-time" && (
          <div className="bg-sage-50 p-3 rounded-md mt-3">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-4 w-4 text-sage-600" />
              <span className="text-sm font-medium text-sage-700">Subscription Benefits</span>
            </div>
            <ul className="text-xs text-sage-600 space-y-1.5 ml-6 list-disc">
              <li>Regular deliveries without reordering</li>
              <li>Early access to new products</li>
              <li>Flexible delivery schedule</li>
              <li>Priority customer support</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionOptionCard;
