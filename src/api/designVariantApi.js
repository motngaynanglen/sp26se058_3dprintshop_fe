import axiosInstance from './axiosInstance';
import { DESIGN_VARIANT_ENDPOINTS } from './endpoints';

const designVariantApi = {
  // Query all variants with filtering and paging
  getAll: (params) => {
    // Lưu ý: Nếu swagger ghi GET nhưng có Body, 
    // ta nên kiểm tra lại hoặc dùng POST nếu GET ko nhận body.
    // Dựa theo hình ảnh Swagger và thiết kế của các API khác trong dự án (design-template/query),
    // ta sẽ dùng POST nếu server yêu cầu body, hoặc GET với params.
    // Tuy nhiên, theo hình ảnh thì nó là GET /api/design-variant/all.
    return axiosInstance.get(DESIGN_VARIANT_ENDPOINTS.ALL, { params });
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
