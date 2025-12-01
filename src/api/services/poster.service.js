// ========================================
// POSTER MANAGEMENT API SERVICE
// All poster CRUD operations with Cloudinary integration
// ========================================

import { get, post, put, del } from '../axios.config';
import { POSTER_ENDPOINTS, getPosterListUrl } from '../endpoints';

// ========================================
// POSTER SERVICE
// ========================================
const posterService = {
  /**
   * Get active posters for public display
   * @returns {Promise<Object>} - Active posters array
   */
  getActive: async () => {
    const response = await get(POSTER_ENDPOINTS.ACTIVE);
    return response;
  },

  /**
   * Get all posters with filters (admin only)
   * @param {Object} filters - { page, limit, status }
   * @returns {Promise<Object>} - Paginated poster list
   */
  getAll: async (filters = {}) => {
    const url = getPosterListUrl(filters);
    const response = await get(url);
    return response;
  },

  /**
   * Get single poster by ID (admin only)
   * @param {string} id - Poster ID
   * @returns {Promise<Object>} - Poster data
   */
  getById: async (id) => {
    const response = await get(POSTER_ENDPOINTS.GET_BY_ID(id));
    return response;
  },

  /**
   * Create new poster with image upload (admin only)
   * @param {FormData} formData - Form data containing image file and optional fields
   * @returns {Promise<Object>} - Created poster
   */
  create: async (formData) => {
    const response = await post(POSTER_ENDPOINTS.CREATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  /**
   * Update poster (admin only)
   * @param {string} id - Poster ID
   * @param {FormData} formData - Form data with updated fields
   * @returns {Promise<Object>} - Updated poster
   */
  update: async (id, formData) => {
    const response = await put(POSTER_ENDPOINTS.UPDATE(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  /**
   * Delete poster (admin only)
   * @param {string} id - Poster ID
   * @returns {Promise<Object>} - Deletion confirmation
   */
  delete: async (id) => {
    const response = await del(POSTER_ENDPOINTS.DELETE(id));
    return response;
  },
};

export default posterService;
