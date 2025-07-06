import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase as BriefcaseBusiness, GraduationCap } from 'lucide-react';
import { useUser } from '../context/UserContext';
import Header from '../components/layout/Header';
import ParticleBackground from '../components/ui/ParticleBackground';

const UserSelection = () => {
  const navigate = useNavigate();
  const { selectRole } = useUser();
  
  const handleRoleSelect = (role) => {
    selectRole(role);
    navigate(role === 'hr' ? '/hr' : '/jobseeker');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ParticleBackground variant="selection" />
      
      <main className="flex flex-grow items-center justify-center px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 animate-slide-down">Welcome to Qgenz</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Please select your role to continue
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* HR Card */}
            <div 
              onClick={() => handleRoleSelect('hr')}
              className="card group cursor-pointer p-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 group-hover:bg-primary-200 dark:bg-primary-900/30 dark:group-hover:bg-primary-900/50">
                  <BriefcaseBusiness className="h-12 w-12 text-primary-500" />
                </div>
                
                <h2 className="mb-2 text-2xl font-bold">Hiring Partner</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  Generate interview questions for your candidates based on job descriptions and resumes
                </p>
                
                <div className="rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 transition-colors group-hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-300 dark:group-hover:bg-primary-900/50">
                  Select as Scout
                </div>
              </div>
            </div>
            
            {/* Jobseeker Card */}
            <div 
              onClick={() => handleRoleSelect('jobseeker')}
              className="card group cursor-pointer p-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary-100 group-hover:bg-secondary-200 dark:bg-secondary-900/30 dark:group-hover:bg-secondary-900/50">
                  <GraduationCap className="h-12 w-12 text-secondary-500" />
                </div>
                
                <h2 className="mb-2 text-2xl font-bold">Career Explorer</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  Practice with tailored interview questions based on your resume and target job positions
                </p>
                
                <div className="rounded-full bg-secondary-100 px-4 py-2 text-sm font-medium text-secondary-700 transition-colors group-hover:bg-secondary-200 dark:bg-secondary-900/30 dark:text-secondary-300 dark:group-hover:bg-secondary-900/50">
                  Select as explorer
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserSelection;