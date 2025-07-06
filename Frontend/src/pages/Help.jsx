import React from 'react';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Users, 
  FileText, 
  MessageSquare, 
  Zap, 
  Shield,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Help = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const features = [
    {
      icon: <BrainCircuit className="h-6 w-6" />,
      title: "AI-Powered Questions",
      description: "Our advanced AI generates relevant interview questions based on job descriptions and resumes."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Role-Based Experience",
      description: "Tailored experience for both Hiring partners and Career Explorers."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Resume Analysis",
      description: "Upload resumes to get personalized interview questions."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Practice Mode",
      description: "Practice answering questions with our interactive interface."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Quick Generation",
      description: "Get interview questions instantly with our fast processing system."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security."
    }
  ];

  const howToUse = [
    {
      title: "For iring partners",
      steps: [
        "Sign up or log in to your account",
        "Select the Hiring partner role",
        "Upload job descriptions or candidate resumes",
        "Generate interview questions",
        "Review and customize questions as needed"
      ]
    },
    {
      title: "For Career Explorers",
      steps: [
        "Sign up or log in to your account",
        "Select the Career Explorer role",
        "Upload your resume",
        "Get personalized practice questions",
        "Practice answering questions in our interactive interface"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            Welcome to Qgenz Help Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about using Qgenz effectively
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-primary-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How to Use Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {howToUse.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-6 text-primary-500">{section.title}</h3>
              <ul className="space-y-4">
                {section.steps.map((step, stepIndex) => (
                  <motion.li
                    key={stepIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: stepIndex * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <ChevronRight className="h-5 w-5 text-primary-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Quick Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.a
              href="/features"
              variants={itemVariants}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span>Features</span>
              <ArrowRight className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="/Support"
              variants={itemVariants}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span>Contact Support</span>
              <ArrowRight className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="/About"
              variants={itemVariants}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span>About</span>
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Help; 