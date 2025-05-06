
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PaymentGatewayControl } from '@/components/admin/PaymentGatewayControl';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const AppSettings = () => {
  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('General settings saved successfully');
  };
  
  const handleSaveNotificationSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Notification settings saved successfully');
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">App Settings</h1>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveGeneralSettings} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="app-name">App Name</Label>
                  <Input 
                    id="app-name" 
                    defaultValue="Milk App" 
                    placeholder="Your application name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="app-description">App Description</Label>
                  <Input 
                    id="app-description" 
                    defaultValue="The best milk delivery app" 
                    placeholder="Short description of your application"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input 
                    id="contact-email" 
                    type="email"
                    defaultValue="contact@milkapp.com" 
                    placeholder="Support email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input 
                    id="contact-phone" 
                    defaultValue="+91 98765 43210" 
                    placeholder="Support phone number"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-xs text-sage-500">Temporarily disable the app</p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
                
                <Button type="submit" className="bg-sage-600 hover:bg-sage-700">
                  Save General Settings
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentGatewayControl />
              
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="razorpay-key">Razorpay API Key</Label>
                  <Input 
                    id="razorpay-key" 
                    placeholder="Enter your Razorpay API key"
                    defaultValue="rzp_test_7HV13hQyfszl45"
                    type="password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phonepe-key">PhonePe API Key</Label>
                  <Input 
                    id="phonepe-key" 
                    placeholder="Enter your PhonePe API key"
                    defaultValue="phnp_test_5JV98hTgqszm32"
                    type="password"
                  />
                </div>
                
                <Button 
                  className="bg-sage-600 hover:bg-sage-700"
                  onClick={() => toast.success('Payment settings saved successfully')}
                >
                  Save Payment Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveNotificationSettings} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="order-confirmation">Order Confirmation</Label>
                    <p className="text-xs text-sage-500">Send notification when order is confirmed</p>
                  </div>
                  <Switch id="order-confirmation" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="delivery-updates">Delivery Updates</Label>
                    <p className="text-xs text-sage-500">Send notification for delivery status</p>
                  </div>
                  <Switch id="delivery-updates" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="promotional">Promotional Notifications</Label>
                    <p className="text-xs text-sage-500">Send marketing and promotional content</p>
                  </div>
                  <Switch id="promotional" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notification-template">Order Confirmation Template</Label>
                  <Input 
                    id="notification-template" 
                    defaultValue="Thank you for your order #{{orderNumber}}. Your delivery is scheduled for {{deliveryDate}}." 
                  />
                  <p className="text-xs text-sage-500">Use {{variables}} for dynamic content</p>
                </div>
                
                <Button type="submit" className="bg-sage-600 hover:bg-sage-700">
                  Save Notification Settings
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppSettings;
