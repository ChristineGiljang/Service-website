import React, { useState } from "react";

const SignUpModal = ({ isOpen, onClose }) => {
  const [openSignUp, setOpenSignUp] = useState(false);  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Sending data to backend:", formData);
    try {
    const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    const data = await response.json(); // ✅ Make sure to get response data
    console.log("Server response:", data);

    if (response.ok) {
        alert("Signup successful! Please log in.");
        onClose();
    } else {
        alert("Signup failed: " + data.message);
    }
    } catch (error) {
    console.error("Signup error:", error);
    }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
          Sign Up
        </h2>

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={handleSignUp}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
          <input
            type="text"
            name="username"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#008080] text-white py-2 rounded-md hover:bg-[#006666]"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
