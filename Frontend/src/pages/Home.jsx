import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Adjust path if needed
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  Brain,
  Zap,
  Shield,
  Users,
  FileText,
  MessageSquare
} from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ParticleBackground from '../components/ui/ParticleBackground';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Getting user information from context
  const [openFaq, setOpenFaq] = useState(null); // For toggling FAQs

  // Handle the 'Get Started' button
  const handleGetStarted = () => {
    if (user) {
      navigate('/user-selection'); // ✅ redirect if logged in
    } else {
      navigate('/login'); // ❌ not logged in? take them to login
    }
  };

  // FAQ Toggle
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // FAQ Data
  const faqs = [
    {
      question: "How does Qgenz generate interview questions?",
      answer: "Qgenz uses advanced AI algorithms to analyze resumes and job descriptions, generating relevant interview questions tailored to the specific role. Our system continuously learns from feedback to improve question quality and relevance."
    },
    {
      question: "Can I customize the types of questions generated?",
      answer: "Yes! Qgenz allows you to filter questions by type (behavioral or technical) and you can save your favorite questions for future use. We're also working on adding more customization options in upcoming releases."
    },
    {
      question: "Is my resume data secure?",
      answer: "Absolutely. We take data privacy seriously. Your resume data is encrypted and only used to generate questions. We never share your information with third parties, and you can request deletion of your data at any time."
    },
    {
      question: "How much does Qgenz cost?",
      answer: "Qgenz offers a free tier that includes basic question generation. Premium plans start at $9.99/month for HR professionals and $4.99/month for job seekers, with additional features like unlimited generations and advanced analytics."
    }
  ];

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-indigo-500" />,
      title: "AI-Powered Questions",
      description: "Generate tailored interview questions using advanced AI technology that understands context and requirements."
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      title: "Resume Analysis",
      description: "Upload resumes and get questions specifically designed based on the candidate's experience and skills."
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Instant Generation",
      description: "Get your questions in seconds, saving hours of preparation time while maintaining quality."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security measures and encryption."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "User Management",
      description: "Efficient user management system with role-based access control for administrators and users."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-pink-500" />,
      title: "Support System",
      description: "Get help whenever you need it with our dedicated support system and documentation."
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
    <div className="flex min-h-screen flex-col">
      <Header />
      <ParticleBackground variant="home" />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex min-h-screen items-center justify-center pt-20"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-5xl md:text-6xl font-bold text-transparent">
              Next-Gen Interview Questions Powered by AI
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">
              Generate tailored interview questions instantly. For Hiring Partners and Career Explorers.
            </p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="btn-primary"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#features"
                className="btn-outline"
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Qgenz</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Our AI-powered platform helps both Hiring Partners and Career Explorers prepare for interviews more effectively.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Who Can Use AI Questions & Answers Generator Section */}
      <section className="py-20 bg-blue-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-2">Who Can Use AI Questions ?</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400 mb-10">
              Qgenz is designed to be user-friendly and accessible to a wide range of users who want to excel in interviews or hiring.
            </p>
          </motion.div>
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Professionals */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300"
            >
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Professional" className="w-16 h-16 rounded-full mb-4 shadow-md object-cover" />
              <h3 className="text-xl font-bold mb-2">Professionals</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Unlock personalized interview questions to help you prepare for career growth, leadership roles, or internal promotions. Qgenz ensures you're ready for any professional challenge.
              </p>
            </motion.div>
            {/* Job Seekers */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300"
            >
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Job Seeker" className="w-16 h-16 rounded-full mb-4 shadow-md object-cover" />
              <h3 className="text-xl font-bold mb-2">Career Explorers</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ace your next interview with AI-generated questions tailored to your target job and resume. Practice confidently and get insights to stand out from other candidates.
              </p>
            </motion.div>
            {/* Students */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300"
            >
              <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Student" className="w-16 h-16 rounded-full mb-4 shadow-md object-cover" />
              <h3 className="text-xl font-bold mb-2">Students</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Prepare for internships, campus placements, and academic interviews with questions designed for your field of study. Qgenz helps you build confidence and improve your interview skills.
              </p>
            </motion.div>
            {/* Business Owners */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300"
            >
              <img src="https://randomuser.me/api/portraits/men/36.jpg" alt="Business Owner" className="w-16 h-16 rounded-full mb-4 shadow-md object-cover" />
              <h3 className="text-xl font-bold mb-2">Business Owners</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Streamline your hiring process with smart, role-specific interview questions. Find the right talent faster and make better hiring decisions with Qgenz's AI-driven tools.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Everything you need to know about Qgenz
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto mt-12 max-w-3xl"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border-b border-gray-200 py-5 dark:border-gray-700"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={openFaq === index ? 'up' : 'down'}
                      initial={{ rotate: 0 }}
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  </AnimatePresence>
                </button>
                
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-gray-600 dark:text-gray-400">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 py-20 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Interview Process?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Join thousands of professionals who are already using Qgenz to improve their interview experience.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/login" className="btn bg-white px-8 py-3 font-medium text-primary-600 hover:bg-gray-100">
              Get Started for Free
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      <Footer />
    </div>
  );
};

export default Home;
