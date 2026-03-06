// Định nghĩa các endpoint dùng lại trong toàn project

export const AUTH_ENDPOINTS = {
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
};

export const MATERIAL_ENDPOINTS = {
  GET_ALL: '/api/material/all',
  QUERY: '/api/material/query',
  ADD: '/api/material/add',
  UPDATE_PRICE: '/api/material/update-price',
};

export const CONCEP_TAG_ENDPOINTS = {
  GET_ALL: '/api/concept-tag/all',
  ADD: '/api/concept-tag/add',
  UPDATE: '/api/concept-tag/update', // appending /{id} in service
  DELETE: '/api/concept-tag/delete', // appending /{id} in service
};

export const DESIGN_TEMPLATE_ENDPOINTS = {
  QUERY: '/api/design-template/query',
  DETAIL: '/api/design-template/detail', // appending /{id} in service
  ADD: '/api/design-template/add',
  UPDATE: '/api/design-template/update', // appending /{id} in service
  DELETE: '/api/design-template/delete', // appending /{id} in service
};

export const DESIGN_TAG_ENDPOINTS = {
  GET_TAGS: '/api/design-template', // appending /{id}/tags in service
  SYNC: '/api/design-tag/sync',
};

export const DESIGN_VARIANT_ENDPOINTS = {
  ALL: '/api/design-variant/all',
  ADD: '/api/design-variant/add',
  GET_DETAIL: '/api/design-variant/detail', // appending /{id}
  UPDATE: '/api/design-variant/update', // appending /{id}
  DELETE: '/api/design-variant/delete', // appending /{id}
};

