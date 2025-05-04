
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageContainer from '@/components/layout/PageContainer';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register(name, email, phone, password);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <PageContainer className="flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-sm mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 bg-sage-100 rounded-full animate-float"></div>
              <div className="absolute inset-2 bg-sage-50 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-sage-300 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🥛</span>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-sage-800">Create Account</h1>
          <p className="text-sage-500 text-sm">Join our milk delivery team</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-sage-700">
              Full Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="rounded-xl border-sage-200"
            />
          </div>
          
          <div className="space-y-1">
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
          
          <div className="space-y-1">
            <label htmlFor="phone" className="text-sm font-medium text-sage-700">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
              className="rounded-xl border-sage-200"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-sage-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
              className="rounded-xl border-sage-200"
            />
            <p className="text-xs text-sage-500 mt-1">
              Password must be at least 6 characters
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-milk mt-4"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Register'
            )}
          </Button>
          
          <div className="text-center text-sm text-sage-500">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-sage-700 font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </PageContainer>
  );
};

export default Register;
