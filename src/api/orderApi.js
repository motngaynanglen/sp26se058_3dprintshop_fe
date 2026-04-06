import axiosInstance from './axiosInstance';

const orderApi = {
  // Truy vấn danh sách đơn hàng (query + paging + filter)
  query: async (params) => {
    // params: { pageNumber, pageSize, search, status, ... }
    const response = await axiosInstance.post('/api/order/query', params);
    return response.data;
  },

  // Lấy chi tiết đơn hàng theo ID
  getDetail: async (id) => {
    const response = await axiosInstance.get(`/api/order/${id}/detail`);
    return response.data;
  },

  // Hủy đơn hàng
  cancel: async (id) => {
    const response = await axiosInstance.patch(`/api/order/${id}/cancel`, {});
    return response.data;
  },
};

export default orderApi;
