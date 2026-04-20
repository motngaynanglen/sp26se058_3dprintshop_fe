import axiosInstance from './axiosInstance';

<<<<<<< HEAD
// 1. Truy vấn danh sách lịch sử biến động kho (paging, filter)
export const queryInventoryTransactionsApi = async (payload) => {
  const response = await axiosInstance.post('/api/inventory-transaction/query', payload);
  return response.data;
};

// 2. Tạo mới giao dịch kho (Nhập/Xuất/Điều chỉnh)
export const createInventoryTransactionApi = async (payload) => {
  const response = await axiosInstance.post('/api/inventory-transaction/create', payload);
  return response.data;
};

// 3. Truy vết lịch sử kho theo ReferenceId (OrderId)
export const getInventoryByOrderApi = async (orderId) => {
  const response = await axiosInstance.get(`/api/inventory-transaction/reference/${orderId}`);
  return response.data;
};
=======
const inventoryApi = {
  // Lấy danh sách lịch sử biến động kho (paging + filter)
  query: async (params) => {
    // params: { pageNumber, pageSize, designVariantId, type }
    // type: "ADJUSTMENT" | "IMPORT" | "EXPORT"
    const response = await axiosInstance.post('/api/inventory-transaction/query', params);
    return response.data;
  },

  // Truy vết lịch sử kho theo ReferenceId (orderId)
  getByReference: async (orderId) => {
    const response = await axiosInstance.get(`/api/inventory-transaction/reference/${orderId}`);
    return response.data;
  },

  // Tạo giao dịch kho mới (Nhập / Xuất / Điều chỉnh)
  create: async ({ designVariantId, quantity, type, note }) => {
    const response = await axiosInstance.post('/api/inventory-transaction/create', {
      designVariantId,
      quantity,
      type,   // "ADJUSTMENT" | "IMPORT" | "EXPORT"
      note,
    });
    return response.data;
  },
};

export default inventoryApi;
>>>>>>> 7875ef51cf662e53ccd5b92ca421975416e4078b
