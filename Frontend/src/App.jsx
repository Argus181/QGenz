import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import Home from './pages/Home';
import Login from './pages/Login';
import UserSelection from './pages/UserSelection';
import HRPage from './pages/HRPage';
import JobseekerPage from './pages/JobseekerPage';
import HRQuestionPage from './pages/HRQuestionPage';
import JobseekerQuestionPage from './pages/JobseekerQuestionPage';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import About from './pages/About';
import Contact from './pages/Contact';
import Support from './pages/Support';
import Help from './pages/Help';
import Feedback from './pages/Feedback';
import AuthCallback from './pages/AuthCallback';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Content from './pages/admin/Content';
import Settings from './pages/admin/Settings';
import AdminSupport from './pages/admin/Support';
import AdminLogin from './pages/admin/Login';
import AdminFeedback from './pages/admin/Feedback';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import ResetPasswordForm from './components/auth/ResetPasswordForm';
import VerifyOTPForm from './components/auth/VerifyOTPForm';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/*" element={
          <AdminProvider>
            <Routes>
              <Route path="login" element={<AdminLogin />} />
              <Route path="/" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="content" element={<Content />} />
                <Route path="settings" element={<Settings />} />
                <Route path="support" element={<AdminSupport />} />
                <Route path="feedback" element={<AdminFeedback />} />
              </Route>
            </Routes>
          </AdminProvider>
        } />

        {/* Auth callback routes */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/oauth-success" element={<AuthCallback />} />

        {/* Password reset routes */}
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/verify-otp" element={<VerifyOTPForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />

        {/* User website routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-selection" element={<UserSelection />} />
        <Route path="/hr" element={<HRPage />} />
        <Route path="/jobseeker" element={<JobseekerPage />} />
        <Route path="/hr/questions" element={<HRQuestionPage />} />
        <Route path="/jobseeker/questions" element={<JobseekerQuestionPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
        <Route path="/help" element={<Help />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
}

export default App;