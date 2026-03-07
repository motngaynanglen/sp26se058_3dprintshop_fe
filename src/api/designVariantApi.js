import axiosInstance from './axiosInstance';
import { DESIGN_VARIANT_ENDPOINTS } from './endpoints';

const designVariantApi = {
  // Query all variants with filtering and paging
  getAll: async (params) => {
    try {
      const response = await axiosInstance.post(DESIGN_VARIANT_ENDPOINTS.ALL, params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add new variant
  add: async (data) => {
    try {
      const response = await axiosInstance.post(DESIGN_VARIANT_ENDPOINTS.ADD, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get detail by ID
  getDetail: async (id) => {
    try {
      const response = await axiosInstance.get(`${DESIGN_VARIANT_ENDPOINTS.GET_DETAIL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update variant
  update: async (id, data) => {
    try {
      const response = await axiosInstance.put(`${DESIGN_VARIANT_ENDPOINTS.UPDATE}/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete variant
  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`${DESIGN_VARIANT_ENDPOINTS.DELETE}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default designVariantApi;
