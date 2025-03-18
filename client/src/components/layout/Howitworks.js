import React from "react";
import { FaClipboardList, FaUsers, FaTools, FaDollarSign } from "react-icons/fa";

const HowItWorksHero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center text-white bg-gradient-to-r from-teal-600 to-blue-600">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h1>
        <p className="text-lg md:text-xl mb-8">
          Finding and offering handy services has never been easier. Follow these simple steps to get started!
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="flex items-center gap-4">
            <FaClipboardList className="text-4xl text-yellow-400" />
            <p className="text-lg">Post a job or offer your services.</p>
          </div>
          <div className="flex items-center gap-4">
            <FaUsers className="text-4xl text-green-400" />
            <p className="text-lg">Connect with skilled professionals.</p>
          </div>
          <div className="flex items-center gap-4">
            <FaTools className="text-4xl text-blue-400" />
            <p className="text-lg">Get the job done hassle-free.</p>
          </div>
          <div className="flex items-center gap-4">
            <FaDollarSign className="text-4xl text-red-400" />
            <p className="text-lg">Pay securely and get paid fast.</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8">
          <a
            href="/signup"
            className="inline-block px-8 py-3 bg-white text-teal-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksHero;
