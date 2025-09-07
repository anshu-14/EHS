import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ,
  withCredentials: true}
);
export const configureAxios = (token, logout) => {
  // Clear any existing interceptors to avoid duplicates
  api.interceptors.request.eject(api.interceptors.request[0] || {});
  api.interceptors.response.eject(api.interceptors.response[0] || {});

  // Request Interceptor: Add token to headers
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );


};
export default api;