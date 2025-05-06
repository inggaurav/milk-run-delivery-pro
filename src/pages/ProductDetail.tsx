
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, ShoppingCart, Star, Plus, Minus, 
  Calendar, CheckCircle, Award, User, ThumbsUp, Heart, Share2
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import DeliveryDaySelector from '@/components/products/DeliveryDaySelector';
import SubscriptionPlanSelector from '@/components/products/SubscriptionPlanSelector';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState('500ml');
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Mock product data (in a real app, fetch this from an API)
  const product = {
    id: 1,
    name: 'Maftoul & Mozarella',
    description: 'Delicious fresh salad with maftoul and mozarella cheese',
    longDescription: 'Our fresh salad comes with specially selected organic ingredients. The maftoul is cooked to perfection and combined with fresh mozarella cheese, crisp vegetables, and a light vinaigrette dressing.',
    price: 160,
    unit: 'g',
    sizes: [
      { id: '250g', name: '250g', price: 120 },
      { id: '500g', name: '500g', price: 160 },
      { id: '750g', name: '750g', price: 220 },
    ],
    rating: 4.7,
    reviews: 245,
    category: 'Salad',
    bannerImage: '/lovable-uploads/0a52b594-92b1-462d-b756-09370f2d7f95.png',
    nutrition: [
      { name: 'Protein', value: '160g' },
      { name: 'Carbs', value: '45g' },
      { name: 'Kcal', value: '451' },
      { name: 'Fat', value: '54g' },
    ],
    benefits: [
      'Rich in essential nutrients',
      'No added preservatives',
      'Supports local farmers',
      'Environmentally sustainable',
      'Perfect balance of protein and carbs',
    ],
    subscriptionOptions: [
      { id: 'daily', name: 'Daily Delivery', savings: '10%' },
      { id: 'alternate', name: 'Alternate Days', savings: '8%' },
      { id: 'weekly', name: 'Weekly Pack', savings: '5%' },
      { id: 'custom', name: 'Custom Days', savings: '5%' },
    ],
    relatedProducts: [
      { id: 2, name: 'Mixed Best Salad', price: 145, unit: 'g', icon: '🥗' },
      { id: 3, name: 'Thai Chicken Salad', price: 180, unit: 'g', icon: '🍲' },
    ],
    userReviews: [
      { 
        id: 1, 
        user: 'Priya S.', 
        rating: 5, 
        comment: 'Best salad I\'ve tried. Tastes fresh and my kids love it!',
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
  
  // Get the current size information
  const getCurrentSize = () => {
    return product.sizes.find(size => size.id === selectedSize) || product.sizes[0];
  };
  
  const calculatePrice = () => {
    const currentSize = getCurrentSize();
    let basePrice = currentSize.price * quantity;
    
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

    const currentSize = getCurrentSize();
    toast({
      title: "Added to cart",
      description: `${quantity}x ${currentSize.name} ${product.name} added to your cart`,
    });
  };
  
  return (
    <PageContainer className="pb-20 p-0">
      {/* Header with back button */}
      <div className="bg-sage-500 text-white p-4 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          className="w-8 h-8 p-0 rounded-full bg-white/20 hover:bg-white/30 text-white"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-lg font-medium">Details</div>
        <Button 
          variant="ghost" 
          size="sm"
          className="w-8 h-8 p-0 rounded-full bg-white/20 hover:bg-white/30 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </Button>
      </div>
      
      {/* Product Image */}
      <div className="w-full flex justify-center bg-sage-500 pt-4 pb-12 rounded-b-[40px]">
        <div className="w-64 h-64 rounded-full bg-white overflow-hidden flex items-center justify-center">
          <img 
            src={product.bannerImage} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Product Info */}
      <div className="px-5 -mt-6">
        {/* Product Name and Rating */}
        <Card className="border-none shadow-lg rounded-3xl">
          <CardContent className="p-5">
            <h1 className="text-2xl font-bold text-center mb-1">{product.name}</h1>
            
            <div className="flex items-center justify-center mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
                  />
                ))}
              </div>
              <span className="text-amber-500 ml-2 font-medium">{product.rating}</span>
            </div>
            
            {/* Nutrition Info */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {product.nutrition.map((item, index) => (
                <div 
                  key={index} 
                  className={`rounded-xl p-3 text-center ${
                    index === 0 ? 'bg-red-100 text-red-500' :
                    index === 1 ? 'bg-blue-100 text-blue-500' :
                    index === 2 ? 'bg-amber-100 text-amber-500' : 'bg-green-100 text-green-500'
                  }`}
                >
                  <div className="font-bold text-lg">{item.value}</div>
                  <div className="text-xs">{item.name}</div>
                </div>
              ))}
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Description</h3>
              <p className="text-gray-600">{product.longDescription}</p>
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-between mb-2">
              <Button
                className={`w-12 h-12 rounded-full p-0 ${isFavorite ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                variant="ghost"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
              </Button>
              
              <Button 
                className="bg-sage-500 hover:bg-sage-600 flex-1 mx-3 rounded-full text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              
              <Button
                className="w-12 h-12 rounded-full p-0 bg-gray-100 text-gray-500 hover:bg-gray-200"
                variant="ghost"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Size Selection */}
        <Card className="border-none shadow-md rounded-3xl mt-5">
          <CardContent className="p-5">
            <h3 className="font-bold text-lg mb-3">Select Size</h3>
            <RadioGroup 
              defaultValue={selectedSize}
              value={selectedSize}
              onValueChange={setSelectedSize}
              className="grid grid-cols-3 gap-3"
            >
              {product.sizes.map((size) => (
                <div key={size.id} className="flex items-center">
                  <RadioGroupItem value={size.id} id={`size-${size.id}`} className="peer sr-only" />
                  <Label
                    htmlFor={`size-${size.id}`}
                    className="flex flex-col flex-1 cursor-pointer items-center justify-center rounded-xl border border-sage-100 py-2 text-center hover:bg-sage-50 peer-data-[state=checked]:border-sage-500 peer-data-[state=checked]:bg-sage-50"
                  >
                    <span className="font-medium">{size.name}</span>
                    <span className="text-xs text-sage-600">₹{size.price}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <div className="flex items-center justify-between mt-5">
              <div>
                <p className="text-gray-500 text-sm">Total price</p>
                <p className="text-xl font-bold">₹{calculatePrice().toFixed(2)}</p>
              </div>
              
              <div className="flex items-center border border-sage-200 rounded-full px-2 bg-gray-50">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full p-0 text-sage-500"
                  onClick={decrementQuantity}
                >
                  <Minus className="h-4 w-4" />
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
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ProductDetail;
