import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response && response.status === StatusCodes.UNAUTHORIZED && window.location.pathname !== '/register') {
      window.location.pathname = '/login';
    }

  }
);

export default api;
