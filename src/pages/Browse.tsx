import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: 'Organic A2 Milk',
      description: 'Farm-fresh organic A2 milk from grass-fed cows',
      price: 55,
      unit: '500ml',
      image: '/assets/a2milk.jpg',
      rating: 4.8,
      reviews: 245,
      category: 'Milk',
      tags: ['organic', 'fresh']
    },
    {
      id: 2,
      name: 'Greek Yogurt',
      description: 'Creamy Greek-style yogurt with active cultures',
      price: 65,
      unit: '400g',
      image: '/assets/yogurt.jpg',
      rating: 4.6,
      reviews: 189,
      category: 'Yogurt',
      tags: ['probiotic', 'healthy']
    },
    {
      id: 3,
      name: 'Fresh Paneer',
      description: 'Soft and fresh cottage cheese made daily',
      price: 120,
      unit: '200g',
      image: '/assets/paneer.jpg',
      rating: 4.7,
      reviews: 156,
      category: 'Cheese',
      tags: ['protein', 'fresh']
    },
    {
      id: 4,
      name: 'Full Cream Milk',
      description: 'Rich and creamy full-fat milk',
      price: 50,
      unit: '500ml',
      image: '/assets/milk.jpg',
      rating: 4.5,
      reviews: 312,
      category: 'Milk',
      tags: ['creamy']
    },
    {
      id: 5,
      name: 'Toned Milk',
      description: 'Low-fat milk perfect for daily consumption',
      price: 45,
      unit: '500ml',
      image: '/assets/toned.jpg',
      rating: 4.3,
      reviews: 189,
      category: 'Milk',
      tags: ['low-fat', 'daily']
    },
    {
      id: 6,
      name: 'Butter',
      description: 'Creamy butter made from farm-fresh milk',
      price: 60,
      unit: '100g',
      image: '/assets/butter.jpg',
      rating: 4.9,
      reviews: 120,
      category: 'Butter',
      tags: ['creamy', 'spread']
    },
  ];

  const categories = [
    'All', 'Milk', 'Yogurt', 'Cheese', 'Butter', 'Cream'
  ];

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = products.filter(product => 
    (activeCategory === 'All' || product.category === activeCategory) &&
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <PageContainer className="space-y-5 pb-20">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-sage-800">Browse Products</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 h-4 w-4" />
          <Input
            className="pl-10 pr-10 py-6 rounded-xl shadow-sm border-sage-200"
            placeholder="Search for milk, yogurt and more..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sage-500 hover:bg-transparent hover:text-sage-700"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full ${activeCategory === category ? 'bg-sage-500' : 'border-sage-200 text-sage-700'}`}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Card className="overflow-hidden border-sage-100 hover:shadow-md transition-all">
                <CardContent className="p-0">
                  <div className="p-3 space-y-3">
                    <div className="h-40 bg-sage-50 rounded-lg flex items-center justify-center">
                      <span className="text-6xl">
                        {product.category === 'Milk' ? '🥛' : 
                         product.category === 'Yogurt' ? '🍦' :
                         product.category === 'Cheese' ? '🧀' :
                         product.category === 'Butter' ? '🧈' : '🍶'}
                      </span>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sage-800">{product.name}</h3>
                        <div className="flex items-center text-amber-500">
                          <Star className="fill-amber-500 stroke-amber-500 h-3 w-3 mr-1" />
                          <span className="text-xs">{product.rating}</span>
                        </div>
                      </div>
                      <p className="text-sage-500 text-sm line-clamp-2 mt-1">{product.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {product.tags.map(tag => (
                          <span key={tag} className="bg-sage-50 text-sage-600 text-xs px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <span className="font-medium text-sage-800">₹{product.price}</span>
                          <span className="text-xs text-sage-500 ml-1">/{product.unit}</span>
                        </div>
                        <Button size="sm" className="rounded-full flex gap-1">
                          <ShoppingCart className="h-4 w-4" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🔍</div>
            <h3 className="text-sage-800 font-medium">No products found</h3>
            <p className="text-sage-500 text-sm">Try a different search or category</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default Browse;
