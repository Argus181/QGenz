import React from 'react';
import Header from '../components/layout/Header';

const Pricing = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow items-center justify-center pt-24">
        <div className="container mx-auto mb-8 px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h1 className="mb-3">Our Pricing Plans</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Choose a plan that fits your needs. Each plan comes with a variety of features.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="card glassmorphism p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Basic Plan</h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                  Perfect for individuals or small teams.
                </p>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">$19/month</span>
                </div>
                <ul className="mb-6 space-y-3">
                  <li>5 GB of storage</li>
                  <li>Basic support</li>
                  <li>Access to essential features</li>
                </ul>
                <button className="btn-primary w-full py-2">Choose Plan</button>
              </div>

              <div className="card glassmorphism p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Standard Plan</h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                  Best for small businesses or growing teams.
                </p>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">$49/month</span>
                </div>
                <ul className="mb-6 space-y-3">
                  <li>50 GB of storage</li>
                  <li>Priority support</li>
                  <li>Advanced analytics</li>
                  <li>Collaborative features</li>
                </ul>
                <button className="btn-primary w-full py-2">Choose Plan</button>
              </div>

              <div className="card glassmorphism p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Premium Plan</h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                  Ideal for large enterprises or heavy usage.
                </p>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">$99/month</span>
                </div>
                <ul className="mb-6 space-y-3">
                  <li>Unlimited storage</li>
                  <li>24/7 VIP support</li>
                  <li>Customizable features</li>
                  <li>Dedicated account manager</li>
                </ul>
                <button className="btn-primary w-full py-2">Choose Plan</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
