import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from '../components/layout/Header';
import ResumeUploader from '../components/ui/ResumeUploader';
import { Briefcase, Upload, Code, Brain, Settings } from 'lucide-react';

const JobseekerPage = () => {
  const navigate = useNavigate();
  const { resumeFile, generateQuestions, selectRole } = useUser();
  const [loading, setLoading] = useState(false);
  const [questionType, setQuestionType] = useState('technical');
  const [resumeDifficultyLevel, setResumeDifficultyLevel] = useState('medium');
  const [resumeNumQuestions, setResumeNumQuestions] = useState(5); // New state for number of questions (resume)
  const [skills, setSkills] = useState('');
  const [skillsDifficultyLevel, setSkillsDifficultyLevel] = useState('medium');
  const [skillsNumQuestions, setSkillsNumQuestions] = useState(5); // New state for number of questions (skills)
  const [error, setError] = useState(null);
  const [useSkills, setUseSkills] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!resumeFile && !skills.trim()) {
      setError('Please upload a resume or specify skills');
      setLoading(false);
      return;
    }

    if (resumeFile && skills.trim()) {
      setError('Please choose either resume upload or skills input, not both');
      setLoading(false);
      return;
    }

    if (useSkills) {
      const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
      if (skillsArray.length === 0) {
        setError('Please enter at least one valid skill');
        setLoading(false);
        return;
      }
      console.log('Sending skills to backend:', skillsArray);
    }

    const maxRetries = 2;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1}: Generating questions`, {
          useSkills,
          resumeFile: resumeFile?.name,
          skills,
          questionType,
          difficulty: useSkills ? skillsDifficultyLevel : resumeDifficultyLevel,
          numQuestions: useSkills ? skillsNumQuestions : resumeNumQuestions,
        });

        if (useSkills) {
          const skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
          const formattedQuestions = await Promise.race([
            generateQuestions('', questionType, skillsDifficultyLevel, skillsArray, skillsNumQuestions),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 15000)),
          ]);
          // Increment questions generated counter
          fetch('/api/auth/stats/questions-generated', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ count: formattedQuestions.length }),
          });
        } else {
          if (!resumeFile) {
            setError('Please upload a resume');
            setLoading(false);
            return;
          }
          selectRole('');
          const formattedQuestions = await Promise.race([
            generateQuestions('', questionType, resumeDifficultyLevel, [], resumeNumQuestions),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 15000)),
          ]);
          // Increment questions generated counter
          fetch('/api/auth/stats/questions-generated', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ count: formattedQuestions.length }),
          });
        }
        setLoading(false);
        navigate('/jobseeker/questions');
        return;
      } catch (err) {
        attempt++;
        console.error(`Attempt ${attempt} failed:`, err);
        if (attempt === maxRetries) {
          setLoading(false);
          setError(err.response?.data?.error || err.message || 'Failed to generate questions. Please try again later.');
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
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
                Practice Interview Questions
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Prepare for your next interview with AI-powered practice questions
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Your Resume</h2>
                </div>
                <ResumeUploader />
                <div className="mt-8">
                  <div className="mb-6 flex items-center gap-3">
                    <Settings className="h-6 w-6 text-indigo-500" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Customize Questions</h3>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
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
                        disabled={useSkills}
                      >
                        <option value="technical">Technical</option>
                        <option value="behavioral">Behavioral</option>
                        <option value="scenario">Scenario</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="resumeNumQuestions"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Number of Questions
                      </label>
                      <input
                        id="resumeNumQuestions"
                        type="number"
                        min="1"
                        max="20"
                        value={resumeNumQuestions}
                        onChange={(e) => setResumeNumQuestions(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        disabled={useSkills}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="resumeDifficultyLevel"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Difficulty Level
                      </label>
                      <select
                        id="resumeDifficultyLevel"
                        value={resumeDifficultyLevel}
                        onChange={(e) => setResumeDifficultyLevel(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        disabled={useSkills}
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Customize your questions by specifying a question type, number of questions, and difficulty level.
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setUseSkills(false);
                      setSkills('');
                      setSkillsDifficultyLevel('medium');
                      setSkillsNumQuestions(5);
                    }}
                    className={`rounded-lg px-6 py-3 font-medium transition-colors ${
                      !useSkills
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Use Resume
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                <div className="mb-6 flex items-center gap-3">
                  <Code className="h-6 w-6 text-indigo-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Specify Skills</h2>
                </div>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="skills"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Skills (comma-separated)
                    </label>
                    <input
                      id="skills"
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="e.g. Python, JavaScript, SQL"
                      disabled={!useSkills}
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                    <label
                      htmlFor="skillsDifficultyLevel"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Difficulty Level
                    </label>
                    <select
                      id="skillsDifficultyLevel"
                      value={skillsDifficultyLevel}
                      onChange={(e) => setSkillsDifficultyLevel(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      disabled={!useSkills}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                    <div className="space-y-2">
                    <label
                      htmlFor="skillsNumQuestions"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Number of Questions
                    </label>
                    <input
                      id="skillsNumQuestions"
                      type="number"
                      min="1"
                      max="20"
                      value={skillsNumQuestions}
                      onChange={(e) => setSkillsNumQuestions(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      disabled={!useSkills}
                    />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setUseSkills(true)}
                    className={`rounded-lg px-6 py-3 font-medium transition-colors ${
                      useSkills
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Use Skills
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={(!resumeFile && !skills.trim()) || loading}
                  className={`relative overflow-hidden rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    (!resumeFile && !skills.trim()) || loading ? 'cursor-not-allowed opacity-80' : ''
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

export default JobseekerPage;