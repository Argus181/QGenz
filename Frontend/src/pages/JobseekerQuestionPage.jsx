import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { useUser } from '../context/UserContext';
import Header from '../components/layout/Header';
import QuestionList from '../components/ui/QuestionList';
import FeedbackForm from '../components/FeedbackForm';

const JobseekerQuestionPage = () => {
  const navigate = useNavigate();
  const { questions } = useUser();
  const [showFeedback, setShowFeedback] = useState(false);

  // Redirect if no questions are available
  React.useEffect(() => {
    if (questions.length === 0) {
      navigate('/jobseeker');
    }
  }, [questions, navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <button
              onClick={() => navigate('/jobseeker')}
              className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Upload
            </button>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <p className="text-xl font-medium">You've got this! 💪</p>
              <p className="text-gray-600 dark:text-gray-400">
                Here are your personalized interview questions to practice with
              </p>
            </div>
            <QuestionList questions={questions} role="jobseeker" />
          </div>
        </div>
      </main>

      {/* Feedback Button */}
      <button
        onClick={() => setShowFeedback(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        aria-label="Give Feedback"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Feedback Modal */}
      {showFeedback && (
        <FeedbackForm onClose={() => setShowFeedback(false)} />
      )}
    </div>
  );
};

export default JobseekerQuestionPage;