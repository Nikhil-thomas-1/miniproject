// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
};

// Add other API groups as needed
export default {
  ...authAPI,
};