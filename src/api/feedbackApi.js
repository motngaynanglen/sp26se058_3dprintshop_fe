import axiosInstance from './axiosInstance';

const feedbackApi = {
  // Lấy danh sách feedback (Manager/Staff) - có phân trang và search
  query: async (params) => {
    // params: { search, pageNumber, pageSize }
    const response = await axiosInstance.post('/api/feedback/query', params);
    return response.data;
  },

  // Phản hồi 1 feedback
  reply: async (id, replyContent) => {
    const response = await axiosInstance.patch(`/api/feedback/${id}/reply`, { replyContent });
    return response.data;
  },

  // Ẩn/hiện feedback (nếu vi phạm)
  toggleStatus: async (id) => {
    const response = await axiosInstance.patch(`/api/feedback/${id}/toggle-status`, {});
    return response.data;
  },

  // Xóa feedback
  delete: async (id) => {
    const response = await axiosInstance.patch(`/api/feedback/${id}/delete`, {});
    return response.data;
  },
};

export default feedbackApi;
