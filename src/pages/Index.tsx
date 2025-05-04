
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  // The index page simply redirects to the appropriate page based on auth status
  return user ? <Navigate to="/" /> : <Navigate to="/login" />;
};

export default Index;
