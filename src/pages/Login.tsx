
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageContainer from '@/components/layout/PageContainer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <PageContainer className="flex flex-col items-center justify-center">
      <div className="w-full max-w-sm mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-sage-100 rounded-full animate-float"></div>
              <div className="absolute inset-2 bg-sage-50 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-sage-300 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🥛</span>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-sage-800">Welcome Back</h1>
          <p className="text-sage-500">Login to your milk delivery account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-sage-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="rounded-xl border-sage-200"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-sage-700">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-sage-500 hover:text-sage-700">
                Forgot Password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="rounded-xl border-sage-200"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-milk"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </Button>
          
          <div className="text-center text-sm text-sage-500">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="text-sage-700 font-medium hover:underline">
                Register
              </Link>
            </p>
          </div>

          <div className="bg-sage-50 p-3 rounded-lg text-sm text-sage-700 text-center">
            <p className="font-medium">Demo Credentials</p>
            <p className="text-sage-600 mt-1">Email: demo@milk.com</p>
            <p className="text-sage-600">Password: password</p>
          </div>
        </form>
      </div>
    </PageContainer>
  );
};

export default Login;
