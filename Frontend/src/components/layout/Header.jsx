import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, BrainCircuit, User, Settings, HelpCircle, LogOut, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';
import { useUser } from '../../context/UserContext';
import { Button } from '../ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, loading: userLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(prev => !prev);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Support', path: '/support' }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  const profileVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  if (userLoading) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-900/80' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <BrainCircuit className="h-8 w-8 text-primary-500" />
              </motion.div>
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent">
                Qgenz
              </span>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={item.path}
                  className={`nav-link capitalize relative group flex items-center gap-2 ${
                    location.pathname === item.path ? 'text-primary-500' : ''
                  }`}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.name}
                  <motion.span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
                      location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {user ? (
              <div ref={profileRef} className="relative flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleProfile}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white transition-all duration-300 hover:shadow-lg"
                >
                  {user?.name?.charAt(0).toUpperCase() || 'G'}
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      variants={profileVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="absolute right-0 top-12 z-50 w-56 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800"
                    >
                      <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-700">
                        <p className="font-medium">{user?.name || 'Guest'}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                      </div>
                      <ul className="py-1">
                        <motion.li whileHover={{ x: 5 }}>
                          <Link 
                            to="/profile"
                            className="menu-button flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </Link>
                        </motion.li>
                        <motion.li whileHover={{ x: 5 }}>
                          <Link 
                            to="/help"
                            className="menu-button flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <HelpCircle className="h-4 w-4" />
                            Help
                          </Link>
                        </motion.li>
                        <motion.li 
                          whileHover={{ x: 5 }}
                          className="border-t border-gray-200 dark:border-gray-700"
                        >
                          <button
                            onClick={handleLogout}
                            className="menu-button flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </motion.li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden space-x-2 md:flex">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login" className="btn-outline">
                    Sign In
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login?signup=true" className="btn-primary">
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
        </div>
      </div>

        {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
              className="absolute left-0 right-0 top-16 z-40 rounded-b-lg bg-white p-4 shadow-lg dark:bg-gray-800 md:hidden"
          >
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="py-2"
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 text-lg ${
                      location.pathname === item.path ? 'text-primary-500' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              {!user && (
                <div className="mt-4 flex flex-col gap-2 px-4">
                  <Link
                    to="/login"
                    className="btn-outline w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                      Sign In
                    </Link>
                  <Link
                    to="/login?signup=true"
                    className="btn-primary w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                      Sign Up
                    </Link>
                </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
