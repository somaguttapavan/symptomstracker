
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // In a real app, these would communicate with your Django backend
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock login - in a real app, this would be an API call
      const mockUser = { id: '123', email, name: email.split('@')[0] };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success("Successfully logged in!");
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Failed to log in. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      // Mock Google login - in a real app, this would redirect to Google OAuth
      const mockUser = { id: '456', email: 'user@gmail.com', name: 'Google User' };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success("Successfully logged in with Google!");
    } catch (error) {
      console.error('Google login error:', error);
      toast.error("Failed to log in with Google. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      // Mock signup - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Account created successfully! Please log in.");
    } catch (error) {
      console.error('Signup error:', error);
      toast.error("Failed to create account. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success("Successfully logged out!");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
