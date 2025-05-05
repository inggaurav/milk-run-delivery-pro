import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronLeft, ShoppingCart, Star, Plus, Minus, 
  Calendar, CheckCircle, Award, User, ThumbsUp 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import DeliveryDaySelector from '@/components/products/DeliveryDaySelector';
import SubscriptionPlanSelector from '@/components/products/SubscriptionPlanSelector';
import { useToast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  
  // Mock product data (in a real app, fetch this from an API)
  const product = {
    id: 1,
    name: 'Organic A2 Milk',
    description: 'Farm-fresh organic A2 milk from grass-fed cows. Rich in nutrients and easy to digest.',
    longDescription: 'Our A2 milk comes from specially selected desi cows that naturally produce A2 protein. Unlike regular milk that contains A1 protein which can cause discomfort, A2 milk is easier to digest and better for your health. Our cows are grass-fed and raised in a free-range environment without antibiotics or hormones.',
    price: 55,
    unit: '500ml',
    rating: 4.8,
    reviews: 245,
    category: 'Milk',
    bannerImage: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    nutrition: [
      { name: 'Calories', value: '67 kcal' },
      { name: 'Protein', value: '3.3g' },
      { name: 'Fat', value: '4.0g' },
      { name: 'Carbohydrates', value: '4.8g' },
      { name: 'Calcium', value: '120mg' },
      { name: 'Vitamin D', value: '2.4µg' },
    ],
    benefits: [
      'Easier to digest than regular milk',
      'Rich in essential nutrients',
      'No added preservatives',
      'Supports local farmers',
      'Environmentally sustainable',
    ],
    subscriptionOptions: [
      { id: 'daily', name: 'Daily Delivery', savings: '10%' },
      { id: 'alternate', name: 'Alternate Days', savings: '8%' },
      { id: 'weekly', name: 'Weekly Pack', savings: '5%' },
      { id: 'custom', name: 'Custom Days', savings: '5%' },
    ],
    relatedProducts: [
      { id: 2, name: 'Greek Yogurt', price: 65, unit: '400g', icon: '🍦' },
      { id: 3, name: 'Fresh Paneer', price: 120, unit: '200g', icon: '🧀' },
    ],
    userReviews: [
      { 
        id: 1, 
        user: 'Priya S.', 
        rating: 5, 
        comment: 'Best milk I\'ve tried. Tastes fresh and my kids love it!',
        date: '2 days ago',
        helpful: 12
      },
      { 
        id: 2, 
        user: 'Rahul M.', 
        rating: 4, 
        comment: 'Great quality and always delivered on time. Would recommend.',
        date: '1 week ago',
        helpful: 8
      },
    ],
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));
  
  const calculatePrice = () => {
    let basePrice = product.price * quantity;
    
    if (purchaseType !== 'one-time') {
      const option = product.subscriptionOptions.find(opt => opt.id === purchaseType);
      if (option) {
        const discountPercentage = parseInt(option.savings) / 100;
        return basePrice * (1 - discountPercentage);
      }
    }
    
    return basePrice;
  };

  const handleDayToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubscriptionChange = (planId: string) => {
    setPurchaseType(planId);
    // Reset selected days if not choosing custom plan
    if (planId !== 'custom') {
      setSelectedDays([]);
    }
  };

  const handleAddToCart = () => {
    // Custom days validation
    if (purchaseType === 'custom' && selectedDays.length === 0) {
      toast({
        title: "Please select delivery days",
        description: "You need to select at least one day for custom delivery",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    });
  };
  
  return (
    <PageContainer className="pb-20 p-0">
      {/* Banner Image */}
      <div 
        className="w-full h-64 bg-center bg-cover"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${product.bannerImage})` 
        }}
      >
        <div className="p-4 h-full flex flex-col justify-between">
          <Button 
            variant="outline" 
            size="sm"
            className="w-8 h-8 p-0 rounded-full bg-white/80 backdrop-blur-sm self-start"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="text-white">
            <h1 className="text-3xl font-bold drop-shadow-lg">{product.name}</h1>
            <div className="flex items-center mt-1">
              <div className="flex items-center text-amber-300 mr-3">
                <Star className="fill-amber-300 stroke-amber-300 h-4 w-4 mr-1" />
                <span className="text-sm font-medium drop-shadow-md">{product.rating}</span>
              </div>
              <span className="text-white/90 text-sm drop-shadow-md">{product.reviews} reviews</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sage-700 mb-4">{product.description}</p>
        
        {/* Price & Add to Cart */}
        <Card className="mb-6 border-sage-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold text-sage-800">₹{product.price}</span>
                <span className="text-sage-500 text-sm ml-1">/ {product.unit}</span>
              </div>
              
              <div className="flex items-center border border-sage-200 rounded-full">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full p-0 text-sage-500"
                  onClick={decrementQuantity}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                
                <span className="w-8 text-center font-medium">
                  {quantity}
                </span>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full p-0 text-sage-500"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            {/* Subscription Plan Selector */}
            <div className="mb-4">
              <SubscriptionPlanSelector 
                plans={product.subscriptionOptions}
                selectedPlan={purchaseType}
                onPlanChange={handleSubscriptionChange}
              />
            </div>
            
            {/* Custom Days Selector - only show when 'custom' plan is selected */}
            {purchaseType === 'custom' && (
              <div className="mb-4">
                <DeliveryDaySelector 
                  selectedDays={selectedDays}
                  onDayToggle={handleDayToggle}
                />
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-sage-600">Total Price:</span>
              <span className="font-bold text-sage-800">₹{calculatePrice().toFixed(2)}</span>
            </div>
            
            <Button 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </CardContent>
        </Card>
        
        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-6">
          <TabsList className="grid grid-cols-3 w-full bg-sage-50">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-4 space-y-4">
            <p className="text-sage-700">{product.longDescription}</p>
            
            <div>
              <h3 className="font-medium text-sage-800 mb-2">Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-sage-500 mr-2 mt-0.5 shrink-0" />
                    <span className="text-sage-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-sage-800 mb-2">Quality Assurance</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-sage-50 rounded-lg p-2">
                  <Award className="h-5 w-5 text-sage-600 mr-2" />
                  <span className="text-sm text-sage-700">Certified Organic</span>
                </div>
                <div className="flex items-center bg-sage-50 rounded-lg p-2">
                  <CheckCircle className="h-5 w-5 text-sage-600 mr-2" />
                  <span className="text-sm text-sage-700">Quality Tested</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="mt-4">
            <Card className="border-sage-100">
              <CardContent className="p-3">
                <h3 className="font-medium text-sage-800 mb-2">Nutritional Information</h3>
                <p className="text-sage-500 text-sm mb-3">Per 100ml serving</p>
                
                <div className="space-y-2">
                  {product.nutrition.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm py-1 border-b border-sage-100 last:border-b-0">
                      <span className="text-sage-600">{item.name}</span>
                      <span className="font-medium text-sage-700">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="text-xs text-sage-500 mt-2">
              * Percent Daily Values are based on a 2,000 calorie diet.
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center text-amber-500">
                  <Star className="fill-amber-500 stroke-amber-500 h-5 w-5 mr-1" />
                  <span className="text-xl font-bold">{product.rating}</span>
                </div>
                <p className="text-sm text-sage-500">Based on {product.reviews} reviews</p>
              </div>
              
              <Button size="sm">Write a Review</Button>
            </div>
            
            <div className="space-y-4">
              {product.userReviews.map((review) => (
                <Card key={review.id} className="border-sage-100">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-sage-100 rounded-full p-1">
                          <User className="h-4 w-4 text-sage-500" />
                        </div>
                        <span className="font-medium text-sage-800 ml-2">{review.user}</span>
                      </div>
                      
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < review.rating ? 'fill-amber-500' : 'fill-gray-200'} stroke-none`} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-sage-700 text-sm">{review.comment}</p>
                    
                    <div className="flex items-center justify-between mt-2 text-xs">
                      <span className="text-sage-500">{review.date}</span>
                      
                      <Button variant="ghost" size="sm" className="h-6 text-sage-500 hover:text-sage-700">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Related Products */}
        <div className="space-y-3 pb-4">
          <h2 className="text-lg font-medium text-sage-800">You may also like</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {product.relatedProducts.map(item => (
              <Card key={item.id} className="overflow-hidden border-sage-100">
                <CardContent className="p-2">
                  <div className="bg-sage-50 h-20 w-full rounded flex items-center justify-center mb-2">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="font-medium text-sage-800 text-sm">{item.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm">₹{item.price}/{item.unit}</span>
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProductDetail;
