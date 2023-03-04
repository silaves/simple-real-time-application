const config = {
  apiHost: import.meta.env.VITE_API_BASE_URL,
  apiClient: import.meta.env.VITE_API_CLIENT,
  apiProduct: import.meta.env.VITE_API_PRODUCT,
  apiItem: "/api/item",
  apiCategory: "/api/category",
  apiAuthLogin: import.meta.env.VITE_API_AUTH_LOGIN,
  apiAuthRegister: import.meta.env.VITE_API_AUTH_REGISTER,
  nameUserToken: import.meta.env.VITE_API_NAME_TOKEN,
};

export default config;
