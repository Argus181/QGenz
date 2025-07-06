import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

const SUPER_ADMIN_CREDENTIALS = {
  email: 'adepuaravind128@gmail.com',
  password: 'admin123'
};

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if admin is logged in on mount
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const loginAsAdmin = async (email, password) => {
    try {
      setError(null);
      
      // Check credentials
      if (email === SUPER_ADMIN_CREDENTIALS.email && password === SUPER_ADMIN_CREDENTIALS.password) {
        // Get JWT token from backend
        const response = await axios.post('/api/admin/auth/login', {
          email,
          password
        });

        if (response.data.token) {
          localStorage.setItem('adminToken', response.data.token);
          setIsAdmin(true);
          return { success: true };
        } else {
          throw new Error('No token received from server');
        }
      } else {
        throw new Error('Invalid admin credentials');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logoutAsAdmin = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
  };

  const value = {
    isAdmin,
    loading,
    error,
    loginAsAdmin,
    logoutAsAdmin
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
} 