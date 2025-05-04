
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from './BottomNavigation';
import { Outlet, Navigate } from 'react-router-dom';

interface AppLayoutProps {
  requireAuth?: boolean;
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  requireAuth = true,
  children 
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-500" />
      </div>
    );
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-sage-50">
      <main className="flex-1 pb-16">
        {children || <Outlet />}
      </main>
      {user && <BottomNavigation />}
    </div>
  );
};

export default AppLayout;
