import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5010/api';

const supportService = {
  // Send a new support message
  async sendMessage(messageData) {
    try {
      const response = await axios.post(`${API_URL}/support/messages`, messageData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send support message');
    }
  },

  // Get all support messages (admin only)
  async getMessages() {
    try {
      const response = await axios.get(`${API_URL}/support/messages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch support messages');
    }
  },

  // Update message status (admin only)
  async updateMessageStatus(messageId, status) {
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
      throw new Error(error.response?.data?.message || 'Failed to update message status');
    }
  },

  // Add reply to message (admin only)
  async addReply(messageId, reply) {
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
      throw new Error(error.response?.data?.message || 'Failed to add reply');
    }
  }
};

export default supportService; 