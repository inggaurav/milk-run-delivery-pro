
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PageContainer from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MapPin, Package, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();

  // Mock data for today's orders
  const todayOrders = [
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

  const progressPercentage = 33; // 1 out of 3 orders

  return (
    <PageContainer withPadding={false} fullHeight={false}>
      {/* Header */}
      <div className="bg-sage-500 text-white px-6 pt-8 pb-16 rounded-b-3xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sage-100">Good morning,</p>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
          </div>
          <div className="flex flex-col items-end">
            <Badge className="bg-white text-sage-700 hover:bg-sage-50 mb-1">
              {user?.isOnline ? 'Online' : 'Offline'}
            </Badge>
            <div className="flex items-center text-sm">
              <span className="mr-1">⭐</span>
              <span>{user?.deliveryRating || 5.0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              <h2 className="font-medium">Today's Deliveries</h2>
            </div>
            <span className="text-sm font-medium">{progressPercentage}% Complete</span>
          </div>
          
          <Progress value={progressPercentage} className="h-2 bg-white/20" indicatorClassName="bg-white" />
          
          <div className="flex justify-between items-center mt-3 text-sm">
            <span>1 Delivered</span>
            <span>2 Remaining</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="-mt-8 px-4">
        <Card className="bg-white rounded-2xl shadow-lg p-5 border-sage-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Upcoming Orders</h2>
            <Link to="/orders">
              <Button variant="ghost" size="sm" className="text-sage-600 hover:text-sage-700 hover:bg-sage-50">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {todayOrders.map((order) => (
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

                {order.status === 'ready' && (
                  <Button className="w-full mt-3 bg-sage-500 hover:bg-sage-600 text-white">
                    Start Delivery
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4 mt-6 mb-8">
          <Card className="p-4 border-sage-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-sage-600" />
              <h3 className="font-medium">Earnings</h3>
            </div>
            <p className="text-2xl font-bold text-sage-800">$128.50</p>
            <p className="text-xs text-sage-500 mt-1">This week</p>
          </Card>

          <Card className="p-4 border-sage-100">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-sage-600" />
              <h3 className="font-medium">Updates</h3>
            </div>
            <p className="text-2xl font-bold text-sage-800">3</p>
            <p className="text-xs text-sage-500 mt-1">New notifications</p>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
