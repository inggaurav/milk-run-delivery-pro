
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

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState('one-time');
  
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
  
  return (
    <PageContainer className="pb-20">
      <div className="mb-4">
        <Button 
          variant="ghost" 
          className="p-0 h-auto flex items-center text-sage-600 mb-2"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <h1 className="text-2xl font-bold text-sage-800">{product.name}</h1>
        
        <div className="flex items-center mt-1">
          <div className="flex items-center text-amber-500 mr-3">
            <Star className="fill-amber-500 stroke-amber-500 h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sage-500 text-sm">{product.reviews} reviews</span>
        </div>
      </div>
      
      {/* Product Image */}
      <div className="bg-sage-50 h-60 rounded-xl flex items-center justify-center mb-6">
        <div className="text-8xl">🥛</div>
      </div>
      
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
          
          {/* Purchase Type Selection */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center">
              <input 
                type="radio"
                id="one-time"
                name="purchase-type"
                value="one-time"
                checked={purchaseType === 'one-time'}
                onChange={() => setPurchaseType('one-time')}
                className="h-4 w-4 text-sage-600 focus:ring-sage-500"
              />
              <label htmlFor="one-time" className="ml-2 text-sm text-sage-800">
                One-time purchase
              </label>
            </div>
            
            {product.subscriptionOptions.map(option => (
              <div className="flex items-center" key={option.id}>
                <input 
                  type="radio"
                  id={option.id}
                  name="purchase-type"
                  value={option.id}
                  checked={purchaseType === option.id}
                  onChange={() => setPurchaseType(option.id)}
                  className="h-4 w-4 text-sage-600 focus:ring-sage-500"
                />
                <label htmlFor={option.id} className="ml-2 flex items-center text-sm text-sage-800">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-sage-500" />
                  <span>{option.name}</span>
                  <span className="text-xs text-sage-500 ml-1">
                    (Save {option.savings})
                  </span>
                </label>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm mb-4">
            <span className="text-sage-600">Total Price:</span>
            <span className="font-bold text-sage-800">₹{calculatePrice().toFixed(2)}</span>
          </div>
          
          <Button className="w-full flex items-center justify-center gap-2">
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
    </PageContainer>
  );
};

export default ProductDetail;
