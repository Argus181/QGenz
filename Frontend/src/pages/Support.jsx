import React, { useState } from 'react';
import { HelpCircle, Mail, FileText, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';
import Header from '../components/layout/Header';
import supportService from '../services/supportService';
import { sendSupportConfirmation } from '../utils/emailService';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitted(false);
    setIsLoading(true);

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill out all fields.');
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      // Send message using supportService
      const response = await supportService.sendMessage({
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'unresolved'
      });

      if (response.success) {
        // Send confirmation email
        await sendSupportConfirmation(formData.email, formData.name);
        
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow items-center justify-center pt-24">
        <div className="container mx-auto mb-8 px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h1 className="mb-3 flex items-center justify-center gap-2 text-3xl font-bold">
                <HelpCircle className="h-8 w-8 text-primary-500" />
                Support
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Need help with Qgenz? We're here to assist you with generating interview questions, troubleshooting issues, or any other inquiries.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-secondary-500" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-sm">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent-500" />
                    Why am I getting an error when uploading my resume?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Ensure your resume is in PDF or DOCX format and is under 5MB. If the issue persists, try a different file or contact support at support@qgenz.com.
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-sm">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    What should I do if no questions are generated?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    This might happen if your resume lacks detectable skills or if there was a server issue. Ensure your resume includes technical skills, or try using the "Specify Skills" option. If the problem continues, reach out to our support team.
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-sm">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary-500" />
                    Can I generate questions without uploading a resume?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Yes! Use the "Specify Skills" option on the Career Explorer page to input your skills manually (e.g., "Python, JavaScript, SQL") and generate tailored questions.
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-sm">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-secondary-500" />
                    How can I contact support for further assistance?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    You can email us at support@qgenz.com, or use the contact form below to send us a message directly.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary-500" />
                Contact Support
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                If your question isn't answered in the FAQs, or you need further assistance, feel free to reach out to our support team.
              </p>
              <form className="mt-6" onSubmit={handleSubmit}>
                {isSubmitted && (
                  <div className="mb-4 flex items-center justify-center gap-2 text-green-500">
                    <CheckCircle className="h-5 w-5" />
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {error && (
                  <div className="mb-4 flex items-center justify-center gap-2 text-red-500">
                    <AlertCircle className="h-5 w-5" />
                    {error}
                  </div>
                )}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input w-full p-2 border rounded focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your name"
                      aria-required="true"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input w-full p-2 border rounded focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter your email"
                      aria-required="true"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="input w-full p-2 border rounded focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your message"
                    aria-required="true"
                    disabled={isLoading}
                  ></textarea>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="btn-primary px-8 py-3 flex items-center gap-2 hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </section>

            <section className="mb-12 text-center">
              <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                <BookOpen className="h-6 w-6 text-accent-500" />
                Other Resources
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Check out our guides and resources to get the most out of Qgenz.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <a
                  href="/guides/preparing-for-interviews"
                  className="btn-outline flex items-center gap-2 px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  Preparing for Interviews
                </a>
                <a
                  href="/guides/troubleshooting"
                  className="btn-outline flex items-center gap-2 px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <AlertCircle className="h-5 w-5" />
                  Troubleshooting Guide
                </a>
                <a
                  href="/Help"
                  className="btn-outline flex items-center gap-2 px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <HelpCircle className="h-5 w-5" />
                  How to Use Qgenz
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;