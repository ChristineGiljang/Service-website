import React from "react";
import { useState } from "react";

const LoginModal = ({ isOpen, onClose, switchToSignUp}) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
  
      const data = await response.json();
      console.log("Server Response:", data);
  
      if (response.ok) {
        // ✅ Store user data correctly
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username); 
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("isLoggedIn", "true");
  
        // ✅ Trigger navbar update
        window.dispatchEvent(new Event("userLoggedIn"));
  
        // ✅ Close modal
        onClose();
  
        console.log("Login successful!");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Login</h2>

        {/* Username Field */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {/* Password Field */}
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <a href="#" className="text-sm text-teal-500 hover:underline mb-1">
            Forgot?
          </a>
        </div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {/* Sign In Button */}
        <button 
          onClick={handleLogin} 
          className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600"
        >
          Sign In
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-3">
          Don't have an account?{" "}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault(); // Prevent page reload
              onClose(); // Close login modal
              if (typeof switchToSignUp === "function") {
                switchToSignUp(); // ✅ Only call if it's a function
              } else {
                console.error("switchToSignUp is not a function:", switchToSignUp);
              } // Open sign-up modal
            }} 
            className="text-teal-500 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
