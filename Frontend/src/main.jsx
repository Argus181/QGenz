import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <ThemeProvider>
          <UserProvider>
            <AdminProvider>
              <App />
            </AdminProvider>
          </UserProvider>
        </ThemeProvider>
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);