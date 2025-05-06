
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ChevronRight, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import SubscriptionOptionCard from '@/components/cart/SubscriptionOptionCard';
import PaymentOptions from '@/components/cart/PaymentOptions';
import { toast } from 'sonner';
import { initiateRazorpayPayment, initiatePhonePePayment } from '@/services/paymentService';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Organic A2 Milk',
      price: 55,
      unit: '500ml',
      quantity: 1,
      icon: '🥛',
      subscription: null
    },
    {
      id: 2,
      name: 'Greek Yogurt',
      price: 65,
      unit: '400g',
      quantity: 2,
      icon: '🍦',
      subscription: { frequency: 'daily', savings: '10%' }
    },
    {
      id: 4,
      name: 'Fresh Paneer',
      price: 120,
      unit: '200g',
      quantity: 1,
      icon: '🧀',
      subscription: null
    }
  ]);
  
  const [subscriptionOption, setSubscriptionOption] = useState("one-time");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    // Calculate subscription discounts
    let discount = cartItems.reduce((sum, item) => {
      if (item.subscription) {
        // Parse savings percentage from string (e.g., '10%' -> 0.1)
        const savingsPercentage = parseFloat(item.subscription.savings) / 100;
        return sum + (item.price * item.quantity * savingsPercentage);
      }
      return sum;
    }, 0);
    
    // Add global subscription discount if applicable
    if (subscriptionOption === "subscription-weekly") {
      const subtotal = calculateSubtotal();
      discount += subtotal * 0.05; // 5% discount for weekly subscription
    } else if (subscriptionOption === "subscription-monthly") {
      const subtotal = calculateSubtotal();
      discount += subtotal * 0.08; // 8% discount for monthly subscription
    }
    
    return Math.round(discount);
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const handleCheckout = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    
    setIsProcessing(true);
    
    // Generate a mock order ID
    const orderId = `order_${Math.random().toString(36).substring(2, 15)}`;
    
    const handlePaymentSuccess = (paymentId: string) => {
      toast.success("Payment successful!");
      setIsProcessing(false);
      
      // If subscription was selected, redirect to subscription tracking
      if (subscriptionOption !== "one-time") {
        navigate('/subscription-tracking');
      } else {
        // For one-time orders, you could redirect to an order confirmation page
        console.log("Processing one-time checkout with payment ID:", paymentId);
        navigate('/');
      }
    };
    
    const handlePaymentFailure = (error: any) => {
      toast.error("Payment failed. Please try again.");
      console.error("Payment error:", error);
      setIsProcessing(false);
    };
    
    // Process payment based on selected method
    if (paymentMethod === "razorpay") {
      initiateRazorpayPayment(total, orderId, handlePaymentSuccess, handlePaymentFailure);
    } else if (paymentMethod === "phonepe") {
      initiatePhonePePayment(total, orderId, handlePaymentSuccess, handlePaymentFailure);
    } else {
      // Cash on delivery
      toast.success("Order placed successfully!");
      setIsProcessing(false);
      
      if (subscriptionOption !== "one-time") {
        navigate('/subscription-tracking');
      } else {
        navigate('/');
      }
    }
  };
  
  return (
    <PageContainer className="space-y-5 pb-20">
      <h1 className="text-2xl font-bold text-sage-800">My Cart</h1>
      
      {cartItems.length > 0 ? (
        <>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden border-sage-100">
                <CardContent className="p-3">
                  <div className="flex items-center">
                    <div className="bg-sage-50 w-14 h-14 rounded-lg flex items-center justify-center text-2xl mr-3">
                      {item.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-sage-800">{item.name}</h3>
                          <p className="text-sage-500 text-sm">₹{item.price}/{item.unit}</p>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-sage-400 hover:text-red-500 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {item.subscription && (
                        <div className="flex items-center bg-sage-50 rounded-full text-xs px-3 py-1 text-sage-700 mt-1 w-fit">
                          <Calendar className="h-3 w-3 mr-1 text-sage-500" />
                          <span>{item.subscription.frequency} • Save {item.subscription.savings}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-sage-200 rounded-full">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 rounded-full p-0 text-sage-500"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 rounded-full p-0 text-sage-500"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <span className="font-medium">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <SubscriptionOptionCard 
            selectedOption={subscriptionOption} 
            onOptionChange={setSubscriptionOption} 
          />
          
          <PaymentOptions
            selectedOption={paymentMethod}
            onOptionChange={setPaymentMethod}
          />
          
          <Card className="border-sage-100">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-medium text-sage-800">Order Summary</h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-sage-600">Subtotal</span>
                  <span className="text-sage-800">₹{subtotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sage-600">Subscription Discount</span>
                    <span className="text-green-600">-₹{discount}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-sage-600">Delivery Fee</span>
                  <span className="text-sage-800">₹{deliveryFee}</span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-medium">
                  <span className="text-sage-800">Total</span>
                  <span className="text-sage-800">₹{total}</span>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleCheckout} 
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Proceed to Checkout"}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={() => navigate('/browse')}
                disabled={isProcessing}
              >
                <span>Continue Shopping</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-center py-12 space-y-4">
          <div className="text-6xl mb-2">🛒</div>
          <h2 className="text-xl font-medium text-sage-800">Your cart is empty</h2>
          <p className="text-sage-500">Add some products to your cart and they'll appear here</p>
          <Button className="mt-4">
            Browse Products
          </Button>
        </div>
      )}
    </PageContainer>
  );
};

export default Cart;
