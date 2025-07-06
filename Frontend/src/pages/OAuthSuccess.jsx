import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const OAuthSuccess = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      try {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        const name = query.get('name');
        const email = query.get('email');
        const id = query.get('id');

        if (!token || !name || !email || !id) {
          throw new Error('Missing required authentication data');
        }

        const userData = {
          id,
          name: decodeURIComponent(name),
          email: decodeURIComponent(email),
          token,
        };

        // Store token in localStorage
        localStorage.setItem('token', token);

        // Login user
        const result = await login(userData);
        if (result.success) {
          navigate('/user-selection');
        } else {
          throw new Error(result.error || 'Login failed');
        }
      } catch (err) {
        console.error('OAuth success error:', err);
        setError(err.message);
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    };

    handleOAuthSuccess();
  }, [location, login, navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-red-500">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-semibold">Authentication Error</h2>
          <p className="mb-4 text-gray-600">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-lg">Completing authentication...</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
