
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';

const Notifications = () => {
  // Mock data
  const notifications = [
    {
      id: 1,
      title: 'New Order Assigned',
      message: 'You have been assigned order #ORD-004 for delivery between 2:00 PM - 3:00 PM.',
      time: '10 minutes ago',
      type: 'info',
      read: false
    },
    {
      id: 2,
      title: 'Order Ready for Pickup',
      message: 'Order #ORD-001 is ready for pickup at the warehouse.',
      time: '30 minutes ago',
      type: 'success',
      read: false
    },
    {
      id: 3,
      title: 'Weather Alert',
      message: 'Heavy rain expected in your delivery area. Drive safely and plan accordingly.',
      time: '1 hour ago',
      type: 'warning',
      read: false
    },
    {
      id: 4,
      title: 'Weekly Performance Report',
      message: 'Your weekly performance report is available. Great job on maintaining a 5-star rating!',
      time: '1 day ago',
      type: 'info',
      read: true
    },
    {
      id: 5,
      title: 'Profile Verification Complete',
      message: 'Your profile verification has been completed successfully.',
      time: '2 days ago',
      type: 'success',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Bell className="h-5 w-5 text-sage-500" />;
    }
  };

  const getBackgroundColor = (type: string, read: boolean) => {
    if (read) return 'bg-white';
    
    switch(type) {
      case 'info': return 'bg-blue-50';
      case 'warning': return 'bg-amber-50';
      case 'success': return 'bg-green-50';
      default: return 'bg-sage-50';
    }
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-sage-800">Notifications</h1>
          <Badge className="bg-sage-500">{notifications.filter(n => !n.read).length} new</Badge>
        </div>
        <p className="text-sage-500 mt-1">Stay updated with your delivery information</p>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`p-4 border ${getBackgroundColor(notification.type, notification.read)} ${!notification.read ? 'border-l-4' : 'border'} ${
              notification.type === 'info' ? 'border-l-blue-500' :
              notification.type === 'warning' ? 'border-l-amber-500' :
              notification.type === 'success' ? 'border-l-green-500' :
              'border-l-sage-500'
            }`}
          >
            <div className="flex gap-3">
              <div className="mt-1">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-sage-800">{notification.title}</h3>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-sage-500"></div>
                  )}
                </div>
                <p className="text-sm text-sage-600 mb-2">{notification.message}</p>
                <p className="text-xs text-sage-400">{notification.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default Notifications;
