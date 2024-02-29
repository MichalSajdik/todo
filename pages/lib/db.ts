import axios, { AxiosInstance } from 'axios';

export const db: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

export const ROUTES = {
  TODOS: '/todos',
};