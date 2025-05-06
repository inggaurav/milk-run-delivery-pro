
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  isOnline: boolean;
  role?: 'user' | 'admin';
  deliveryRating?: number;
  completedDeliveries?: number;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  updateOnlineStatus: (status: boolean) => void;
  isAdmin: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate checking for stored user credentials
    const storedUser = localStorage.getItem('milkAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (email === 'demo@milk.com' && password === 'password') {
        const user: User = {
          id: '1',
          name: 'Demo User',
          email,
          phone: '555-123-4567',
          isOnline: true,
          profileImage: '/assets/profile.jpg',
          role: 'admin', // Admin role for demo user
        };
        
        setUser(user);
        localStorage.setItem('milkAppUser', JSON.stringify(user));
        toast.success('Successfully logged in!');
      } else {
        toast.error('Invalid credentials. Try demo@milk.com / password');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        isOnline: true,
        role: 'user'
      };
      
      setUser(user);
      localStorage.setItem('milkAppUser', JSON.stringify(user));
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('milkAppUser');
    toast.info('You have been logged out');
  };

  const updateOnlineStatus = (status: boolean) => {
    if (user) {
      const updatedUser = { ...user, isOnline: status };
      setUser(updatedUser);
      localStorage.setItem('milkAppUser', JSON.stringify(updatedUser));
      toast.success(status ? 'You are now online' : 'You are now offline');
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin' || user?.email === 'demo@milk.com';
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateOnlineStatus, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
