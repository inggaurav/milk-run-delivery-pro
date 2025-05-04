
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PageContainer from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, Settings, LogOut, CreditCard, Bell, HelpCircle, 
  ChevronRight, Star, Package, Award
} from 'lucide-react';

const Profile = () => {
  const { user, logout, updateOnlineStatus } = useAuth();

  if (!user) {
    return null;
  }

  const handleOnlineToggle = (checked: boolean) => {
    updateOnlineStatus(checked);
  };

  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-sage-800">My Profile</h1>
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <Card className="p-5 bg-white rounded-2xl border-sage-100">
          <div className="flex items-center gap-4">
            <div className="bg-sage-100 w-16 h-16 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-sage-500" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-medium text-sage-800">{user.name}</h2>
              <p className="text-sage-500 text-sm">{user.email}</p>
              <p className="text-sage-600 text-sm">{user.phone}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">Status</span>
                <span className={`text-sm ${user.isOnline ? 'text-sage-600' : 'text-sage-400'}`}>
                  {user.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <Switch
                checked={user.isOnline}
                onCheckedChange={handleOnlineToggle}
                className="data-[state=checked]:bg-sage-500"
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-6 space-y-4">
        <h2 className="text-lg font-medium text-sage-800">Performance</h2>
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center border-sage-100">
            <div className="flex flex-col items-center">
              <Star className="h-5 w-5 text-sage-500 mb-1" />
              <span className="text-xl font-bold">{user.deliveryRating || 5.0}</span>
              <span className="text-xs text-sage-500">Rating</span>
            </div>
          </Card>
          <Card className="p-3 text-center border-sage-100">
            <div className="flex flex-col items-center">
              <Package className="h-5 w-5 text-sage-500 mb-1" />
              <span className="text-xl font-bold">{user.completedDeliveries || 0}</span>
              <span className="text-xs text-sage-500">Deliveries</span>
            </div>
          </Card>
          <Card className="p-3 text-center border-sage-100">
            <div className="flex flex-col items-center">
              <Award className="h-5 w-5 text-sage-500 mb-1" />
              <span className="text-xl font-bold">98%</span>
              <span className="text-xs text-sage-500">Success</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-medium text-sage-800">Account Settings</h2>
        
        <Card className="divide-y divide-sage-100 border-sage-100">
          <div className="p-4 flex items-center">
            <User className="h-5 w-5 text-sage-500 mr-3" />
            <span className="flex-1">Personal Information</span>
            <ChevronRight className="h-5 w-5 text-sage-400" />
          </div>
          <div className="p-4 flex items-center">
            <CreditCard className="h-5 w-5 text-sage-500 mr-3" />
            <span className="flex-1">Payment Methods</span>
            <ChevronRight className="h-5 w-5 text-sage-400" />
          </div>
          <div className="p-4 flex items-center">
            <Bell className="h-5 w-5 text-sage-500 mr-3" />
            <span className="flex-1">Notifications</span>
            <ChevronRight className="h-5 w-5 text-sage-400" />
          </div>
          <div className="p-4 flex items-center">
            <HelpCircle className="h-5 w-5 text-sage-500 mr-3" />
            <span className="flex-1">Help & Support</span>
            <ChevronRight className="h-5 w-5 text-sage-400" />
          </div>
        </Card>
      </div>

      <Button 
        variant="ghost" 
        className="w-full border border-destructive/20 text-destructive hover:bg-destructive/10"
        onClick={logout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </PageContainer>
  );
};

export default Profile;
