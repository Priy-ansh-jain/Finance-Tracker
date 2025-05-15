import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Mail } from "lucide-react";

const LoginPage = () => {
  // Original functional code
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);

  // Original authentication function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // Navigation to registration page
  const handleSignUpClick = () => {
    navigate("/register");
  };

  // Continue button handler
  const handleContinue = () => {
    if (email && email.includes("@")) {
      setShowPassword(true);
    } else {
      setError("Please enter a valid email address");
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left panel */}
      <div className="w-2/5 bg-white p-12 flex flex-col">


        <div className="flex-grow">
          <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
          <p className="text-gray-500 text-sm mb-6">Welcome Back. Please enter Your details</p>

          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

          <div className="flex border-b mb-6">
            <button
              className={`pb-2 px-4 text-sm font-medium ${activeTab === "signin" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                }`}
              onClick={() => setActiveTab("signin")}
            >
              Sign In
            </button>
            <button
              className={`pb-2 px-4 text-sm font-medium ${activeTab === "signup" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                }`}
              onClick={handleSignUpClick}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
                {email && email.includes("@") && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CheckCircle size={18} className="text-green-500" />
                  </div>
                )}
              </div>
            </div>

            {showPassword && (
              <>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-end mb-4">
                  <button type="button" className="text-sm text-blue-600 hover:underline">
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Sign In
                </button>
              </>
            )}

            {!showPassword && (
              <button
                type="button"
                onClick={handleContinue}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-4"
              >
                Continue
              </button>
            )}
          </form>

          <div className="mt-6 text-center relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative">
              <span className="bg-white px-4 text-sm text-gray-500">Or Continue With</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-50">
              <svg viewBox="0 0 24 24" className="h-5 w-5">
                <path
                  fill="#EA4335"
                  d="M12 5c1.617 0 3.071.664 4.123 1.745l3.249-3.172A11.016 11.016 0 0012 0C7.392 0 3.397 2.6 1.386 6.41l3.901 3.02C6.149 6.523 8.878 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.896 12.266c0-.812-.083-1.595-.228-2.348H12v4.448h6.669c-.288 1.475-1.152 2.726-2.455 3.562v2.998h3.988c2.343-2.15 3.694-5.323 3.694-8.66z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.287 14.341c-.253-.734-.396-1.518-.396-2.341 0-.823.143-1.607.396-2.341L1.386 6.41C.547 8.142 0 10.052 0 12c0 1.948.547 3.858 1.386 5.59l3.901-3.249z"
                />
                <path
                  fill="#34A853"
                  d="M12 19c3.3 0 6.07-1.07 8.202-2.913l-3.988-2.998c-1.122.752-2.563 1.191-4.214 1.191-3.122 0-5.851-1.523-7.713-4.341l-3.901 3.02C2.637 17.267 7.001 19 12 19z"
                />
                <path fill="none" d="M0 0h24v24H0z" />
              </svg>
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-50">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-black">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.68 1.32-1.53 2.6-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.66 4.22-3.74 4.25z" />
              </svg>
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-50">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current text-blue-600">
                <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Join the millions of smart investors who trust us to manage their finances. Log in to access your personalized dashboard, track your portfolio performance, and make informed investment decisions.</p>
        </div>
      </div>

      {/* Right panel - Blue safe image */}
      <div className="w-3/5 bg-blue-50 flex items-center justify-center">
        <div className="relative w-64 h-64">
          {/* Blue Safe SVG */}
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <rect x="25" y="25" width="150" height="150" rx="10" fill="#4299e1" />
            <rect x="35" y="35" width="130" height="130" rx="5" fill="#63b3ed" />
            <circle cx="100" cy="100" r="40" fill="#4299e1" stroke="#90cdf4" strokeWidth="3" />
            <circle cx="100" cy="100" r="35" fill="#63b3ed" />
            <circle cx="100" cy="100" r="5" fill="#2b6cb0" />
            <rect x="95" y="65" width="10" height="35" rx="2" fill="#2b6cb0" transform="rotate(45, 100, 100)" />
            <circle cx="70" cy="70" r="8" fill="#90cdf4" />
            <circle cx="130" cy="70" r="8" fill="#90cdf4" />
            <circle cx="70" cy="130" r="8" fill="#90cdf4" />
            <circle cx="130" cy="130" r="8" fill="#90cdf4" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;