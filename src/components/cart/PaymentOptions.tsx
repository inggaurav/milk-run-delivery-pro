
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { getAvailablePaymentGateways } from '@/services/paymentService';
import { toast } from 'sonner';

interface PaymentOptionsProps {
  selectedOption: string;
  onOptionChange: (option: string) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  selectedOption,
  onOptionChange
}) => {
  const [availableGateways, setAvailableGateways] = useState({
    razorpay: false,
    phonepe: false,
    cashOnDelivery: true // Always available
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableGateways = async () => {
      try {
        setIsLoading(true);
        const gateways = await getAvailablePaymentGateways();
        setAvailableGateways({
          ...gateways,
          cashOnDelivery: true // Always available
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch payment gateways:', error);
        toast.error('Failed to load payment options');
        setIsLoading(false);
      }
    };

    fetchAvailableGateways();
  }, []);

  // If no payment option is selected and we have gateways available, select the first available one
  useEffect(() => {
    if (!selectedOption && !isLoading) {
      if (availableGateways.razorpay) {
        onOptionChange('razorpay');
      } else if (availableGateways.phonepe) {
        onOptionChange('phonepe');
      } else {
        onOptionChange('cod');
      }
    }
  }, [selectedOption, isLoading, availableGateways, onOptionChange]);

  return (
    <Card className="border-sage-100 mb-4">
      <CardContent className="p-4">
        <h3 className="font-medium text-sage-800 mb-3">Payment Method</h3>
        
        {isLoading ? (
          <div className="py-2 text-sage-500 text-sm">Loading payment options...</div>
        ) : (
          <RadioGroup value={selectedOption} onValueChange={onOptionChange} className="space-y-3">
            {availableGateways.razorpay && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="razorpay" id="razorpay" />
                <Label htmlFor="razorpay" className="flex items-center cursor-pointer">
                  <div className="w-12 h-8 mr-2 bg-white border rounded flex items-center justify-center">
                    <span className="font-medium text-blue-600">Razor</span>
                  </div>
                  <span>Razorpay</span>
                </Label>
              </div>
            )}
            
            {availableGateways.phonepe && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phonepe" id="phonepe" />
                <Label htmlFor="phonepe" className="flex items-center cursor-pointer">
                  <div className="w-12 h-8 mr-2 bg-white border rounded flex items-center justify-center">
                    <span className="font-medium text-indigo-600">PhonePe</span>
                  </div>
                  <span>PhonePe</span>
                </Label>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="cursor-pointer">Cash on Delivery</Label>
            </div>
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentOptions;
