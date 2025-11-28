// ========================================
// LOGIN MODAL COMPONENT
// src/components/modals/LoginModal.jsx
// ========================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LockKeyhole, User, Eye, EyeOff, X } from 'lucide-react';
import Modal from './Modal';
import useAuth from '../../hooks/useAuth';
import useAuthStore from '../../store/authStore';
import { ROUTES } from '../../utils/constants';

// ========================================
// VALIDATION SCHEMA
// ========================================
const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .regex(/^[a-z0-9_]+$/, 'Only lowercase letters, numbers, and underscores allowed'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password cannot exceed 128 characters'),
});

// ========================================
// LOGIN MODAL COMPONENT
// ========================================
const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { login, isLoggingIn, loginMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverFeedback, setServerFeedback] = useState('');

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      onClose();
      navigate(ROUTES.ADMIN_DASHBOARD);
    }
  }, [isAuthenticated, navigate, onClose]);

  // Handle server feedback
  useEffect(() => {
    if (loginMutation.isError && loginMutation.error?.response) {
      const { data } = loginMutation.error.response;
      const baseMessage = data?.message || 'Login failed. Please try again.';
      const remaining = data?.remainingAttempts;

      const formatted =
        typeof remaining === 'number'
          ? `${baseMessage} (${remaining} attempt${remaining === 1 ? '' : 's'} left)`
          : baseMessage;

      setServerFeedback(formatted);
    }

    if (loginMutation.isSuccess) {
      setServerFeedback('');
      reset();
    }
  }, [loginMutation.isError, loginMutation.isSuccess, loginMutation.error, reset]);

  // Submit handler
  const onSubmit = (data) => {
    login({
      username: data.username.toLowerCase().trim(),
      password: data.password,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md"
      className="p-0"
      closeOnOverlayClick={false}
      closeOnEsc={true}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Close login"
      >
        <X size={20} className="text-gray-600" />
      </button>

      {/* Content */}
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <LockKeyhole className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="text-gray-600 mt-2">Enter your credentials to access the dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                {...register('username')}
                className={`block w-full pl-10 pr-3 py-3 border ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="admin_user"
                autoComplete="username"
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockKeyhole className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className={`block w-full pl-10 pr-10 py-3 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || isLoggingIn}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoggingIn ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Logging in...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Server Feedback */}
          {serverFeedback && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 text-center">{serverFeedback}</p>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Protected admin area. Authorized access only.</p>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;



