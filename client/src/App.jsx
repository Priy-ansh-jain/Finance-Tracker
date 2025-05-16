import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PrivateRoute from "./components/auth/PrivateRoute";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./components/auth/Login";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import ProfilePage from "./pages/ProfilePage";

// Styles
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <TransactionProvider>
        <Router>
          <div className="app-container flex flex-col min-h-screen">
            <Navbar />
            <div className="main-content flex-grow transition-all duration-300 ease-in-out" style={{ marginLeft: '64px' }}>
              <div className="content-wrapper p-4">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <DashboardPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/transactions"
                    element={
                      <PrivateRoute>
                        <TransactionsPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <ProfilePage />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </div>
              <Footer className="mt-auto" />
            </div>

          </div>
        </Router>
      </TransactionProvider>
    </AuthProvider>
  );
};

export default App;