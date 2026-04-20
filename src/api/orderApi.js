import axiosInstance from './axiosInstance';

// 1. Truy vấn danh sách đơn hàng (search, filter, paging)
export const queryOrdersApi = async (payload) => {
  const response = await axiosInstance.post('/api/order/query', payload);
  return response.data;
};

// 2. Lấy chi tiết đơn hàng
export const getOrderDetailApi = async (id) => {
  const response = await axiosInstance.get(`/api/order/${id}/detail`);
  return response.data;
};

// 3. Hủy đơn hàng
export const cancelOrderApi = async (id, reason = '') => {
  const response = await axiosInstance.patch(`/api/order/${id}/cancel`, { reason });
  return response.data;
};

// 4. Tạo đơn hàng (checkout)
export const checkoutOrderApi = async (payload) => {
  const response = await axiosInstance.post('/api/order/checkout', payload);
  return response.data;
};

// 5. Thực hiện thanh toán đơn hàng
export const performTransactionApi = async (payload) => {
  const response = await axiosInstance.post('/api/transaction/perform-transaction', payload);
  return response.data;
};