
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, ChevronRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock data
  const upcomingOrders = [
    {
      id: 'ORD-001',
      address: '123 Oak Street, Greenville',
      items: ['2x Organic Milk', '1x Yogurt'],
      status: 'processing',
      deliveryDate: '2025-05-10',
      timeSlot: '9:00 AM - 10:00 AM'
    },
    {
      id: 'ORD-002',
      address: '456 Maple Avenue, Greenville',
      items: ['1x Organic Milk', '2x Buttermilk'],
      status: 'confirmed',
      deliveryDate: '2025-05-15',
      timeSlot: '10:30 AM - 11:30 AM'
    },
    {
      id: 'ORD-003',
      address: '789 Pine Road, Greenville',
      items: ['3x Whole Milk', '1x Cream'],
      status: 'scheduled',
      deliveryDate: '2025-05-20',
      timeSlot: '1:00 PM - 2:00 PM'
    }
  ];
  
  const pastOrders = [
    {
      id: 'ORD-897',
      address: '654 Elm Street, Greenville',
      items: ['2x Almond Milk', '1x Butter'],
      status: 'delivered',
      deliveryDate: 'May 3, 2025',
      yourRating: 5
    },
    {
      id: 'ORD-896',
      address: '321 Cherry Lane, Greenville',
      items: ['1x Organic Milk', '2x Yogurt'],
      status: 'delivered',
      deliveryDate: 'May 2, 2025',
      yourRating: 4
    },
    {
      id: 'ORD-895',
      address: '987 Spruce Court, Greenville',
      items: ['3x Whole Milk'],
      status: 'delivered',
      deliveryDate: 'May 1, 2025',
      yourRating: 5
    }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'processing':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Processing</Badge>;
      case 'confirmed':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Confirmed</Badge>;
      case 'scheduled':
        return <Badge className="bg-earth-400 hover:bg-earth-500">Scheduled</Badge>;
      case 'delivered':
        return <Badge className="bg-sage-100 text-sage-700 hover:bg-sage-200">Delivered</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-sage-800 mb-2">My Orders</h1>
        <p className="text-sage-500">Track your orders and deliveries</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-sage-500 data-[state=active]:text-white">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-sage-500 data-[state=active]:text-white">
            Past
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-0 space-y-4">
          {upcomingOrders.map((order) => (
            <Card 
              key={order.id} 
              className="border p-4 rounded-xl transition-all hover:shadow-md bg-white border-sage-100"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-sage-800">{order.id}</h3>
                {getStatusBadge(order.status)}
              </div>
              
              <div className="flex items-center gap-2 text-sage-700 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{order.address}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sage-700 mb-3">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{order.deliveryDate}, {order.timeSlot}</span>
              </div>
              
              <div className="text-sm text-sage-600 bg-sage-50 p-2 rounded-md mb-3">
                {order.items.map((item, i) => (
                  <div key={i}>{item}</div>
                ))}
              </div>

              <Button 
                variant="outline" 
                className="w-full border-sage-200 text-sage-700 hover:bg-sage-50"
              >
                View Order Details
              </Button>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="past" className="mt-0 space-y-4">
          {pastOrders.map((order) => (
            <Card 
              key={order.id} 
              className="border p-4 rounded-xl transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-sage-800">{order.id}</h3>
                {getStatusBadge(order.status)}
              </div>
              
              <div className="flex items-center gap-2 text-sage-700 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{order.address}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sage-700 mb-3">
                <Package className="w-4 h-4" />
                <span className="text-sm">Delivered on {order.deliveryDate}</span>
                
                <div className="ml-auto flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm font-medium">{order.yourRating}</span>
                </div>
              </div>
              
              <div className="text-sm text-sage-600 bg-sage-50 p-2 rounded-md mb-3">
                {order.items.map((item, i) => (
                  <div key={i}>{item}</div>
                ))}
              </div>

              <Button 
                variant="outline" 
                className="w-full border-sage-200 text-sage-700 hover:bg-sage-50"
              >
                Reorder
              </Button>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Orders;
