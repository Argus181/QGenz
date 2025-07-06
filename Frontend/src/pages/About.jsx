import React from 'react';
import Header from '../components/layout/Header';

const About= () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-grow items-center justify-center pt-24">
        <div className="container mx-auto mb-8 px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h1 className="mb-3">About Us</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Learn more about our company, mission, and the team behind our success.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We are committed to providing the best technology solutions to help businesses grow and thrive.
                Our mission is to innovate and create reliable, scalable solutions that can support businesses of all sizes.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">What We Do</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Our team specializes in AI-driven software development, offering a wide range of services
                from custom solutions to off-the-shelf products. We believe in a customer-centric approach, ensuring
                that every solution we build aligns with our clients' needs.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Our team consists of highly skilled professionals who are passionate about technology and innovation.
                From AI experts to developers and designers, we work collaboratively to deliver exceptional results.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-400">
                <li>Innovation: Constantly pushing boundaries to provide cutting-edge solutions.</li>
                <li>Integrity: Maintaining transparency, honesty, and ethical business practices.</li>
                <li>Customer Satisfaction: Delivering solutions that meet or exceed client expectations.</li>
                <li>Collaboration: Working together to achieve common goals and foster a supportive work environment.</li>
              </ul>
            </section>

            <section className="mb-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Have any questions or want to collaborate with us? Feel free to reach out, and we'd be happy to help!
              </p>
              <a href="/Support" className="btn-primary mt-4 inline-block">
                Contact Us
              </a>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
