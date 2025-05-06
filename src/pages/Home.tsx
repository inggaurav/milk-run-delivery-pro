import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, ChevronRight, Star, Calendar, Clock, Heart, LayoutGrid, Activity, BellDot
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const userName = user?.name?.split(' ')[0] || 'Friend';
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const categories = [
    { name: 'Recipe', icon: '🍲', color: 'bg-pink-100' },
    { name: 'Program', icon: '🥗', color: 'bg-green-100' },
    { name: 'Training', icon: '🥦', color: 'bg-blue-100' },
    { name: 'Guide', icon: '🍲', color: 'bg-amber-100' },
  ];

  const featuredRecipes = [
    {
      id: 1,
      name: 'Broccoli',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: '/assets/a2milk.jpg',
      rating: 4.8,
      reviews: 25
    },
    {
      id: 2,
      name: 'Lemon',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      image: '/assets/yogurt.jpg',
      rating: 4.6,
      reviews: 25
    },
  ];

  const otherRecipes = [
    {
      id: 1,
      name: 'Extra smoothy salad',
      time: '2.4mins',
      image: '/lovable-uploads/d5ea5d64-dc47-485b-9428-9bfeaa67d7e2.png',
    }
  ];
  
  const nutritionStats = {
    caloriesLeft: 2145,
    protein: 160,
    carbs: 214, 
    fat: 63,
    consumed: 657,
    burned: 245,
    intake: 24.6
  };

  const breakfast = {
    name: 'Apple',
    calories: 95,
    amount: '130 g',
    image: '/lovable-uploads/aa7edc94-d7a7-4a53-8ec3-027f65305908.png'
  };
  
  return (
    <PageContainer className="space-y-5 pb-20 bg-gray-50">
      {/* Header with greeting and profile */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="text-sm text-gray-600">Hi, {userName}</p>
          <h1 className="text-2xl font-bold text-gray-800">
            {getGreeting()}
          </h1>
        </div>
        <Avatar className="h-11 w-11 border border-gray-200">
          <AvatarImage src="/assets/profile.jpg" alt={userName} />
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
      </div>
      
      {/* Categories */}
      <div className="grid grid-cols-4 gap-3">
        {categories.map((category) => (
          <div key={category.name} className="flex flex-col items-center space-y-1">
            <div className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-sm`}>
              {category.icon}
            </div>
            <span className="text-xs font-medium text-gray-700">{category.name}</span>
          </div>
        ))}
      </div>
      
      {/* Statistics Card */}
      <Card className="overflow-hidden border-none shadow-sm">
        <CardContent className="p-0">
          <div className="bg-sage-500 text-white p-5 relative">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-xl">Statistics</h2>
              <ChevronRight className="h-5 w-5" />
            </div>
            
            <div className="flex items-center gap-5">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xs text-white/80">Kcal left</span>
                  <span className="text-xl font-bold">{nutritionStats.caloriesLeft}</span>
                </div>
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" 
                    stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="16" fill="none" 
                    stroke="white" strokeWidth="3" 
                    strokeDasharray="100" strokeDashoffset="25" />
                </svg>
              </div>
              
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Protein</span>
                    <span>{nutritionStats.protein} g</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="bg-white h-full rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Carbs</span>
                    <span>{nutritionStats.carbs} g</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="bg-white h-full rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fat</span>
                    <span>{nutritionStats.fat} g</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="bg-white h-full rounded-full" style={{width: '40%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg text-gray-800">Statistics</h3>
              <div className="border border-gray-200 rounded-md px-3 py-1 text-sm flex items-center">
                Weekly <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
            
            <div className="flex justify-between items-end">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div key={day} className="flex flex-col items-center">
                  <div className="w-2 bg-pink-200 rounded-full" 
                    style={{height: `${20 + Math.random() * 50}px`}}></div>
                  <span className="text-xs text-gray-500 mt-2">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Today's Recipe Section */}
      <Tabs defaultValue="today" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList className="bg-transparent p-0 h-auto gap-1 mb-3">
            <TabsTrigger 
              value="today" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-sage-500 data-[state=active]:text-sage-700 rounded-none px-2 py-1 text-gray-500 h-8"
            >
              Today's Recipe
            </TabsTrigger>
            <TabsTrigger 
              value="recommended" 
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-sage-500 data-[state=active]:text-sage-700 rounded-none px-2 py-1 text-gray-500 h-8"
            >
              Recommended
            </TabsTrigger>
          </TabsList>
          <span className="flex-1"></span>
          <div className="flex space-x-1">
            <div className="bg-sage-500 w-2 h-2 rounded-full"></div>
            <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
            <div className="bg-gray-300 w-2 h-2 rounded-full"></div>
          </div>
        </div>
        
        <TabsContent value="today" className="m-0">
          <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-none">
            {featuredRecipes.map((recipe) => (
              <div key={recipe.id} className="min-w-[240px] rounded-xl overflow-hidden shadow-sm">
                <div className="h-36 bg-sage-100 relative">
                  <div className="absolute bottom-0 left-0 p-3 text-white">
                    <h3 className="font-semibold bg-sage-500 px-3 py-1 rounded-full inline-block">{recipe.name}</h3>
                    <p className="text-xs mt-2 text-white/90 line-clamp-2">{recipe.description}</p>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center bg-black/30 px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 text-white fill-white" />
                    <span className="text-xs text-white ml-1">({recipe.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recommended" className="m-0">
          <div className="text-center py-4 text-gray-500">
            <p>Recommended recipes coming soon!</p>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Others Recipe */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Others Recipe</h2>
          <ChevronRight className="h-5 w-5 text-sage-500" />
        </div>
        
        {otherRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-sage-100 rounded-xl p-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="h-14 w-14 rounded-full overflow-hidden bg-white">
                <img src={recipe.image} alt={recipe.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-sage-700">{recipe.name}</h3>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="h-3 w-3 mr-1" /> 
                  <span>{recipe.time}</span>
                </div>
              </div>
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
      
      {/* Breakfast Section */}
      <div className="bg-white rounded-t-xl mt-6 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Breakfast</h2>
          <span className="text-sm text-gray-500">412 Kcal</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-lg overflow-hidden bg-sage-100">
              <img src={breakfast.image} alt={breakfast.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="font-medium">{breakfast.name}</h3>
              <span className="text-xs text-gray-500">{breakfast.amount}</span>
            </div>
          </div>
          
          <div className="bg-pink-200 rounded-full h-10 w-10 flex items-center justify-center text-pink-500 font-medium">
            {breakfast.calories}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex items-center justify-around px-6 z-50">
        <Link to="/" className="flex flex-col items-center text-sage-500">
          <LayoutGrid className="h-5 w-5 mb-0.5" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/favorites" className="flex flex-col items-center text-gray-400">
          <Heart className="h-5 w-5 mb-0.5" />
          <span className="text-xs">Favorites</span>
        </Link>
        <Link to="/activity" className="flex flex-col items-center text-gray-400">
          <Activity className="h-5 w-5 mb-0.5" />
          <span className="text-xs">Activity</span>
        </Link>
        <Link to="/notifications" className="flex flex-col items-center text-gray-400">
          <BellDot className="h-5 w-5 mb-0.5" />
          <span className="text-xs">Alerts</span>
        </Link>
      </div>
    </PageContainer>
  );
};

export default Home;
