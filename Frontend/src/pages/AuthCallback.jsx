import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import authService from '../services/authService';

const AuthCallback = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        const name = urlParams.get('name');
        const email = urlParams.get('email');
        const id = urlParams.get('id');

        // If we have token in URL, use it directly
        if (token) {
          const userData = {
            token,
            name: decodeURIComponent(name || ''),
            email: decodeURIComponent(email || ''),
            id
          };

          // Store token
          localStorage.setItem('token', token);

          const result = await login(userData);
          if (result.success) {
            const returnUrl = localStorage.getItem('returnUrl') || '/user-selection';
            localStorage.removeItem('returnUrl');
            navigate(returnUrl);
            return;
          }
        }

        // If no token, try code-based flow
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        if (error) {
          throw new Error('Authentication failed');
        }

        if (!code) {
          throw new Error('No authentication code received');
        }

        const data = await authService.handleGoogleCallback(code);
        const result = await login(data);

        if (result.success) {
          const returnUrl = localStorage.getItem('returnUrl') || '/user-selection';
          localStorage.removeItem('returnUrl');
          navigate(returnUrl);
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        setError(err.message);
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [location, navigate, login]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg">Completing authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-red-500">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-semibold">Authentication Failed</h2>
          <p className="mb-4 text-gray-600">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback; 