
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const MapView = () => {
  return (
    <PageContainer withPadding={false} fullHeight={false} className="relative">
      <div className="h-screen bg-sage-100 relative">
        {/* Map Placeholder */}
        <div className="h-full w-full bg-sage-200 relative">
          <div className="absolute inset-0 flex items-center justify-center flex-col text-sage-600">
            <MapPin className="h-12 w-12 mb-2" />
            <p>Map View</p>
            <p className="text-sm text-sage-500">(Google Maps will be integrated here)</p>
          </div>
          
          {/* Map Control Buttons */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-3">
            <Button size="icon" className="bg-white text-sage-700 hover:bg-sage-50 shadow-md rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button size="icon" className="bg-white text-sage-700 hover:bg-sage-50 shadow-md rounded-full">
              <Navigation className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Search Bar Overlay */}
        <div className="absolute top-4 left-0 right-0 px-4">
          <div className="relative">
            <Input 
              className="w-full bg-white pl-10 pr-4 py-2 rounded-xl shadow-md border-sage-100"
              placeholder="Search location..."
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-5 w-5" />
          </div>
        </div>
        
        {/* Route Information */}
        <Card className="absolute bottom-20 left-4 right-4 p-4 bg-white rounded-xl shadow-lg border-sage-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-sage-100 p-2 rounded-full">
              <Navigation className="h-5 w-5 text-sage-600" />
            </div>
            <div>
              <h3 className="font-medium">Route Overview</h3>
              <p className="text-sm text-sage-500">3 deliveries · 4.5 miles total</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sage-500 rounded-full"></div>
              <p className="text-sm">123 Oak Street, Greenville</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sage-500 rounded-full"></div>
              <p className="text-sm">456 Maple Avenue, Greenville</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-sage-500 rounded-full"></div>
              <p className="text-sm">789 Pine Road, Greenville</p>
            </div>
          </div>
          
          <Button className="w-full bg-sage-500 hover:bg-sage-600 text-white">
            Start Navigation
          </Button>
        </Card>
      </div>
    </PageContainer>
  );
};

export default MapView;
