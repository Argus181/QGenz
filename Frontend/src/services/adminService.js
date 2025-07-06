import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5010/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

const adminService = {
  // Dashboard Statistics
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // User Management
  getUsers: async (page = 1, limit = 10) => {
    try {
      const response = await api.get('/admin/users?page=' + page + '&limit=' + limit);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const response = await api.get('/admin/users/' + userId);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await api.put('/admin/users/' + userId, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await api.delete('/admin/users/' + userId);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  // Resume Management
  getResumes: async (page = 1, limit = 10) => {
    try {
      const response = await api.get('/admin/resumes?page=' + page + '&limit=' + limit);
      return response.data;
    } catch (error) {
      console.error('Error fetching resumes:', error);
      throw error;
    }
  },

  getResumeById: async (resumeId) => {
    try {
      const response = await api.get('/admin/resumes/' + resumeId);
      return response.data;
    } catch (error) {
      console.error('Error fetching resume:', error);
      throw error;
    }
  },

  // System Health
  getSystemHealth: async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/system/health`);
      return response.data;
    } catch (error) {
      console.error('Error fetching system health:', error);
      throw error;
    }
  },

  // Analytics
  getUserGrowth: async (timeRange = '7d') => {
    try {
      const response = await axios.get(`${API_URL}/admin/analytics/users/growth?timeRange=${timeRange}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user growth:', error);
      throw error;
    }
  },

  getResumeUploads: async (timeRange = '7d') => {
    try {
      const response = await axios.get(`${API_URL}/admin/analytics/resumes/uploads?timeRange=${timeRange}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resume uploads:', error);
      throw error;
    }
  },

  // Recent Activity
  getRecentActivity: async (limit = 10) => {
    try {
      const response = await axios.get(`${API_URL}/admin/activity?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      throw error;
    }
  },

  // Authentication
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/admin/auth/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error during admin login:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  },

  // Verify admin token
  verifyToken: async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return false;

      const response = await axios.get(`${API_URL}/admin/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.success;
    } catch (error) {
      console.error('Error verifying admin token:', error);
      return false;
    }
  },

  // Get all support messages
  getMessages: async () => {
    try {
      const response = await axios.get(`${API_URL}/support/messages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching support messages:', error);
      throw error;
    }
  },

  // Update message status
  updateMessageStatus: async (messageId, status) => {
    try {
      const response = await axios.put(
        `${API_URL}/support/messages/${messageId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating message status:', error);
      throw error;
    }
  },

  // Add reply to message
  addReply: async (messageId, reply) => {
    try {
      const response = await axios.post(
        `${API_URL}/support/messages/${messageId}/reply`,
        { reply },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding reply:', error);
      throw error;
    }
  }
};

export default adminService; 