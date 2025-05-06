
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, Bell, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/browse', icon: Search, label: 'Browse' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart' },
    { path: '/notifications', icon: Bell, label: 'Alerts' },
    { path: '/profile', icon: UserCircle, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-sage-100 flex items-center justify-around px-2 z-50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full transition-colors",
            currentPath === item.path 
              ? "text-sage-600"
              : "text-sage-400 hover:text-sage-500"
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
