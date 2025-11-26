// ========================================
// CUSTOM HOOK: useAuth
// Handles all authentication operations with React Query
// ========================================

import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import authService from '../api/services/auth.service';
import { queryKeys, invalidateAuthQueries } from '../lib/react-query';
import useAuthStore from '../store/authStore';
import { ROUTES, TOAST_MESSAGES } from '../utils/constants';

// ========================================
// HOOK: useAuth
// ========================================
export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, clearUser, user, isAuthenticated } = useAuthStore();

  // ========================================
  // QUERY: Get Profile
  // ========================================
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: authService.getProfile,
    enabled: isAuthenticated, // Only fetch if authenticated
    staleTime: 5 * 60 * 1000, // 5 minutes
    onSuccess: (data) => {
      if (data?.admin) {
        setUser(data.admin);
      } else {
        clearUser();
      }
    },
    onError: () => {
      clearUser();
    },
  });

  // ========================================
  // MUTATION: Login
  // ========================================
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data?.admin) {
        setUser(data.admin);
      }
      toast.success(TOAST_MESSAGES.LOGIN_SUCCESS);
      
      // Redirect based on role
      navigate(ROUTES.ADMIN_DASHBOARD);
    },
    onError: (error) => {
      const message = error.response?.data?.message || TOAST_MESSAGES.LOGIN_FAILED;
      toast.error(message);
    },
  });

  // ========================================
  // MUTATION: Logout
  // ========================================
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearUser();
      invalidateAuthQueries();
      toast.success(TOAST_MESSAGES.LOGOUT_SUCCESS);
      navigate(ROUTES.LOGIN);
    },
    onError: () => {
      // Even if API fails, clear local state
      clearUser();
      invalidateAuthQueries();
      navigate(ROUTES.LOGIN);
    },
  });

  // ========================================
  // HELPER FUNCTIONS
  // ========================================

  /**
   * Login user
   */
  const login = (credentials) => {
    return loginMutation.mutate(credentials);
  };

  /**
   * Logout user
   */
  const logout = () => {
    return logoutMutation.mutate();
  };

  /**
   * Check if user is super admin
   */
  const isSuperAdmin = () => {
    return useAuthStore.getState().isSuperAdmin();
  };

  // ========================================
  // RETURN API
  // ========================================
  return {
    // User data
    user,
    isAuthenticated,
    profileData,

    // Loading states
    isLoadingProfile,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    // Functions
    login,
    logout,
    refetchProfile,
    isSuperAdmin,

    // Mutations (for advanced usage)
    loginMutation,
    logoutMutation,
  };
};

// ========================================
// HOOK: useAuthVerify
// Verify token on app load
// ========================================
export const useAuthVerify = () => {
  const { setUser, clearUser, isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: queryKeys.auth.verify(),
    queryFn: authService.verifyAuth,
    enabled: isAuthenticated,
    retry: 1,
    staleTime: Infinity, // Don't refetch automatically
    onSuccess: (data) => {
      if (data?.admin) {
        setUser(data.admin);
      } else {
        clearUser();
      }
    },
    onError: () => {
      clearUser();
    },
  });
};

export default useAuth;