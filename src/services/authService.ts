
import axios from 'axios';

// API base URL for your backend
const API_URL = 'https://poufmaker-api-deploy.vercel.app/api';

// Auth token to include in API requests
const API_AUTH_TOKEN = 'sdrA4dawedewqedfgagfaweardaweq2dwa';

export interface User {
  Id: string;
  FullName: string;
  Email: string;
  Role: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface LoginCredentials {
  Email: string;
  Password: string;
}

export interface RegisterCredentials {
  FullName: string;
  Email: string;
  Password: string;
  PhoneNumber?: string;
}

// Store the JWT token in localStorage
const storeToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

// Get the stored JWT token
const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Remove the stored JWT token
const removeToken = () => {
  localStorage.removeItem('authToken');
};

// Setup axios instance with auth headers
const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_AUTH_TOKEN}`
  }
});

// Add user token to every request if available
authAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Login user
const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await authAxios.post(`${API_URL}/auth/login`, credentials);
    const { user, token } = response.data;
    storeToken(token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Register user
const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    const response = await authAxios.post(`${API_URL}/auth/register`, credentials);
    const { user, token } = response.data;
    storeToken(token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get the current user
const getCurrentUser = async (): Promise<User | null> => {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await authAxios.get(`${API_URL}/auth/me`);
    return response.data.user;
  } catch (error) {
    removeToken();
    return null;
  }
};

// Logout user
const logout = async (): Promise<void> => {
  try {
    const token = getToken();
    if (token) {
      await authAxios.post(`${API_URL}/auth/logout`);
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    removeToken();
  }
};

const authService = {
  login,
  register,
  getCurrentUser,
  logout,
  getToken,
};

export default authService;
