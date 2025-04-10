'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  phoneNumber?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, rememberMe?: boolean, twoFactorCode?: string) => Promise<void>;
  adminLogin: (email: string, password: string, twoFactorCode?: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  socialLogin: (provider: 'google' | 'facebook' | 'twitter' | 'github') => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  enableTwoFactor: (phoneNumber: string) => Promise<void>;
  disableTwoFactor: () => Promise<void>;
  verifyTwoFactor: (code: string) => Promise<void>;
  changeAdminPassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        
        if (storedUser && rememberMe) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          setIsAdmin(parsedUser.role === 'admin');
        }
      } catch (error) {
        console.error('Session check failed:', error);
        logout();
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string, rememberMe = false, twoFactorCode?: string) => {
    try {
      // Here you would typically make an API call to your backend
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email,
        isEmailVerified: true,
        twoFactorEnabled: true,
        phoneNumber: '+1234567890',
        role: 'user',
      };
      
      if (mockUser.twoFactorEnabled && !twoFactorCode) {
        setRequiresTwoFactor(true);
        throw new Error('Two-factor authentication required');
      }
      
      setUser(mockUser);
      setIsAuthenticated(true);
      setIsAdmin(false);
      setRequiresTwoFactor(false);
      
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('rememberMe', 'true');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const adminLogin = async (email: string, password: string, twoFactorCode?: string) => {
    try {
      // In a real application, this would be a secure API call
      if (email !== 'admin@example.com' || password !== 'Admin@123!') {
        throw new Error('Invalid admin credentials');
      }

      const mockAdmin = {
        id: 'admin-1',
        name: 'Admin User',
        email,
        isEmailVerified: true,
        twoFactorEnabled: true,
        phoneNumber: '+1234567890',
        role: 'admin',
      };

      if (mockAdmin.twoFactorEnabled && !twoFactorCode) {
        setRequiresTwoFactor(true);
        throw new Error('Two-factor authentication required');
      }

      setUser(mockAdmin);
      setIsAuthenticated(true);
      setIsAdmin(true);
      setRequiresTwoFactor(false);

      // Admin sessions should not be remembered
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
    } catch (error) {
      console.error('Admin login failed:', error);
      throw error;
    }
  };

  const changeAdminPassword = async (currentPassword: string, newPassword: string) => {
    try {
      if (!isAdmin) {
        throw new Error('Only admins can change admin password');
      }

      // In a real application, this would be a secure API call
      if (currentPassword !== 'Admin@123!') {
        throw new Error('Current password is incorrect');
      }

      // Validate new password strength
      const hasMinLength = newPassword.length >= 8;
      const hasUpperCase = /[A-Z]/.test(newPassword);
      const hasLowerCase = /[a-z]/.test(newPassword);
      const hasNumber = /[0-9]/.test(newPassword);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

      if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        throw new Error('New password must be at least 8 characters long and contain uppercase, lowercase, number, and special character');
      }

      // In a real application, you would update the password in the database here
      console.log('Admin password changed successfully');
    } catch (error) {
      console.error('Failed to change admin password:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const mockUser = {
        id: '1',
        name,
        email,
        isEmailVerified: false,
        twoFactorEnabled: false,
        role: 'user',
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      // In a real app, you would send a verification email here
      console.log('Verification email sent to:', email);
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error('Signup failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setRequiresTwoFactor(false);
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
  };

  const socialLogin = async (provider: 'google' | 'facebook' | 'twitter' | 'github') => {
    try {
      const mockUser = {
        id: '1',
        name: 'Social User',
        email: 'social@example.com',
        isEmailVerified: true,
        twoFactorEnabled: false,
        role: 'user',
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      throw new Error(`${provider} login failed. Please try again.`);
    }
  };

  const sendVerificationEmail = async () => {
    try {
      if (!user) throw new Error('No user logged in');
      console.log('Verification email sent to:', user.email);
    } catch (error) {
      console.error('Failed to send verification email:', error);
      throw new Error('Failed to send verification email. Please try again.');
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      if (!user) throw new Error('No user logged in');
      const updatedUser = { ...user, isEmailVerified: true };
      setUser(updatedUser);
      
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Email verification failed:', error);
      throw new Error('Email verification failed. Please try again.');
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      // Here you would typically make an API call to send reset email
      console.log('Password reset email sent to:', email);
    } catch (error) {
      console.error('Failed to send password reset email:', error);
      throw new Error('Failed to send password reset email. Please try again.');
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      // Here you would typically make an API call to reset password
      console.log('Password reset successful');
    } catch (error) {
      console.error('Password reset failed:', error);
      throw new Error('Password reset failed. Please try again.');
    }
  };

  const enableTwoFactor = async (phoneNumber: string) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      // Here you would typically make an API call to enable 2FA
      const updatedUser = { ...user, twoFactorEnabled: true, phoneNumber };
      setUser(updatedUser);
      
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Failed to enable two-factor authentication:', error);
      throw new Error('Failed to enable two-factor authentication. Please try again.');
    }
  };

  const disableTwoFactor = async () => {
    try {
      if (!user) throw new Error('No user logged in');
      
      // Here you would typically make an API call to disable 2FA
      const updatedUser = { ...user, twoFactorEnabled: false, phoneNumber: undefined };
      setUser(updatedUser);
      
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Failed to disable two-factor authentication:', error);
      throw new Error('Failed to disable two-factor authentication. Please try again.');
    }
  };

  const verifyTwoFactor = async (code: string) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      // Here you would typically make an API call to verify 2FA code
      console.log('Two-factor authentication verified');
      setRequiresTwoFactor(false);
    } catch (error) {
      console.error('Two-factor authentication failed:', error);
      throw new Error('Invalid verification code. Please try again.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        adminLogin,
        signup,
        logout,
        socialLogin,
        sendVerificationEmail,
        verifyEmail,
        requestPasswordReset,
        resetPassword,
        enableTwoFactor,
        disableTwoFactor,
        verifyTwoFactor,
        changeAdminPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 