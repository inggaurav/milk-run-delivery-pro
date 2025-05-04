
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Search, ShoppingCart, Calendar, Clock, ChevronRight, Star
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const { user } = useAuth();

  const categories = [
    { name: 'Milk', icon: '🥛', color: 'bg-sage-100' },
    { name: 'Yogurt', icon: '🍦', color: 'bg-blue-100' },
    { name: 'Cheese', icon: '🧀', color: 'bg-yellow-100' },
    { name: 'Butter', icon: '🧈', color: 'bg-amber-100' },
    { name: 'Cream', icon: '🍶', color: 'bg-gray-100' },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Organic A2 Milk',
      description: 'Farm-fresh organic A2 milk',
      price: 55,
      unit: '500ml',
      image: '/assets/a2milk.jpg',
      rating: 4.8,
      reviews: 245
    },
    {
      id: 2,
      name: 'Greek Yogurt',
      description: 'Creamy Greek-style yogurt',
      price: 65,
      unit: '400g',
      image: '/assets/yogurt.jpg',
      rating: 4.6,
      reviews: 189
    },
    {
      id: 3,
      name: 'Fresh Paneer',
      description: 'Soft and fresh cottage cheese',
      price: 120,
      unit: '200g',
      image: '/assets/paneer.jpg',
      rating: 4.7,
      reviews: 156
    },
  ];

  const subscriptionPlans = [
    {
      id: 1,
      name: 'Daily Fresh',
      deliveries: 30,
      price: 1650, 
      savings: '10%',
      popular: true,
      color: 'bg-sage-500'
    },
    {
      id: 2,
      name: 'Weekly Pack',
      deliveries: 8,
      price: 440,
      savings: '5%',
      popular: false,
      color: 'bg-sage-400'
    },
    {
      id: 3,
      name: 'Monthly Box',
      deliveries: 4,
      price: 220,
      savings: '2%',
      popular: false,
      color: 'bg-sage-300'
    },
  ];
  
  return (
    <PageContainer className="space-y-6 pb-20">
      {/* Header with greeting and search */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sage-800">
            Good Morning, {user?.name?.split(' ')[0] || 'Friend'}
          </h1>
          <p className="text-sage-500">Ready for your daily nutrition?</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm">
          <Search className="h-5 w-5 text-sage-600" />
        </Button>
      </div>
      
      {/* Promotion Banner */}
      <Card className="overflow-hidden border-none">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-sage-500 to-sage-400 text-white p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-lg">15% OFF</h3>
                <p className="text-sm opacity-90">on your first subscription</p>
                <Button size="sm" className="mt-2 bg-white text-sage-600 hover:bg-sage-100">
                  Claim Now
                </Button>
              </div>
              <div className="text-4xl">🥛</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-sage-800">Categories</h2>
          <Button variant="ghost" className="text-sage-600 p-0 h-auto font-medium text-sm flex items-center">
            See All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-5 gap-3">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col items-center space-y-1">
              <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm`}>
                {category.icon}
              </div>
              <span className="text-xs text-sage-700 text-center">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Featured Products */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-sage-800">Featured Products</h2>
          <Button variant="ghost" className="text-sage-600 p-0 h-auto font-medium text-sm flex items-center">
            See All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border-sage-100 hover:border-sage-200 cursor-pointer transition-all">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-24 h-24 bg-sage-100 rounded-l flex items-center justify-center">
                    <span className="text-4xl">{product.id === 1 ? '🥛' : product.id === 2 ? '🍦' : '🧀'}</span>
                  </div>
                  <div className="flex-1 p-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-sage-800">{product.name}</h3>
                      <div className="flex items-center text-amber-500">
                        <Star className="fill-amber-500 stroke-amber-500 h-3 w-3" />
                        <span className="text-xs ml-1">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-sage-500 text-sm line-clamp-1">{product.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium text-sage-800">₹{product.price}<span className="text-xs text-sage-500">/{product.unit}</span></span>
                      <Button size="sm" className="rounded-full h-8 w-8 p-0">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Subscription Plans */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-sage-800">Subscription Plans</h2>
          <Button variant="ghost" className="text-sage-600 p-0 h-auto font-medium text-sm flex items-center">
            See All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent>
            {subscriptionPlans.map((plan) => (
              <CarouselItem key={plan.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className={`border-none ${plan.popular ? 'bg-sage-50 ring-1 ring-sage-200' : ''} relative h-full`}>
                  {plan.popular && (
                    <div className="absolute -top-2 -right-2 bg-sage-500 text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  <CardContent className="p-4 flex flex-col h-full">
                    <h3 className="font-bold text-sage-800">{plan.name}</h3>
                    <div className="flex items-center mt-1 mb-3">
                      <Calendar className="h-4 w-4 text-sage-500 mr-1" />
                      <span className="text-sm text-sage-500">{plan.deliveries} deliveries</span>
                    </div>
                    <div className="flex items-end mt-auto">
                      <span className="text-lg font-bold text-sage-800">₹{plan.price}</span>
                      <span className="text-sage-500 text-sm ml-1 mb-0.5">/month</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-sage-600 font-medium">Save {plan.savings}</span>
                    </div>
                    <Progress 
                      value={70} 
                      className="h-1.5 mt-3" 
                      indicatorClassName={plan.color}
                    />
                    <Button className="mt-4 w-full" variant={plan.popular ? "default" : "outline"}>
                      Subscribe Now
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-white" />
          <CarouselNext className="right-0 bg-white" />
        </Carousel>
      </div>
      
      {/* Today's Deliveries */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-sage-800">Today's Delivery</h2>
          <Button variant="ghost" className="text-sage-600 p-0 h-auto font-medium text-sm flex items-center">
            Track <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <Card className="overflow-hidden border-sage-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-sage-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-sage-600" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-sage-800">Morning Delivery</h3>
                  <p className="text-sm text-sage-500">Arriving in 25-35 mins</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </div>
            <Progress 
              value={40} 
              className="h-1.5 mt-4" 
              indicatorClassName="bg-sage-500"
            />
            <div className="flex justify-between mt-2 text-xs text-sage-500">
              <span>Order Confirmed</span>
              <span>Out for Delivery</span>
              <span>Delivered</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Home;
