import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function About() {
  return (
    <div className="bg-white">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-primary-600">
              OpportuAI
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>

      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About OpportuAI</h1>
            <p className="text-xl text-gray-800">
              Connecting the brightest AI minds with innovative companies
            </p>
          </div>

          <div className="prose prose-lg mx-auto text-black">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-900 leading-relaxed mb-6">
              At OpportuAI, we're on a mission to bridge the gap between talented AI professionals and companies seeking specialized expertise. We believe that the right match between talent and opportunity can spark innovation and drive the future of AI technology.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-lg text-gray-900 leading-relaxed mb-4">
              OpportuAI is a specialized platform designed exclusively for the AI industry. We provide a space where:
            </p>
            <ul className="text-lg text-gray-900 mb-6 list-disc pl-6">
              <li className="mb-2">AI professionals can showcase their unique skills and experience</li>
              <li className="mb-2">Companies can find specialized talent for their AI initiatives</li>
              <li className="mb-2">Both sides can connect through a streamlined, efficient process</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-primary-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-primary-700 font-bold mb-2 text-xl">Innovation</h3>
                <p className="text-gray-900">We embrace cutting-edge technology and creative solutions to complex problems.</p>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-primary-700 font-bold mb-2 text-xl">Quality</h3>
                <p className="text-gray-900">We prioritize connecting companies with the highest caliber of AI talent.</p>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-primary-700 font-bold mb-2 text-xl">Diversity</h3>
                <p className="text-gray-900">We believe diverse perspectives drive innovation and better outcomes.</p>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-primary-700 font-bold mb-2 text-xl">Community</h3>
                <p className="text-gray-900">We foster a supportive environment for AI professionals to grow and connect.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-900 leading-relaxed mb-6">
              Whether you're an AI professional looking for your next opportunity or a company seeking specialized talent, OpportuAI is here to help you succeed in the rapidly evolving world of artificial intelligence.
            </p>
            
            <div className="mt-8 flex justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                Join OpportuAI Today
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 