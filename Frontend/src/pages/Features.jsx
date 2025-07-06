import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import {
  Brain,
  FileText,
  Users,
  Smartphone,
  Shield,
  MessageSquare
} from 'lucide-react';

const Features = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-indigo-500" />,
      title: "AI-Powered Question Generation",
      description: "Our advanced AI analyzes resumes and job requirements to generate tailored interview questions that assess both technical skills and cultural fit.",
      benefits: ["Smart question selection", "Context-aware generation", "Role-specific questions"]
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      title: "Resume Upload & Parsing",
      description: "Upload a candidate's resume, and our system will analyze it to generate specific questions, ensuring relevance to the role and skillset.",
      benefits: ["Resume analysis", "Skill extraction", "Experience-based questions"]
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "User Management",
      description: "Efficient user management system with role-based access control for administrators and regular users.",
      benefits: ["User roles", "Access control", "Account management"]
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Secure Authentication",
      description: "Robust authentication system ensuring secure access to the platform with proper user verification.",
      benefits: ["Secure login", "Password protection", "Session management"]
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-pink-500" />,
      title: "Support System",
      description: "Dedicated support system for users to get help and assistance with platform-related queries.",
      benefits: ["User support", "Query management", "Response tracking"]
    },
    {
      icon: <Smartphone className="h-8 w-8 text-violet-500" />,
      title: "Responsive Design",
      description: "Fully responsive interface that works seamlessly across all devices, from desktop to mobile.",
      benefits: ["Mobile-friendly", "Cross-device compatibility", "Adaptive layout"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Features That Make Interview Preparation Easy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how our platform helps you prepare for interviews with AI-powered question generation and resume analysis.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Interview Preparation?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our platform today and experience the power of AI-driven interview preparation.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
