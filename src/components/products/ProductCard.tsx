
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Clock, Plus } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  image?: string;
  price?: number;
  unit?: string;
  rating?: number;
  reviews?: number;
  backgroundColor?: string;
  cookTime?: string; 
  className?: string;
  compact?: boolean;
}

const ProductCard = ({ 
  id, 
  name, 
  image, 
  price, 
  unit, 
  rating = 0, 
  reviews = 0,
  backgroundColor = '#5c7e5c',
  cookTime,
  className = '',
  compact = false
}: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`}>
      <Card className={`border-none shadow-md overflow-hidden ${compact ? 'rounded-2xl' : 'rounded-3xl'} ${className}`}>
        <div 
          className={`relative ${compact ? 'h-32' : 'h-44'}`}
          style={{ backgroundColor }}
        >
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-5xl">
              🥗
            </div>
          )}
          
          {rating > 0 && (
            <div className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-sm rounded-full py-1 px-2 flex items-center">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
              <span className="text-xs text-white font-medium">{rating}</span>
              {!compact && reviews > 0 && (
                <span className="text-xs text-white/80 ml-1">({reviews})</span>
              )}
            </div>
          )}
          
          {cookTime && (
            <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm rounded-full py-1 px-2 flex items-center">
              <Clock className="h-3 w-3 text-white mr-1" />
              <span className="text-xs text-white">{cookTime}</span>
            </div>
          )}
        </div>
        
        <CardContent className={`${compact ? 'p-3' : 'p-4'}`}>
          <div className="flex justify-between items-start">
            <div className="text-left">
              <h3 className={`font-medium text-gray-800 ${compact ? 'text-sm' : 'text-base'}`}>{name}</h3>
              {price && (
                <p className={`text-sage-600 ${compact ? 'text-xs' : 'text-sm'} font-medium`}>
                  ₹{price}{unit && <span className="text-gray-500">/{unit}</span>}
                </p>
              )}
            </div>
            {!compact && (
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full bg-sage-50 text-sage-600 hover:bg-sage-100 hover:text-sage-700">
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
