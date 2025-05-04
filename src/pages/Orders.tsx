
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, ChevronRight } from 'lucide-react';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock data
  const upcomingOrders = [
    {
      id: 'ORD-001',
      address: '123 Oak Street, Greenville',
      distance: '0.8 mi',
      items: ['2x Organic Milk', '1x Yogurt'],
      status: 'ready',
      timeSlot: '9:00 AM - 10:00 AM'
    },
    {
      id: 'ORD-002',
      address: '456 Maple Avenue, Greenville',
      distance: '1.2 mi',
      items: ['1x Organic Milk', '2x Buttermilk'],
      status: 'pending',
      timeSlot: '10:30 AM - 11:30 AM'
    },
    {
      id: 'ORD-003',
      address: '789 Pine Road, Greenville',
      distance: '2.5 mi',
      items: ['3x Whole Milk', '1x Cream'],
      status: 'pending',
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
      customerRating: 5
    },
    {
      id: 'ORD-896',
      address: '321 Cherry Lane, Greenville',
      items: ['1x Organic Milk', '2x Yogurt'],
      status: 'delivered',
      deliveryDate: 'May 2, 2025',
      customerRating: 4
    },
    {
      id: 'ORD-895',
      address: '987 Spruce Court, Greenville',
      items: ['3x Whole Milk'],
      status: 'delivered',
      deliveryDate: 'May 1, 2025',
      customerRating: 5
    }
  ];

  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-sage-800 mb-2">Orders</h1>
        <p className="text-sage-500">Manage your delivery schedule</p>
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
              className={`border p-4 rounded-xl transition-all hover:shadow-md ${
                order.status === 'ready' ? 'bg-sage-50 border-sage-200' : 'bg-white border-sage-100'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-sage-800">{order.id}</h3>
                <Badge className={
                  order.status === 'ready' 
                    ? 'bg-sage-500 hover:bg-sage-600' 
                    : 'bg-earth-400 hover:bg-earth-500'
                }>
                  {order.status === 'ready' ? 'Ready for Pickup' : 'Scheduled'}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sage-700 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{order.address}</span>
                <Badge variant="outline" className="ml-auto text-xs border-sage-200">
                  {order.distance}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sage-700 mb-3">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{order.timeSlot}</span>
              </div>
              
              <div className="text-sm text-sage-600 bg-sage-50 p-2 rounded-md">
                {order.items.map((item, i) => (
                  <div key={i}>{item}</div>
                ))}
              </div>

              <div className="flex justify-end mt-2">
                <ChevronRight className="text-sage-400" />
              </div>
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
                <Badge className="bg-sage-100 text-sage-700 hover:bg-sage-200">
                  Delivered
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-sage-700 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{order.address}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sage-700 mb-3">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{order.deliveryDate}</span>
                
                <div className="ml-auto flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm font-medium">{order.customerRating}</span>
                </div>
              </div>
              
              <div className="text-sm text-sage-600 bg-sage-50 p-2 rounded-md">
                {order.items.map((item, i) => (
                  <div key={i}>{item}</div>
                ))}
              </div>

              <div className="flex justify-end mt-2">
                <ChevronRight className="text-sage-400" />
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Orders;
