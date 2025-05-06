
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/browse', icon: Search, label: 'Browse' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex items-center justify-around px-2 z-50 rounded-t-3xl shadow-md">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full transition-colors",
            currentPath === item.path 
              ? "text-sage-500"
              : "text-gray-400 hover:text-gray-500"
          )}
        >
          <item.icon className={cn(
            "w-5 h-5 mb-1",
            currentPath === item.path && "stroke-[2.5]"
          )} />
          <span className={cn(
            "text-xs",
            currentPath === item.path && "font-medium"
          )}>
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
