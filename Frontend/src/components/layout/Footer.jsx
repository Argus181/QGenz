import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useAdmin } from '../../context/AdminContext';

const Footer = () => {
  const { user, role } = useUser();
  const { isAdmin } = useAdmin();

  const renderEmployerLinks = () => (
    <div>
      <h3 className="mb-4 text-lg font-semibold">For Employers</h3>
      <ul className="space-y-2">
        {user && role === 'employer' ? (
          <>
            <li>
              <Link to="/hr/questions" className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                Generate Questions
              </Link>
            </li>
            <li>
              <Link to="/hr" className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                Dashboard
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/hr" className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                Recruitment Tool
              </Link>
            </li>
            <li>
              <Link to="/features" className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                Features
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );

  const renderCandidateLinks = () => (
    <div>
      <h3 className="mb-4 text-lg font-semibold">For Candidates</h3>
      <ul className="space-y-2">
        {user && role === 'candidate' ? (
          <>
            <li>
              <Link to="/jobseeker/questions" className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                Practice Questions
              </Link>
            </li>
            <li>
              <Link to="/jobseeker" className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                Dashboard
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/jobseeker" className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                Practice Tool
              </Link>
            </li>
            <li>
              <Link to="/features" className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                Features
              </Link>
            </li>
          </>
        )}
  
      </ul>
    </div>
  );

  return (
    <footer className="bg-gray-50 pt-12 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Logo & Description */}
          <div className="mb-8">
            <Link to="/" className="mb-4 flex items-center gap-2">
              <BrainCircuit className="h-8 w-8 text-primary-500" />
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent">
                Qgenz
              </span>
            </Link>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              AI-powered interview question generation for Hiring Partners and Career Explorers.
              Take your interview preparation to the next level.
            </p>
          </div>

          {renderEmployerLinks()}
          {renderCandidateLinks()}
        </div>

        {/* Company Links */}
        <div className="mt-8 border-t border-gray-200 py-6">
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/about" className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
              Contact
            </Link>
            <Link to="/support" className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
              Support
            </Link>
            {isAdmin && (
              <Link to="" className="text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400">
                
              </Link>
            )}
          </div>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Qgenz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;