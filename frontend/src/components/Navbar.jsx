import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiLogOut, FiLayout } from 'react-icons/fi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const linkVariants = {
    hover: { scale: 1.05 },
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: '100%', transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
      }`}
      style={{
        backgroundImage: isScrolled ? 'none' : 'url(https://via.placeholder.com/1920x100?text=PG+Building+Background)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-primary">MUJStays</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <motion.div
              className="relative"
              variants={linkVariants}
              whileHover="hover"
            >
              <Link to="/" className="text-text-dark hover:text-primary">
                Home
              </Link>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                variants={underlineVariants}
                initial="hidden"
                whileHover="visible"
              />
            </motion.div>
            <motion.div
              className="relative"
              variants={linkVariants}
              whileHover="hover"
            >
              <Link to="/morepgs" className="text-text-dark hover:text-primary">
                More PGs
              </Link>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                variants={underlineVariants}
                initial="hidden"
                whileHover="visible"
              />
            </motion.div>
            <motion.div
              className="relative"
              variants={linkVariants}
              whileHover="hover"
            >
              <Link to="/contact" className="text-text-dark hover:text-primary">
                Contact Us
              </Link>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                variants={underlineVariants}
                initial="hidden"
                whileHover="visible"
              />
            </motion.div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-4 items-center relative">
            {user ? (
              <>
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-blue-500 ring-2 ring-blue-400 hover:ring-4 hover:ring-blue-500 shadow-md hover:shadow-blue-400/50 transition duration-300"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                ) : (
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-10 h-10 rounded-full bg-white border-2 border-blue-500 ring-2 ring-blue-400 hover:ring-4 hover:ring-blue-500 shadow-md hover:shadow-blue-400/50 transition duration-300 cursor-pointer flex items-center justify-center"
                  >
                    <FiUser className="w-6 h-6 text-blue-500" />
                  </button>
                )}
                {dropdownOpen && (
  <div
    ref={dropdownRef}
    className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
  
                  >
                    <div
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                      onClick={() => { navigate('/dashboard'); setDropdownOpen(false); }}
                    >
                      <FiLayout className="mr-2" />
                      Dashboard
                    </div>
                    <div
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                      onClick={() => {
                        logout();
                        navigate('/');
                        setDropdownOpen(false);
                      }}
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link to="/signup" className="text-primary border border-primary px-4 py-2 rounded hover:bg-primary hover:text-white transition duration-300">
                Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-dark focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-text-dark hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/morepgs" className="block px-3 py-2 text-text-dark hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                More PGs
              </Link>
              <Link to="/contact" className="block px-3 py-2 text-text-dark hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="block px-3 py-2 text-text-dark hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    User Dashboard
                  </Link>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-3 py-2 bg-primary text-white rounded hover:bg-blue-700">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signup" className="block px-3 py-2 text-primary border border-primary rounded hover:bg-primary hover:text-white">Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
