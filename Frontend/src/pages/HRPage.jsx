import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from '../components/layout/Header';
import ResumeUploader from '../components/ui/ResumeUploader';
import { Briefcase, Upload, Settings, Users } from 'lucide-react';

const HRPage = () => {
  const navigate = useNavigate();
  const { resumeFile, generateQuestions, selectRole } = useUser();
  const [loading, setLoading] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [questionType, setQuestionType] = useState('technical');
  const [difficultyLevel, setDifficultyLevel] = useState('medium');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setError('Please upload a candidate resume first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      selectRole(jobTitle || ''); // Pass job title as role, empty string if not provided
      await generateQuestions(jobTitle, questionType, difficultyLevel);
      // Increment questions generated counter
      fetch('/api/auth/stats/questions-generated', { method: 'POST' });
      setLoading(false);
      navigate('/hr/questions');
    } catch (err) {
      setLoading(false);
      setError('Failed to generate questions. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex flex-grow items-center justify-center pt-24">
        <div className="container mx-auto mb-8 px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                Hiring Partner Interview Question Generator
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Create tailored interview questions for your candidates
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/50 dark:text-red-400">
                <p className="text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <div className="mb-6 flex items-center gap-3">
                  <Upload className="h-6 w-6 text-indigo-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Candidate Resume</h2>
                </div>
                <ResumeUploader />
              </div>

              <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <div className="mb-6 flex items-center gap-3">
                  <Settings className="h-6 w-6 text-indigo-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customize Questions</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="jobTitle"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Job Title (Optional)
                    </label>
                    <input
                      id="jobTitle"
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g. Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="questionType"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Question Type
                    </label>
                    <select
                      id="questionType"
                      value={questionType}
                      onChange={(e) => setQuestionType(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="technical">Technical</option>
                      <option value="behavioral">Behavioral</option>
                      <option value="scenario">Scenario</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="difficultyLevel"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Difficulty Level
                    </label>
                    <select
                      id="difficultyLevel"
                      value={difficultyLevel}
                      onChange={(e) => setDifficultyLevel(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Customize your questions by specifying a job title, question type, and difficulty level.
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!resumeFile || loading}
                  className={`relative overflow-hidden rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    !resumeFile || loading ? 'cursor-not-allowed opacity-80' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="opacity-0">Generate Questions</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-6 w-6 animate-spin rounded-full border-3 border-white border-t-transparent"></div>
                      </div>
                    </>
                  ) : (
                    'Generate Questions'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HRPage;