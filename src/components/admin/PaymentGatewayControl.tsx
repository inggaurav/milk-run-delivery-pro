
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// This is a mock admin component for controlling payment gateways
const PaymentGatewayControl = () => {
  const [enableRazorpay, setEnableRazorpay] = useState(true);
  const [enablePhonePe, setEnablePhonePe] = useState(false);
  
  // In a real app, these changes would be saved to a database or config
  const handleRazorpayChange = (checked: boolean) => {
    setEnableRazorpay(checked);
    // API call would go here
    console.log('Razorpay enabled:', checked);
  };
  
  const handlePhonePeChange = (checked: boolean) => {
    setEnablePhonePe(checked);
    // API call would go here
    console.log('PhonePe enabled:', checked);
  };
  
  return (
    <Card className="border-sage-100">
      <CardContent className="p-4">
        <h2 className="text-lg font-medium text-sage-800 mb-4">Payment Gateway Settings</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="razorpay" className="text-sage-800">Razorpay</Label>
              <p className="text-xs text-sage-500">Enable Razorpay payment gateway</p>
            </div>
            <Switch 
              id="razorpay"
              checked={enableRazorpay}
              onCheckedChange={handleRazorpayChange}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="phonepe" className="text-sage-800">PhonePe</Label>
              <p className="text-xs text-sage-500">Enable PhonePe payment gateway</p>
            </div>
            <Switch 
              id="phonepe"
              checked={enablePhonePe}
              onCheckedChange={handlePhonePeChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentGatewayControl;
