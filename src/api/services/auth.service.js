// // ========================================
// // AUTHENTICATION API SERVICE
// // All auth-related API calls
// // ========================================

// import { get, post } from '../axios.config';
// import { AUTH_ENDPOINTS } from '../endpoints';

// // ========================================
// // AUTH SERVICE
// // ========================================
// const authService = {
//   /**
//    * Login admin
//    * @param {Object} credentials - { email, password }
//    * @returns {Promise<Object>} - User data
//    */
//   login: async (credentials) => {
//     const response = await post(AUTH_ENDPOINTS.LOGIN, credentials);
//     return response;
//   },

//   /**
//    * Logout admin
//    * @returns {Promise<Object>}
//    */
//   logout: async () => {
//     const response = await post(AUTH_ENDPOINTS.LOGOUT);
//     return response;
//   },

//   /**
//    * Get current logged-in user profile
//    * @returns {Promise<Object>} - User data
//    */
//   getProfile: async () => {
//     const response = await get(AUTH_ENDPOINTS.ME);
//     return response;
//   },

//   /**
//    * Verify if token is valid
//    * @returns {Promise<Object>}
//    */
//   verifyAuth: async () => {
//     const response = await get(AUTH_ENDPOINTS.VERIFY);
//     return response;
//   },

//   /**
//    * Refresh authentication token
//    * @returns {Promise<Object>}
//    */
//   refreshToken: async () => {
//     const response = await post(AUTH_ENDPOINTS.REFRESH);
//     return response;
//   },
// };

// export default authService;







// ========================================
// AUTHENTICATION API SERVICE
// All auth-related API calls
// ========================================

import { get, post } from '../axios.config';
import { AUTH_ENDPOINTS } from '../endpoints';

// ========================================
// AUTH SERVICE
// ========================================
const authService = {

  /**
   * Login admin
   * @param {Object} credentials - { username, password }
   * @returns {Promise<Object>} - User data
   */
  login: async (credentials) => {
    // credentials = { username, password }
    const response = await post(AUTH_ENDPOINTS.LOGIN, credentials);
    return response;
  },

  /**
   * Logout admin
   * @returns {Promise<Object>}
   */
  logout: async () => {
    const response = await post(AUTH_ENDPOINTS.LOGOUT);
    return response;
  },

  /**
   * Get current logged-in user profile
   * @returns {Promise<Object>} - User data
   */
  getProfile: async () => {
    const response = await get(AUTH_ENDPOINTS.ME);
    return response;
  },

  /**
   * Verify if token is valid
   * @returns {Promise<Object>}
   */
  verifyAuth: async () => {
    const response = await get(AUTH_ENDPOINTS.VERIFY);
    return response;
  },

  /**
   * Refresh authentication token
   * @returns {Promise<Object>}
   */
  refreshToken: async () => {
    const response = await post(AUTH_ENDPOINTS.REFRESH);
    return response;
  },
};

export default authService;
