
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  Calendar, 
  Check, 
  Clock, 
  Package, 
  CalendarCheck 
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import DeliveryDaySelector from '@/components/products/DeliveryDaySelector';

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedPlanType, setSelectedPlanType] = useState<string>("monthly");

  const handleDayToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const plans = {
    daily: [
      {
        id: 'daily-fresh',
        name: 'Daily Fresh',
        description: 'Fresh dairy delivered every morning',
        price: 1650,
        deliveries: 30,
        savings: '10%',
        popular: true,
        features: [
          'Daily doorstep delivery before 7am',
          'Premium packaging to maintain freshness',
          'Customize products day by day',
          'No long-term commitment',
          'Premium customer support'
        ]
      }
    ],
    alternate: [
      {
        id: 'alternate-days',
        name: 'Alternate Days',
        description: 'Fresh dairy every alternate day',
        price: 825,
        deliveries: 15,
        savings: '8%',
        popular: false,
        features: [
          'Delivery on alternate days',
          'Premium packaging to maintain freshness',
          'Customize products for each delivery',
          '1-month minimum subscription',
          'Priority customer support'
        ]
      }
    ],
    weekly: [
      {
        id: 'weekly-essentials',
        name: 'Weekly Essentials',
        description: 'Weekly delivery of dairy essentials',
        price: 440,
        deliveries: 8,
        savings: '5%',
        popular: false,
        features: [
          'Delivery once per week',
          'Bulk packaging for value',
          'Customize your weekly box',
          'No minimum commitment',
          'Standard customer support'
        ]
      },
      {
        id: 'weekend-special',
        name: 'Weekend Special',
        description: 'Weekend deliveries for your needs',
        price: 475,
        deliveries: 8,
        savings: '6%',
        popular: false,
        features: [
          'Delivery on weekends only',
          'Premium packaging',
          'Special weekend products available',
          '1-month minimum subscription',
          'Standard customer support'
        ]
      }
    ],
    monthly: [
      {
        id: 'monthly-box',
        name: 'Monthly Box',
        description: 'Monthly delivery of dairy products',
        price: 220,
        deliveries: 4,
        savings: '2%',
        popular: false,
        features: [
          'Once a month large delivery',
          'Bulk packaging for maximum value',
          'Extended shelf-life products',
          'No minimum commitment',
          'Email customer support'
        ]
      },
      {
        id: 'family-pack',
        name: 'Family Pack',
        description: 'Larger quantities for family needs',
        price: 250,
        deliveries: 4,
        savings: '4%',
        popular: false,
        features: [
          'Extra-large portions for families',
          'Bulk discounts on popular items',
          'Add special treats for kids',
          '2-month minimum subscription',
          'Priority customer support'
        ]
      }
    ],
    custom: [
      {
        id: 'custom-days',
        name: 'Custom Days',
        description: 'Choose your own delivery days',
        price: 0,
        pricePerDelivery: 55,
        deliveries: 'Custom',
        savings: 'Varies',
        popular: false,
        features: [
          'You choose which days to receive deliveries',
          'Flexible scheduling to match your routine',
          'Premium packaging to maintain freshness',
          'No minimum commitment',
          'Premium customer support'
        ]
      }
    ]
  };

  const faqs = [
    {
      question: "How does subscription billing work?",
      answer: "Subscriptions are billed at the beginning of each billing cycle. You can choose monthly or pay-as-you-go options depending on the plan. Payment is processed automatically using your saved payment method."
    },
    {
      question: "Can I modify my subscription?",
      answer: "Yes, you can modify, pause, or cancel your subscription at any time. Changes to your next delivery can be made up to 24 hours before the scheduled delivery time."
    },
    {
      question: "How fresh are the products?",
      answer: "All our products are sourced fresh from local farms daily. Most dairy products are processed and packaged within 24 hours of milking to ensure maximum freshness."
    },
    {
      question: "What if I'm not home for delivery?",
      answer: "Our delivery team will leave your package in the location you specify in your delivery instructions. All our packaging is designed to keep products fresh for up to 4 hours after delivery."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "We offer a 100% satisfaction guarantee. If you're not completely satisfied with your delivery, contact our customer support within 24 hours and we'll make it right with either a replacement or a refund."
    }
  ];

  const calculateCustomPrice = () => {
    const plan = plans.custom[0];
    return selectedDays.length * plan.pricePerDelivery;
  };

  const renderPlans = (planCategory: keyof typeof plans) => {
    return plans[planCategory].map(plan => (
      <Card key={plan.id} className={`overflow-hidden ${plan.popular ? 'border-sage-500 border-2' : 'border-sage-100'} relative`}>
        <CardContent className="p-5">
          {plan.popular && (
            <div className="absolute top-0 right-0 bg-sage-500 text-white text-xs px-2 py-1 font-medium">
              Most Popular
            </div>
          )}
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-sage-100 rounded-full">
              <Calendar className="h-5 w-5 text-sage-600" />
            </div>
            <div>
              <h3 className="font-bold text-sage-800 text-lg">{plan.name}</h3>
              <p className="text-sage-500 text-sm">{plan.description}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <span className="text-2xl font-bold text-sage-800">
              ₹{planCategory === 'custom' ? calculateCustomPrice() : plan.price}
            </span>
            <span className="text-sage-500 ml-1">
              {planCategory === 'custom' ? 
                `/month for ${selectedDays.length} day(s)` : 
                `/month for ${plan.deliveries} deliveries`}
            </span>
            <p className="text-sage-600 mt-1">
              <span className="font-medium">Save {plan.savings}</span>
              {planCategory !== 'custom' && ' compared to one-time purchases'}
            </p>
          </div>
          
          {planCategory === 'custom' && (
            <div className="mb-4 bg-sage-50 p-3 rounded-md">
              <DeliveryDaySelector 
                selectedDays={selectedDays}
                onDayToggle={handleDayToggle}
              />
            </div>
          )}
          
          <div className="mb-6">
            <h4 className="font-medium text-sage-800 mb-2">Plan Features:</h4>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 w-4 text-sage-500 mr-2 mt-1 shrink-0" />
                  <span className="text-sage-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
            Subscribe Now
          </Button>
        </CardContent>
      </Card>
    ));
  };

  return (
    <PageContainer className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon"
          className="h-9 w-9 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-sage-800">Subscription Plans</h1>
      </div>
      
      <div className="bg-sage-50 p-4 rounded-lg flex items-center">
        <div className="p-2 bg-white rounded-full mr-3">
          <CalendarCheck className="h-5 w-5 text-sage-500" />
        </div>
        <div>
          <h3 className="font-medium text-sage-700">Save with subscriptions</h3>
          <p className="text-sage-600 text-sm">Get regular deliveries and save up to 10%</p>
        </div>
      </div>
      
      <Tabs defaultValue="monthly" value={selectedPlanType} onValueChange={setSelectedPlanType}>
        <TabsList className="grid grid-cols-5 w-full bg-sage-50 p-1">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="alternate">Alternate</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="mt-4 space-y-4">
          {renderPlans('daily')}
        </TabsContent>
        
        <TabsContent value="alternate" className="mt-4 space-y-4">
          {renderPlans('alternate')}
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-4 space-y-4">
          {renderPlans('weekly')}
        </TabsContent>
        
        <TabsContent value="monthly" className="mt-4 space-y-4">
          {renderPlans('monthly')}
        </TabsContent>
        
        <TabsContent value="custom" className="mt-4 space-y-4">
          {renderPlans('custom')}
        </TabsContent>
      </Tabs>
      
      <div className="space-y-4 mt-8">
        <h2 className="text-xl font-bold text-sage-800">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-sage-100">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="p-3 bg-sage-100 rounded-full mb-4 mt-2">
                <CalendarCheck className="h-6 w-6 text-sage-600" />
              </div>
              <h3 className="font-medium text-sage-800 mb-2">1. Choose Your Plan</h3>
              <p className="text-sage-600 text-sm">Select a subscription plan that fits your needs and frequency</p>
            </CardContent>
          </Card>
          
          <Card className="border-sage-100">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="p-3 bg-sage-100 rounded-full mb-4 mt-2">
                <Package className="h-6 w-6 text-sage-600" />
              </div>
              <h3 className="font-medium text-sage-800 mb-2">2. Customize Products</h3>
              <p className="text-sage-600 text-sm">Add or remove products to create your perfect delivery</p>
            </CardContent>
          </Card>
          
          <Card className="border-sage-100">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="p-3 bg-sage-100 rounded-full mb-4 mt-2">
                <Clock className="h-6 w-6 text-sage-600" />
              </div>
              <h3 className="font-medium text-sage-800 mb-2">3. Enjoy Regular Delivery</h3>
              <p className="text-sage-600 text-sm">Receive your fresh products right at your doorstep</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="space-y-4 mt-2">
        <h2 className="text-xl font-bold text-sage-800">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-sage-800 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sage-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <Separator className="my-6" />
      
      <div className="bg-sage-50 p-4 rounded-lg">
        <h3 className="font-medium text-sage-800 mb-2">Need Help?</h3>
        <p className="text-sage-600 text-sm mb-3">Our subscription specialists are here to help you choose the right plan.</p>
        <Button variant="outline" className="w-full">Contact Support</Button>
      </div>
    </PageContainer>
  );
};

export default SubscriptionPlans;
