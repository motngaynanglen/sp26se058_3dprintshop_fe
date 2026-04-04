// Định nghĩa các endpoint dùng lại trong toàn project

export const AUTH_ENDPOINTS = {
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
};

export const MATERIAL_ENDPOINTS = {
  QUERY: '/material/query',
  ADD: '/material/add',
  UPDATE_PRICE: '/material/update-price',
};

export const CONCEP_TAG_ENDPOINTS = {
  GET_ALL: '/api/concept-tag/all',
  ADD: '/api/concept-tag/add',
  UPDATE: '/api/concept-tag/update', // appending /{id} in service
  DELETE: '/api/concept-tag/delete', // appending /{id} in service
};

// Có thể mở rộng thêm các nhóm endpoint khác (PRODUCTS, ORDERS, ...)


