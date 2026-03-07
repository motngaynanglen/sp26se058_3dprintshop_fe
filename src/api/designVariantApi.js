import axiosInstance from './axiosInstance';
import { DESIGN_VARIANT_ENDPOINTS } from './endpoints';

const designVariantApi = {
  // Query all variants with filtering and paging
  getAll: (params) => {
    // Backend đã cập nhật endpoint này sang POST để hỗ trợ gửi body dữ liệu (filtering).
    return axiosInstance.post(DESIGN_VARIANT_ENDPOINTS.ALL, params);
  },

  // Add new variant
  add: (data) => {
    return axiosInstance.post(DESIGN_VARIANT_ENDPOINTS.ADD, data);
  },

  // Get detail by ID
  getDetail: (id) => {
    return axiosInstance.get(`${DESIGN_VARIANT_ENDPOINTS.GET_DETAIL}/${id}`);
  },

  // Update variant
  update: (id, data) => {
    return axiosInstance.put(`${DESIGN_VARIANT_ENDPOINTS.UPDATE}/${id}`, data);
  },

  // Delete variant
  delete: (id) => {
    return axiosInstance.delete(`${DESIGN_VARIANT_ENDPOINTS.DELETE}/${id}`);
  }
};

export default designVariantApi;
