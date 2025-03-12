import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Sign Out
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-600">
              Welcome to your dashboard! This is a placeholder page. In a real application, this would show your profile information, 
              notifications, messages, and other personalized content.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-primary-800">Profile Completion</h3>
                <p className="mt-2 text-sm text-primary-600">Complete your profile to increase visibility to recruiters.</p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full w-2/3"></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">65% complete</p>
                </div>
              </div>
              
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-primary-800">Profile Views</h3>
                <p className="mt-2 text-sm text-primary-600">Your profile has been viewed by recruiters.</p>
                <p className="mt-4 text-3xl font-bold text-primary-700">12</p>
                <p className="text-xs text-gray-500">in the last 30 days</p>
              </div>
              
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-primary-800">Messages</h3>
                <p className="mt-2 text-sm text-primary-600">You have unread messages from recruiters.</p>
                <p className="mt-4 text-3xl font-bold text-primary-700">3</p>
                <p className="text-xs text-gray-500">new messages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 