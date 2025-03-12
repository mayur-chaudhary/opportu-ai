import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-primary-600">
              OpportuAI
            </Link>
            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Dashboard
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Find AI Talent</h1>
          <p className="mt-2 text-sm text-gray-600">
            Search for AI professionals with the skills and experience you need for your team.
          </p>
        </div>

        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex w-full">
            <div className="relative flex-grow">
              <input
                type="text"
                className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                placeholder="Find a React developer with 3+ years of experience..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center rounded-r-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Search
            </button>
          </form>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Search Results
            </h3>
          </div>
          <div className="p-6">
            <p className="text-gray-600">
              This is a placeholder for search results. In a real application, this would display a list of AI professionals matching your search criteria.
            </p>
            <div className="mt-6 space-y-6">
              {[1, 2, 3].map((index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                      {String.fromCharCode(64 + index)}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">AI Professional {index}</h4>
                      <p className="text-sm text-gray-600">Machine Learning Engineer</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700">
                          Python
                        </span>
                        <span className="inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700">
                          TensorFlow
                        </span>
                        <span className="inline-flex items-center rounded-md bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700">
                          Machine Learning
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 