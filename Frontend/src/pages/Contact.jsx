import React, { useState } from 'react';
import Header from '../components/layout/Header';

const Contact= () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    // Handle form submission logic here
    try {
      // Example: Sending data to an API or performing an action
      console.log({ name, email, message });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow items-center justify-center pt-24">
        <div className="container mx-auto mb-8 px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h1 className="mb-3">Contact Us</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We'd love to hear from you! Please fill out the form below to reach out.
              </p>
            </div>

            {error && (
              <div className="mb-4 text-red-500 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="card mb-8 glassmorphism">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input w-full p-2 border rounded"
                  placeholder="Your Name"
                />
              </div>

              <div className="card mb-8 glassmorphism">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full p-2 border rounded"
                  placeholder="Your Email"
                />
              </div>

              <div className="card mb-8 glassmorphism">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input w-full p-2 border rounded"
                  placeholder="Your Message"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn-primary relative overflow-hidden px-8 py-3 ${
                    loading ? 'cursor-not-allowed opacity-80' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="opacity-0">Sending...</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      </div>
                    </>
                  ) : (
                    'Send Message'
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

export default Contact;
