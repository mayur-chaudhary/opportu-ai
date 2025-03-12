import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import pages
import Home from './pages-js/Home';
import Login from './pages-js/Login';
import Signup from './pages-js/Signup';
import Dashboard from './pages-js/Dashboard';
import Search from './pages-js/Search';
import About from './pages-js/About';
import Features from './pages-js/Features';
import Contact from './pages-js/Contact';

function App() {
  return (
    <div className="font-sans">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App; 