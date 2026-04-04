import axiosInstance from './axiosInstance';
import { MATERIAL_ENDPOINTS } from './endpoints';

const materialApi = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get(MATERIAL_ENDPOINTS.GET_ALL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  query: async (params) => {
    try {
      const response = await axiosInstance.post(MATERIAL_ENDPOINTS.QUERY, params);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  add: async (data) => {
    try {
      const response = await axiosInstance.post(MATERIAL_ENDPOINTS.ADD, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePrice: async (data) => {
    try {
      const response = await axiosInstance.post(MATERIAL_ENDPOINTS.UPDATE_PRICE, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default materialApi;
