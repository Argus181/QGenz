import React from 'react';
import { MessageSquare } from 'lucide-react';
import FeedbackList from '../../components/FeedbackList';

const Feedback = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <MessageSquare className="h-8 w-8 text-indigo-500" />
          Feedback Management
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          View and manage user feedback submissions
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <FeedbackList />
      </div>
    </div>
  );
};

export default Feedback; 