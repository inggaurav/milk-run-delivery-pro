
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Users, Bell, Image } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-sage-500">Total Products</p>
              <p className="text-2xl font-bold">15</p>
            </div>
            <ShoppingBag className="h-10 w-10 text-sage-400" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-sage-500">Total Users</p>
              <p className="text-2xl font-bold">243</p>
            </div>
            <Users className="h-10 w-10 text-sage-400" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-sage-500">Media Files</p>
              <p className="text-2xl font-bold">52</p>
            </div>
            <Image className="h-10 w-10 text-sage-400" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-sage-500">Notifications</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <Bell className="h-10 w-10 text-sage-400" />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-2 rounded-md hover:bg-sage-50">
                <div className="bg-sage-100 p-2 rounded-full">
                  <ShoppingBag className="h-4 w-4 text-sage-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Product updated</p>
                  <p className="text-xs text-sage-500">Fresh Cow Milk - 10 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-2 rounded-md hover:bg-sage-50">
                <div className="bg-sage-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-sage-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-sage-500">user123@example.com - 45 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-2 rounded-md hover:bg-sage-50">
                <div className="bg-sage-100 p-2 rounded-full">
                  <Bell className="h-4 w-4 text-sage-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Notification sent</p>
                  <p className="text-xs text-sage-500">Summer discount campaign - 2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Payment Gateway Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Reuse the existing PaymentGatewayControl component */}
              <div className="h-[180px] flex items-center justify-center">
                <PaymentGatewayControlAdmin />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Create a version of the payment gateway control specifically for admin
const PaymentGatewayControlAdmin = () => {
  return (
    <div className="w-full">
      <iframe
        className="w-full h-[180px] border-0"
        src="/admin/payment-gateway-control"
        title="Payment Gateway Control"
      />
    </div>
  );
};

export default AdminDashboard;
