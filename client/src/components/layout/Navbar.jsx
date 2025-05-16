
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark/light theme
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      {/* Vertical sidebar - Icons only when collapsed, full sidebar when expanded/hovered */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out 
        ${sidebarExpanded ? 'w-42' : 'w-16'} 
        ligth:bg-[#f2eae2] bg-white dark:bg-gray-800 shadow-lg hover:w-42 group`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className={`text-xl font-bold text-purple-700 dark:text-purple-400 transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
            FinanceTracker
          </Link>
          <div className={`text-2xl font-bold text-purple-700 dark:text-purple-400 absolute left-0 mx-auto w-16 text-center ${sidebarExpanded ? 'opacity-0' : 'opacity-100'}`}>
            F
          </div>
        </div>

        {/* User info if authenticated */}
        {isAuthenticated && user && (
          <div className={`px-4 py-4 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden ${sidebarExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
            <div className="flex items-center">
              <div className="h-9 w-9 rounded-full bg-purple-200 dark:bg-purple-700 flex items-center justify-center flex-shrink-0 dark:text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Welcome,</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[140px] ">{user.name}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation links */}
        <nav className="mt-5 px-2 space-y-1">
          {/* Home - shown to everyone */}
          <Link
            to="/"
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md 
              ${isActive('/')
                ? 'bg-purple-100 text-purple-900 dark:bg-purple-800 dark:text-white'
                : 'text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-gray-700'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 h-6 w-6 ${isActive('/') ? 'text-purple-500 dark:text-purple-300' : 'text-gray-500 dark:text-gray-400'}`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>Home</span>
          </Link>

          {isAuthenticated ? (
            <>
              {/* Dashboard */}
              <Link
                to="/dashboard"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md 
                  ${isActive('/dashboard')
                    ? 'bg-purple-100 text-purple-900 dark:bg-purple-800 dark:text-white'
                    : 'text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 h-6 w-6 ${isActive('/dashboard') ? 'text-purple-500 dark:text-purple-300' : 'text-gray-500 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>

                <span className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>Dashboard</span>
              </Link>

              {/* Transactions */}
              <Link
                to="/transactions"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md 
                  ${isActive('/transactions')
                    ? 'bg-purple-100 text-purple-900 dark:bg-purple-800 dark:text-white'
                    : 'text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 h-6 w-6 ${isActive('/transactions') ? 'text-purple-500 dark:text-purple-300' : 'text-gray-500 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>Transactions</span>
              </Link>

              {/* Profile */}
              <Link
                to="/profile"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md 
                  ${isActive('/profile')
                    ? 'bg-purple-100 text-purple-900 dark:bg-purple-800 dark:text-white'
                    : 'text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 h-6 w-6 ${isActive('/profile') ? 'text-purple-500 dark:text-purple-300' : 'text-gray-500 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>Profile</span>
              </Link>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-6 w-6 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md 
                  ${isActive('/login')
                    ? 'bg-purple-100 text-purple-900 dark:bg-purple-800 dark:text-white'
                    : 'text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 h-6 w-6 ${isActive('/login') ? 'text-purple-500 dark:text-purple-300' : 'text-gray-500 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>Login</span>
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md 
                  ${isActive('/register')
                    ? 'bg-purple-100 text-purple-900 dark:bg-purple-800 dark:text-white'
                    : 'text-gray-700 hover:bg-purple-50 dark:text-gray-300 dark:hover:bg-gray-700'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 h-6 w-6 ${isActive('/register') ? 'text-purple-500 dark:text-purple-300' : 'text-gray-500 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>Register</span>
              </Link>
            </>
          )}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
            <span className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${sidebarExpanded ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
              {darkMode ? 'Light' : 'Dark'}
            </span>
          </button>
        </nav>
      </aside>

      {/* Content area padding adjustment for sidebar */}
      <div className="pl-16 transition-all duration-300 ease-in-out">
        {/* Your main content goes here */}
      </div>
    </div>
  );
};

export default Navbar;