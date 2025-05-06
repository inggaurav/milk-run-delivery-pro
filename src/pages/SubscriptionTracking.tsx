
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar as CalendarIcon, Package, Leaf, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SubscriptionTracking = () => {
  // Mock data - in a real app this would come from an API
  const subscription = {
    id: 'sub_123456',
    plan: 'Weekly Subscription',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-08-01'),
    daysLeft: 87,
    bottlesToBeDelivered: 24,
    bottlesNotReturned: 3,
    lastDelivery: '2025-05-03',
    nextDelivery: '2025-05-10',
    status: 'active',
  };

  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock delivery schedule data
  const deliveryDates = [
    { date: '2025-05-03', status: 'completed', quantity: 3 },
    { date: '2025-05-10', status: 'scheduled', quantity: 3 },
    { date: '2025-05-17', status: 'scheduled', quantity: 3 },
    { date: '2025-05-24', status: 'scheduled', quantity: 3 },
  ];

  // Mock return tracking data
  const returnLog = [
    { date: '2025-05-03', returned: 2, expected: 3 },
    { date: '2025-04-26', returned: 3, expected: 3 },
    { date: '2025-04-19', returned: 3, expected: 3 },
  ];

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-sage-800 mb-4">My Subscription</h1>
      
      <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
            <Leaf className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h2 className="font-medium text-green-800">{subscription.plan}</h2>
            <p className="text-sm text-green-600">
              {subscription.status === 'active' ? 'Active' : 'Inactive'}
              <Badge 
                variant="outline" 
                className="ml-2 bg-green-100 text-green-700 border-green-200"
              >
                {subscription.daysLeft} days left
              </Badge>
            </p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-sage-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon className="h-4 w-4 text-sage-600" />
                    <span className="text-xs text-sage-600 uppercase font-medium">Next Delivery</span>
                  </div>
                  <p className="text-sage-800 font-medium">{subscription.nextDelivery}</p>
                </div>
                
                <div className="bg-sage-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4 text-sage-600" />
                    <span className="text-xs text-sage-600 uppercase font-medium">Bottles Remaining</span>
                  </div>
                  <p className="text-sage-800 font-medium">{subscription.bottlesToBeDelivered} bottles</p>
                </div>
                
                <div className="bg-sage-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <RotateCcw className="h-4 w-4 text-sage-600" />
                    <span className="text-xs text-sage-600 uppercase font-medium">Bottles to Return</span>
                  </div>
                  <p className="text-sage-800 font-medium">{subscription.bottlesNotReturned} bottles</p>
                </div>
                
                <div className="bg-sage-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon className="h-4 w-4 text-sage-600" />
                    <span className="text-xs text-sage-600 uppercase font-medium">Last Delivery</span>
                  </div>
                  <p className="text-sage-800 font-medium">{subscription.lastDelivery}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="text-sm font-medium text-sage-800 mb-2">Calendar View</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow-sm pointer-events-auto"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-sage-800 mb-3">Upcoming Deliveries</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveryDates.map((delivery, index) => (
                    <TableRow key={index}>
                      <TableCell>{delivery.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`${
                            delivery.status === 'completed' 
                              ? 'bg-green-100 text-green-700 border-green-200' 
                              : 'bg-blue-100 text-blue-700 border-blue-200'
                          }`}
                        >
                          {delivery.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{delivery.quantity} bottles</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="returns">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-sage-800 mb-3">Return History</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Returned</TableHead>
                    <TableHead>Expected</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {returnLog.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log.date}</TableCell>
                      <TableCell>{log.returned}</TableCell>
                      <TableCell>{log.expected}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default SubscriptionTracking;
