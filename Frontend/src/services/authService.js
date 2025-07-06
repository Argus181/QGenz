import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5010/api';

const authService = {
  async signup(userData) {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  },

  async signin(credentials) {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Signin failed');
    }
  },

  async signout() {
    localStorage.removeItem('token');
  },

  async verifyToken() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;

      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.valid;
    } catch (error) {
      return false;
    }
  },

  async handleGoogleCallback(code) {
    try {
      const response = await axios.get(`${API_URL}/auth/google/callback`, {
        params: { code }
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Google authentication failed');
    }
  },

  async checkServerHealth() {
    try {
      const response = await axios.get(`${API_URL}/health`);
      return response.status === 200;
    } catch (error) {
      console.error('Server health check failed:', error);
      return false;
    }
  },

  getToken() {
    return localStorage.getItem('token');
  },

  async forgotPassword(email) {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Failed to process forgot password request');
    }
  },

  async verifyOTP(email, otp) {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, { email, otp });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Failed to verify OTP');
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, { token, newPassword });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.msg || 'Failed to reset password');
    }
  }
};

export default authService; 