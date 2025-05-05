
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DeliveryDaySelectorProps {
  selectedDays: string[];
  onDayToggle: (day: string) => void;
}

const DeliveryDaySelector: React.FC<DeliveryDaySelectorProps> = ({
  selectedDays,
  onDayToggle
}) => {
  const days = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sage-800">Select Delivery Days</h3>
      <div className="grid grid-cols-2 gap-3">
        {days.map((day) => (
          <div key={day.id} className="flex items-center space-x-2">
            <Checkbox 
              id={day.id}
              checked={selectedDays.includes(day.id)} 
              onCheckedChange={() => onDayToggle(day.id)}
            />
            <Label
              htmlFor={day.id}
              className="text-sm text-sage-700 cursor-pointer"
            >
              {day.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryDaySelector;
