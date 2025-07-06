import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import authService from '../services/authService';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [questions, setQuestions] = useState(() => {
    const stored = localStorage.getItem('questions');
    return stored ? JSON.parse(stored) : [];
  });
  const [questionType, setQuestionType] = useState('technical');

  // Verify token on mount
  useEffect(() => {
    const verifySession = async () => {
      try {
        const isValid = await authService.verifyToken();
        if (!isValid) {
          logout();
        }
      } catch (error) {
        console.error('Session verification failed:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  // Robust login logic
  const login = async (userData) => {
    try {
      setLoading(true);
      if (!userData || !userData.token) {
        throw new Error(userData?.msg || 'Invalid credentials');
      }
      // Prefer user object from backend if available
      const backendUser = userData.user || userData;
      const safeUser = {
        id: backendUser.id || '',
        name: backendUser.name || 'Guest',
        email: backendUser.email || 'noemail@example.com',
        token: userData.token,
      };
      setUser(safeUser);
      localStorage.setItem('user', JSON.stringify(safeUser));
      localStorage.setItem('token', userData.token);
      console.log('User logged in:', safeUser);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.signout();
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setRole(null);
    setResumeFile(null);
    setQuestions([]);
    localStorage.removeItem('questions');
    setQuestionType('technical');
    console.log('User logged out.');
  };

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    console.log('Role selected:', selectedRole);
  };

  const uploadResume = (file) => {
    setResumeFile(file);
    console.log('Resume uploaded:', file?.name);
    if (file) {
      // Increment resume upload counter
      fetch('/api/auth/stats/resume-uploaded', { method: 'POST' });
    }
  };

  const generateQuestions = async (jobTitle = '', questionType = 'technical', difficultyLevel = 'medium', skills = [], numQuestions = 5) => {
    console.log('Generating questions with:', { jobTitle, questionType, difficultyLevel, skills, numQuestions, hasResume: !!resumeFile });
    setQuestionType(questionType);
    const formData = new FormData();
    if (resumeFile) {
      formData.append('resume', resumeFile);
      formData.append('role', role || jobTitle);
      formData.append('question_type', questionType);
      formData.append('difficulty_level', difficultyLevel);
      formData.append('jobTitle', jobTitle);
      formData.append('num_questions', numQuestions); // Add numQuestions to formData
    } else if (skills.length > 0) {
      formData.append('skills', skills.join(','));
      formData.append('role', jobTitle);
      formData.append('question_type', questionType);
      formData.append('difficulty_level', difficultyLevel);
      formData.append('jobTitle', jobTitle);
      formData.append('num_questions', numQuestions); // Add numQuestions to formData
    } else {
      console.error('No resume or skills provided');
      throw new Error('No resume or skills provided');
    }

    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/generate_questions',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('API response:', JSON.stringify(response.data, null, 2));

      const technicalQuestions = response.data.technical_questions || {};
      const behavioralQuestions = response.data.behavioral_questions || {};
      const scenarioQuestions = response.data.scenario_questions || [];

      const formattedQuestions = [
        ...Object.entries(technicalQuestions).flatMap(([skill, questions], index) =>
          questions.map((text, qIndex) => ({
            id: `tech_${skill}_${index + 1}_${qIndex + 1}`,
            text,
            type: 'technical',
          }))
        ),
        ...Object.entries(behavioralQuestions).flatMap(([trait, questions], index) =>
          questions.map((text, qIndex) => ({
            id: `beh_${trait}_${index + 1}_${qIndex + 1}`,
            text,
            type: 'behavioral',
          }))
        ),
        ...scenarioQuestions.map((text, index) => ({
          id: `scen_${index + 1}`,
          text,
          type: 'scenario',
        })),
      ];

      if (formattedQuestions.length === 0) {
        console.warn('No questions formatted from API response');
        throw new Error('No questions generated');
      }

      console.log('Formatted questions:', formattedQuestions);
      setQuestions(formattedQuestions);
      localStorage.setItem('questions', JSON.stringify(formattedQuestions));
      // Increment questions generated counter by the actual number
      fetch('/api/auth/stats/questions-generated', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: formattedQuestions.length }),
      });
      return formattedQuestions;
    } catch (error) {
      console.error('Error generating questions:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw new Error(error.response?.data?.error || 'Failed to generate questions');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        resumeFile,
        questions,
        questionType,
        loading,
        login,
        logout,
        selectRole,
        uploadResume,
        generateQuestions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};