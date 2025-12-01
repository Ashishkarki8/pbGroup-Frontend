// // ========================================
// // API ENDPOINTS
// // Single source of truth for all API routes
// // ========================================

// import { HIDDEN_LOGIN_PATH } from '../utils/constants';

// // ========================================
// // BASE PATHS
// // ========================================
// const BASE = {
//   AUTH: '/api/auth',
//   ADMIN: '/api/admins',
//   POSTER: '/api/posters',
// };

// // ========================================
// // AUTHENTICATION ENDPOINTS
// // ========================================
// export const AUTH_ENDPOINTS = {
//   // Hidden login URL (matches backend)
//   LOGIN: `${BASE.AUTH}/${HIDDEN_LOGIN_PATH}/login`,
  
//   // Standard auth routes
//   LOGOUT: `${BASE.AUTH}/logout`,
//   ME: `${BASE.AUTH}/me`,
//   VERIFY: `${BASE.AUTH}/verify`,
//   REFRESH: `${BASE.AUTH}/refresh`,
// };

// // ========================================
// // ADMIN MANAGEMENT ENDPOINTS
// // ========================================
// export const ADMIN_ENDPOINTS = {
//   // Base admin route
//   BASE: BASE.ADMIN,

//   // Statistics
//   STATS: `${BASE.ADMIN}/stats`,

//   // CRUD operations
//   CREATE: BASE.ADMIN,
//   LIST: BASE.ADMIN,
//   GET_BY_ID: (id) => `${BASE.ADMIN}/${id}`,

//   // Admin actions
//   DEACTIVATE: (id) => `${BASE.ADMIN}/${id}/deactivate`,
//   REACTIVATE: (id) => `${BASE.ADMIN}/${id}/reactivate`,
//   RESET_PASSWORD: (id) => `${BASE.ADMIN}/${id}/reset-password`,
//   DELETE: (id) => `${BASE.ADMIN}/${id}`,
// };

// // ========================================
// // POSTER MANAGEMENT ENDPOINTS
// // ========================================
// export const POSTER_ENDPOINTS = {
//   // Base poster route
//   BASE: BASE.POSTER,

//   // Public routes
//   ACTIVE: `${BASE.POSTER}/public/active`,

//   // CRUD operations
//   CREATE: BASE.POSTER,
//   LIST: BASE.POSTER,
//   GET_BY_ID: (id) => `${BASE.POSTER}/${id}`,
//   UPDATE: (id) => `${BASE.POSTER}/${id}`,
//   DELETE: (id) => `${BASE.POSTER}/${id}`,
// };

// // ========================================
// // HELPER FUNCTIONS
// // ========================================

// /**
//  * Build query string from params object
//  * @param {Object} params - Query parameters
//  * @returns {string} Query string (e.g., "?page=1&limit=10")
//  */
// export const buildQueryString = (params) => {
//   const query = new URLSearchParams();
  
//   Object.entries(params).forEach(([key, value]) => {
//     if (value !== undefined && value !== null && value !== '') {
//       query.append(key, value);
//     }
//   });
  
//   const queryString = query.toString();
//   return queryString ? `?${queryString}` : '';
// };

// /**
//  * Build admin list URL with filters
//  * @param {Object} filters - Filter parameters
//  * @returns {string} Complete URL with query string
//  */
// export const getAdminListUrl = (filters = {}) => {
//   const queryString = buildQueryString(filters);
//   return `${ADMIN_ENDPOINTS.LIST}${queryString}`;
// };

// /**
//  * Build poster list URL with filters
//  * @param {Object} filters - Filter parameters
//  * @returns {string} Complete URL with query string
//  */
// export const getPosterListUrl = (filters = {}) => {
//   const queryString = buildQueryString(filters);
//   return `${POSTER_ENDPOINTS.LIST}${queryString}`;
// };

// // ========================================
// // HEALTH CHECK
// // ========================================
// export const HEALTH_ENDPOINT = '/health';





// ========================================
// API ENDPOINTS
// Single source of truth for all API routes
// ========================================

import { HIDDEN_LOGIN_PATH } from '../utils/constants';

// ========================================
// BASE PATHS
// ========================================
const BASE = {
  AUTH: '/api/auth',
  ADMIN: '/api/admins',
  POSTER: '/api/posters',
};

// ========================================
// AUTHENTICATION ENDPOINTS
// ========================================
export const AUTH_ENDPOINTS = {
  // Hidden login URL (matches backend)
  LOGIN: `${BASE.AUTH}/${HIDDEN_LOGIN_PATH}/login`,
  
  // Standard auth routes
  LOGOUT: `${BASE.AUTH}/logout`,
  ME: `${BASE.AUTH}/me`,
  VERIFY: `${BASE.AUTH}/verify`,
  REFRESH: `${BASE.AUTH}/refresh`,
};

// ========================================
// ADMIN MANAGEMENT ENDPOINTS
// ========================================
export const ADMIN_ENDPOINTS = {
  // Base admin route
  BASE: BASE.ADMIN,

  // Statistics
  STATS: `${BASE.ADMIN}/stats`,

  // CRUD operations
  CREATE: BASE.ADMIN,
  LIST: BASE.ADMIN,
  GET_BY_ID: (id) => `${BASE.ADMIN}/${id}`,

  // Admin actions
  DEACTIVATE: (id) => `${BASE.ADMIN}/${id}/deactivate`,
  REACTIVATE: (id) => `${BASE.ADMIN}/${id}/reactivate`,
  RESET_PASSWORD: (id) => `${BASE.ADMIN}/${id}/reset-password`,
  DELETE: (id) => `${BASE.ADMIN}/${id}`,
};

// ========================================
// POSTER MANAGEMENT ENDPOINTS
// ========================================
export const POSTER_ENDPOINTS = {
  // Base poster route
  BASE: BASE.POSTER,

  // Public routes (no auth required)
  ACTIVE: `${BASE.POSTER}/public/active`,

  // CRUD operations (admin only)
  CREATE: BASE.POSTER,
  LIST: BASE.POSTER,
  GET_BY_ID: (id) => `${BASE.POSTER}/${id}`,
  UPDATE: (id) => `${BASE.POSTER}/${id}`,
  DELETE: (id) => `${BASE.POSTER}/${id}`,
};

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Build query string from params object
 * @param {Object} params - Query parameters
 * @returns {string} Query string (e.g., "?page=1&limit=10")
 */
export const buildQueryString = (params) => {
  const query = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, value);
    }
  });
  
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Build admin list URL with filters
 * @param {Object} filters - Filter parameters (page, limit, role, status)
 * @returns {string} Complete URL with query string
 * @example getAdminListUrl({ page: 1, limit: 10, role: 'admin' })
 */
export const getAdminListUrl = (filters = {}) => {
  const queryString = buildQueryString(filters);
  return `${ADMIN_ENDPOINTS.LIST}${queryString}`;
};

/**
 * Build poster list URL with filters
 * @param {Object} filters - Filter parameters (page, limit, status)
 * @returns {string} Complete URL with query string
 * @example getPosterListUrl({ page: 1, limit: 10, status: 'active' })
 */
export const getPosterListUrl = (filters = {}) => {
  const queryString = buildQueryString(filters);
  return `${POSTER_ENDPOINTS.LIST}${queryString}`;
};

// ========================================
// HEALTH CHECK
// ========================================
export const HEALTH_ENDPOINT = '/health';