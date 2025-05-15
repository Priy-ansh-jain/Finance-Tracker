import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaYoutube, FaTiktok } from "react-icons/fa";
import axios from "axios";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const updateProfileAPI = async (data) => {
    const response = await axios.put(
      "http://localhost:5000/api/auth/profile",
      data,
      { withCredentials: true }
    );
    return response.data;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const updatedUser = await updateProfileAPI(formData);
      setUser(updatedUser);
      setSuccessMsg("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-center mt-10 text-white">You must be logged in to view this page.</p>;
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-[#1E1E1E] rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Left Section - Avatar & Info */}
        <div className="col-span-1 flex flex-col items-center text-center ">
          <img
            src={`https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${formData.name || "User"}`}
            alt="profile"
            className="w-40 h-40 rounded-full mb-4 border-4 border-green-500"
          />
          <h2 className="text-2xl font-semibold">{formData.name}</h2>
          <span className="text-green-400 mt-1">Premium User</span>
        </div>

        {/* Right Section - Profile Form */}
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {successMsg && <p className="text-green-400 text-sm mb-4">{successMsg}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                className="w-full mt-1 p-2 rounded bg-[#2a2a2a] text-gray-400 border border-gray-600 cursor-not-allowed"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 transition py-2 rounded text-white font-semibold"
            >
              Update Profile
            </button>
          </form>
        </div>
      </motion.div>

      {/* Social Media */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400 mb-2">Social Media</p>
        <div className="flex justify-center gap-6 text-2xl">
          <FaYoutube className="hover:text-red-600 cursor-pointer" />
          <FaTiktok className="hover:text-pink-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
