import axiosInstance from './axiosInstance';
import { CONCEP_TAG_ENDPOINTS } from './endpoints';

const conceptTagApi = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get(CONCEP_TAG_ENDPOINTS.GET_ALL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  add: async (data) => {
    try {
      const response = await axiosInstance.post(CONCEP_TAG_ENDPOINTS.ADD, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const url = `${CONCEP_TAG_ENDPOINTS.UPDATE}/${id}`;
      const response = await axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const url = `${CONCEP_TAG_ENDPOINTS.DELETE}/${id}`;
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default conceptTagApi;
