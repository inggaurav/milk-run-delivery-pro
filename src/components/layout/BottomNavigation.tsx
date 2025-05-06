
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Heart, Activity, BellDot, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { path: '/', icon: LayoutGrid, label: 'Home' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/activity', icon: Activity, label: 'Activity' },
    { path: '/notifications', icon: BellDot, label: 'Alerts' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex items-center justify-around px-6 z-50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex flex-col items-center transition-colors",
            currentPath === item.path 
              ? "text-sage-600"
              : "text-gray-400 hover:text-sage-500"
          )}
        >
          <item.icon className={cn(
            "w-5 h-5 mb-0.5",
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
