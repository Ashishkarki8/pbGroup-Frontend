// ========================================
// ADMIN MANAGEMENT API SERVICE
// All admin CRUD operations
// ========================================

import { get, post, put, del } from '../axios.config';
import { ADMIN_ENDPOINTS, getAdminListUrl } from '../endpoints';

// ========================================
// ADMIN SERVICE
// ========================================
const adminService = {
  /**
   * Get admin statistics
   * @returns {Promise<Object>} - Stats data
   */
  getStats: async () => {
    const response = await get(ADMIN_ENDPOINTS.STATS);
    return response;
  },

  /**
   * Get all admins with filters
   * @param {Object} filters - { page, limit, role, status, search }
   * @returns {Promise<Object>} - Paginated admin list
   */
  getAll: async (filters = {}) => {
    const url = getAdminListUrl(filters);
    const response = await get(url);
    return response;
  },

  /**
   * Get single admin by ID
   * @param {string} id - Admin ID
   * @returns {Promise<Object>} - Admin data
   */
  getById: async (id) => {
    const response = await get(ADMIN_ENDPOINTS.GET_BY_ID(id));
    return response;
  },

  /**
   * Create new admin
   * @param {Object} adminData - { username, password }
   * @returns {Promise<Object>} - Created admin
   */
  create: async (adminData) => {
    const response = await post(ADMIN_ENDPOINTS.CREATE, adminData);
    return response;
  },

  /**
   * Deactivate admin
   * @param {string} id - Admin ID
   * @param {string} reason - Reason for deactivation
   * @returns {Promise<Object>}
   */
  deactivate: async (id, reason) => {
    const response = await put(ADMIN_ENDPOINTS.DEACTIVATE(id), { reason });
    return response;
  },

  /**
   * Reactivate admin
   * @param {string} id - Admin ID
   * @returns {Promise<Object>}
   */
  reactivate: async (id) => {
    const response = await put(ADMIN_ENDPOINTS.REACTIVATE(id));
    return response;
  },

  /**
   * Reset admin password
   * @param {string} id - Admin ID
   * @param {string} newPassword - New password
   * @returns {Promise<Object>}
   */
  resetPassword: async (id, newPassword) => {
    const response = await put(ADMIN_ENDPOINTS.RESET_PASSWORD(id), { newPassword });
    return response;
  },

  /**
   * Delete admin permanently
   * @param {string} id - Admin ID
   * @returns {Promise<Object>}
   */
  delete: async (id) => {
    const response = await del(ADMIN_ENDPOINTS.DELETE(id));
    return response;
  },
};

export default adminService;