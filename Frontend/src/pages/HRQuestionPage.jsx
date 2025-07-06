import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useUser } from '../context/UserContext';
import Header from '../components/layout/Header';
import QuestionList from '../components/ui/QuestionList';

const HRQuestionPage = () => {
  const navigate = useNavigate();
  const { questions } = useUser();
  
  // Redirect if no questions are available
  React.useEffect(() => {
    if (questions.length === 0) {
      navigate('/hr');
    }
  }, [questions, navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <button
              onClick={() => navigate('/hr')}
              className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Upload
            </button>
          </div>
          
          <div className="mx-auto max-w-3xl">
            <QuestionList questions={questions} role="hr" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HRQuestionPage;