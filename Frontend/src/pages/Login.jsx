import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Facebook, Github, Shield } from 'lucide-react';
import { BrainCircuit } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useAdmin } from '../context/AdminContext';
import ParticleBackground from '../components/ui/ParticleBackground';
import AdminLoginModal from '../components/admin/AdminLoginModal';
import authService from '../services/authService';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const { login, signup } = useUser();
  const { loginAsAdmin, error: adminError } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('signup') === 'true') {
      setIsSignUp(true);
    }
  }, [location]);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let userData;
      if (isSignUp) {
        userData = await authService.signup({ name, email, password });
      } else {
        userData = await authService.signin({ email, password });
      }

      // Only proceed if userData.token exists
      if (!userData.token) {
        throw new Error(userData.msg || 'Invalid credentials');
      }

      const result = await login(userData);
      if (result.success) {
        navigate('/user-selection');
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkServerStatus = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('Server check failed:', error);
      return false;
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true);
      setError('');

      if (provider === 'google') {
        // Redirect to backend Google auth endpoint
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
      } else {
        throw new Error(`${provider} login is not implemented yet.`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add useEffect to handle Google auth callback
  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        setError('Google authentication failed. Please try again.');
        return;
      }

      if (code) {
        try {
          setLoading(true);
          // Use the full callback URL
          const callbackUrl = `${window.location.origin}/auth/callback`;
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/google/callback?code=${code}&callback=${encodeURIComponent(callbackUrl)}`
          );
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Google authentication failed');
          }

          const result = await login(data);
          if (result.success) {
            const returnUrl = localStorage.getItem('returnUrl') || '/user-selection';
            localStorage.removeItem('returnUrl');
            navigate(returnUrl);
          } else {
            throw new Error(result.error);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    handleGoogleCallback();
  }, [navigate, login]);

  const handleAdminSignIn = async (email, password) => {
    try {
      setLoading(true);
      setError('');

      const result = await loginAsAdmin(email, password);
      
      if (result.success) {
        setShowAdminModal(false);
        navigate('/admin');
      } else {
        setError(result.error || 'Failed to sign in as admin');
      }
    } catch (err) {
      setError(err.message || 'Failed to sign in as admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <ParticleBackground variant="login" />
      <button
        onClick={() => navigate('/')}
        className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white dark:bg-gray-800/80 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </button>

      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
        <div className="grid md:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-primary-500 to-secondary-600 p-12 text-white md:block">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-8 w-8" />
                  <span className="text-2xl font-bold">Qgenz</span>
                </div>
                <h2 className="mt-12 text-3xl font-bold">Welcome to Qgenz</h2>
                <p className="mt-4 text-white/80">
                  AI-powered interview question generation platform for HR professionals and job seekers.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="md:hidden mb-8 flex items-center justify-center gap-2">
              <BrainCircuit className="h-8 w-8 text-primary-500" />
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent">
                Qgenz
              </span>
            </div>

            <div className="mb-8 flex justify-center gap-3">
              <button onClick={() => setIsSignUp(false)} className={`pb-2 text-sm font-medium ${!isSignUp ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}>Sign In</button>
              <button onClick={() => setIsSignUp(true)} className={`pb-2 text-sm font-medium ${isSignUp ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}>Sign Up</button>
            </div>

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="mb-4">
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="John Doe" />
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="john@example.com" />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <div className="relative">
                  <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input pr-10" placeholder="••••••••" />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">{error}</div>}

              <button type="submit" className="btn-primary w-full">{isSignUp ? 'Create Account' : 'Sign In'}</button>

              <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
                <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">OR</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
              </div>

              <div className="grid gap-3">
                <button 
                  type="button" 
                  onClick={() => handleSocialLogin('google')} 
                  className="btn-outline flex w-full items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  ) : (
                    <span>Continue with Google</span>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowAdminModal(true)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50 dark:border-indigo-700 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700"
              >
                <Shield className="h-5 w-5" />
                Sign in as Admin
              </button>

              <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button type="button" onClick={toggleForm} className="ml-1 font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onLogin={handleAdminSignIn}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Login;
