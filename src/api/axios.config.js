// ========================================
// AXIOS CONFIGURATION WITH INTERCEPTORS
// Handles: Authentication, Token Refresh, Error Handling
// ========================================

import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL, ROUTES, TOAST_MESSAGES } from '../utils/constants';
import { AUTH_ENDPOINTS } from './endpoints';

// ========================================
// CREATE AXIOS INSTANCE
// ========================================
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ CRITICAL: Send cookies with every request
});

// ========================================
// REQUEST INTERCEPTOR
// ========================================
apiClient.interceptors.request.use(
  (config) => {
    // Add any custom headers here if needed
    // JWT is automatically sent via HttpOnly cookie
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ========================================
// RESPONSE INTERCEPTOR
// ========================================
let isRefreshing = false;
let failedRequestsQueue = [];

apiClient.interceptors.response.use(
  // Success handler
  (response) => {
    return response;
  },
  
  // Error handler
  async (error) => {
    const originalRequest = error.config;
    
    // ========================================
    // CASE 1: Network Error
    // ========================================
    if (!error.response) {
      toast.error(TOAST_MESSAGES.NETWORK_ERROR);
      return Promise.reject(error);
    }
    
    const { status, data } = error.response;
    
    // ========================================
    // CASE 2: Token Expired (401)
    // ========================================
    if (status === 401 && !originalRequest._retry) {
      // Prevent infinite loop
      if (originalRequest.url.includes(AUTH_ENDPOINTS.REFRESH)) {
        // Refresh token also failed - logout user
        handleAuthFailure();
        return Promise.reject(error);
      }
      
      // Try to refresh token
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;
        
        try {
          // Call refresh token endpoint
          await apiClient.post(AUTH_ENDPOINTS.REFRESH);
          
          // Token refreshed successfully
          isRefreshing = false;
          
          // Retry all queued requests
          failedRequestsQueue.forEach((callback) => callback());
          failedRequestsQueue = [];
          
          // Retry original request
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed - logout user
          isRefreshing = false;
          failedRequestsQueue = [];
          handleAuthFailure();
          return Promise.reject(refreshError);
        }
      }
      
      // If refresh is in progress, queue this request
      return new Promise((resolve, reject) => {
        failedRequestsQueue.push(() => {
          apiClient(originalRequest)
            .then(resolve)
            .catch(reject);
        });
      });
    }
    
    // ========================================
    // CASE 3: Forbidden (403)
    // ========================================
    if (status === 403) {
      toast.error(TOAST_MESSAGES.UNAUTHORIZED);
      
      // Redirect to unauthorized page
      if (window.location.pathname !== ROUTES.UNAUTHORIZED) {
        window.location.href = ROUTES.UNAUTHORIZED;
      }
    }
    
    // ========================================
    // CASE 4: Too Many Requests (429)
    // ========================================
    if (status === 429) {
      toast.error(data?.message || 'Too many requests. Please try again later.');
    }
    
    // ========================================
    // CASE 5: Server Error (500+)
    // ========================================
    if (status >= 500) {
      toast.error(TOAST_MESSAGES.SERVER_ERROR);
    }
    
    // ========================================
    // CASE 6: Client Error (400-499)
    // ========================================
    if (status >= 400 && status < 500 && status !== 401 && status !== 403) {
      // Don't show toast for validation errors (let forms handle it)
      // Only show for unexpected client errors
      if (!data?.errors && !originalRequest.suppressErrorToast) {
        toast.error(data?.message || 'An error occurred');
      }
    }
    
    return Promise.reject(error);
  }
);

// ========================================
// HANDLE AUTHENTICATION FAILURE
// ========================================
const handleAuthFailure = () => {
  // Clear auth state (will be handled by Zustand store)
  toast.error(TOAST_MESSAGES.SESSION_EXPIRED);
  
  // Redirect to login
  if (window.location.pathname !== ROUTES.LOGIN) {
    window.location.href = ROUTES.LOGIN;
  }
};

// ========================================
// API HELPER METHODS
// ========================================

/**
 * GET request
 */
export const get = async (url, config = {}) => {
  const response = await apiClient.get(url, config);
  return response.data;
};

/**
 * POST request
 */
export const post = async (url, data = {}, config = {}) => {
  const response = await apiClient.post(url, data, config);
  return response.data;
};

/**
 * PUT request
 */
export const put = async (url, data = {}, config = {}) => {
  const response = await apiClient.put(url, data, config);
  return response.data;
};

/**
 * PATCH request
 */
export const patch = async (url, data = {}, config = {}) => {
  const response = await apiClient.patch(url, data, config);
  return response.data;
};

/**
 * DELETE request
 */
export const del = async (url, config = {}) => {
  const response = await apiClient.delete(url, config);
  return response.data;
};

// ========================================
// EXPORT DEFAULT INSTANCE
// ========================================
export default apiClient;