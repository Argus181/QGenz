import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/layout/Header';
import FeedbackForm from '../components/FeedbackForm';

const Feedback = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-grey-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
          
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-4">Share Your Feedback</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Help us improve by sharing your thoughts about our service
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <FeedbackForm onClose={() => navigate(-1)} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedback; 