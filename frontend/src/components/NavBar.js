import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-600 font-semibold' : 'text-gray-600 hover:text-primary-500';
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center justify-center w-full">
            <div className="hidden sm:flex sm:space-x-8 justify-center">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/' ? 'border-primary-500' : 'border-transparent'
                } ${isActive('/')}`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/about' ? 'border-primary-500' : 'border-transparent'
                } ${isActive('/about')}`}
              >
                About
              </Link>
              <Link
                to="/features"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/features' ? 'border-primary-500' : 'border-transparent'
                } ${isActive('/features')}`}
              >
                Features
              </Link>
              <Link
                to="/contact"
                className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/contact' ? 'border-primary-500' : 'border-transparent'
                } ${isActive('/contact')}`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === '/' ? 'border-primary-500 bg-primary-50' : 'border-transparent'
            } text-base font-medium ${isActive('/')}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === '/about' ? 'border-primary-500 bg-primary-50' : 'border-transparent'
            } text-base font-medium ${isActive('/about')}`}
          >
            About
          </Link>
          <Link
            to="/features"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === '/features' ? 'border-primary-500 bg-primary-50' : 'border-transparent'
            } text-base font-medium ${isActive('/features')}`}
          >
            Features
          </Link>
          <Link
            to="/contact"
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              location.pathname === '/contact' ? 'border-primary-500 bg-primary-50' : 'border-transparent'
            } text-base font-medium ${isActive('/contact')}`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 