'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, Phone, Shield } from 'lucide-react';

interface PasswordStrength {
  score: number;
  hasMinLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);

  const { login, signup, socialLogin, requestPasswordReset, resetPassword, verifyTwoFactor } = useAuth();

  useEffect(() => {
    if (password) {
      const strength = {
        hasMinLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      };
      
      const score = Object.values(strength).filter(Boolean).length;
      setPasswordStrength({ ...strength, score });
    } else {
      setPasswordStrength({
        score: 0,
        hasMinLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
      });
    }
  }, [password]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!isLogin && passwordStrength.score < 3) {
      newErrors.password = 'Password is too weak';
    }
    
    if (!isLogin && !name) {
      newErrors.name = 'Name is required';
    }
    
    if (requiresTwoFactor && !twoFactorCode) {
      newErrors.twoFactorCode = 'Verification code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (isResettingPassword) {
        await resetPassword(resetToken, newPassword);
        setIsResettingPassword(false);
        setResetToken('');
        setNewPassword('');
        return;
      }
      
      if (requiresTwoFactor) {
        await verifyTwoFactor(twoFactorCode);
        setRequiresTwoFactor(false);
        setTwoFactorCode('');
        return;
      }
      
      if (isLogin) {
        await login(email, password, rememberMe);
      } else {
        await signup(name, email, password);
      }
      
      onClose();
    } catch (error: any) {
      if (error.message === 'Two-factor authentication required') {
        setRequiresTwoFactor(true);
      } else {
        setErrors({ submit: error.message });
      }
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'twitter' | 'github') => {
    try {
      await socialLogin(provider);
      onClose();
    } catch (error: any) {
      setErrors({ submit: error.message });
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setErrors({ email: 'Email is required for password reset' });
      return;
    }
    
    try {
      await requestPasswordReset(email);
      setIsResettingPassword(true);
    } catch (error: any) {
      setErrors({ submit: error.message });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {isResettingPassword ? 'Reset Password' : isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isResettingPassword && !requiresTwoFactor && (
            <>
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                {!isLogin && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${passwordStrength.hasMinLength ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="text-sm">8+ characters</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${passwordStrength.hasUpperCase ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="text-sm">Uppercase letter</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${passwordStrength.hasLowerCase ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="text-sm">Lowercase letter</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${passwordStrength.hasNumber ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="text-sm">Number</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${passwordStrength.hasSpecialChar ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className="text-sm">Special character</span>
                    </div>
                  </div>
                )}
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={handlePasswordReset}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </>
          )}

          {isResettingPassword && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reset Token
                </label>
                <input
                  type="text"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter reset token"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>
            </>
          )}

          {requiresTwoFactor && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Two-Factor Code
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter 6-digit code"
                />
              </div>
              {errors.twoFactorCode && (
                <p className="text-red-500 text-sm mt-1">{errors.twoFactorCode}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isResettingPassword ? 'Reset Password' : isLogin ? 'Login' : 'Sign Up'}
          </button>

          {!isResettingPassword && !requiresTwoFactor && (
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <img src="/google.svg" alt="Google" className="h-5 w-5" />
                  <span className="ml-2">Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <img src="/facebook.svg" alt="Facebook" className="h-5 w-5" />
                  <span className="ml-2">Facebook</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('twitter')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <img src="/twitter.svg" alt="Twitter" className="h-5 w-5" />
                  <span className="ml-2">Twitter</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('github')}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <img src="/github.svg" alt="GitHub" className="h-5 w-5" />
                  <span className="ml-2">GitHub</span>
                </button>
              </div>
            </div>
          )}

          {!isResettingPassword && !requiresTwoFactor && (
            <p className="text-center text-sm text-gray-600 mt-4">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
} 
} 