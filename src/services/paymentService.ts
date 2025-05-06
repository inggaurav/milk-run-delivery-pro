
// Mock API response for available payment gateways
// In a real app, this would come from an API call based on admin settings
export const getAvailablePaymentGateways = async () => {
  // Simulate API call
  return new Promise<{ razorpay: boolean; phonepe: boolean }>((resolve) => {
    setTimeout(() => {
      resolve({
        razorpay: true,
        phonepe: false
      });
    }, 300);
  });
};

// Razorpay integration
export const initiateRazorpayPayment = (
  amount: number,
  orderId: string,
  onSuccess: (paymentId: string) => void,
  onFailure: (error: any) => void
) => {
  // This is a mock function. In a real app, you would integrate with Razorpay SDK
  console.log(`Initiating Razorpay payment for amount: ${amount}, orderId: ${orderId}`);
  
  // In a real app, you would load the Razorpay script and open the payment modal
  // window.Razorpay.open({...})
  
  // For demo purposes, we'll simulate a successful payment after a short delay
  setTimeout(() => {
    const mockPaymentId = `rzp_${Math.random().toString(36).substring(2, 15)}`;
    onSuccess(mockPaymentId);
  }, 2000);
};

// PhonePe integration
export const initiatePhonePePayment = (
  amount: number,
  orderId: string,
  onSuccess: (paymentId: string) => void,
  onFailure: (error: any) => void
) => {
  // This is a mock function. In a real app, you would integrate with PhonePe SDK
  console.log(`Initiating PhonePe payment for amount: ${amount}, orderId: ${orderId}`);
  
  // In a real app, you would redirect to PhonePe gateway or use their SDK
  
  // For demo purposes, we'll simulate a successful payment after a short delay
  setTimeout(() => {
    const mockPaymentId = `phonepe_${Math.random().toString(36).substring(2, 15)}`;
    onSuccess(mockPaymentId);
  }, 2000);
};
