import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  department: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const MOCK_USERS = {
  'admin@kws.go.ke': {
    password: 'admin123',
    displayName: 'Admin User',
    role: 'admin' as const,
    department: 'Administration'
  },
  'user@kws.go.ke': {
    password: 'user123',
    displayName: 'Regular User',
    role: 'user' as const,
    department: 'Conservation'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Validate email domain
      if (!email.endsWith('@kws.go.ke')) {
        throw new Error('Only @kws.go.ke email addresses are allowed.');
      }

      // Check if user exists and password matches
      const userData = MOCK_USERS[email as keyof typeof MOCK_USERS];
      if (!userData || userData.password !== password) {
        throw new Error('Invalid email or password.');
      }

      // Create user profile
      const userProfile: UserProfile = {
        email,
        displayName: userData.displayName,
        role: userData.role,
        department: userData.department
      };

      setUser(userProfile);
      toast({
        title: "Welcome!",
        description: "You've successfully signed in."
      });

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Signed out",
      description: "You've been successfully signed out."
    });
    navigate('/login');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
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