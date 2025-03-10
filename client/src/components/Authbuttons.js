import React, { useState } from "react";
import "../css/authbuttons.css";
import Modal from "./Modal";

const AuthButtons = ({setIsLoggedIn, setUsername}) => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  // Handles input field changes
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            alert("Login successful!");
            setOpenLogin(false);

            if (setUsername) {  // ✅ Prevents "setUsername is not a function" error
              setUsername(data.username); 
            }
            
            setUsername(data.username); // ✅ Update username in state
            setIsLoggedIn(true); // ✅ Mark as logged in
        } else {
            alert("Login failed: " + data.message);
        }
        } catch (error) {
        console.error("Login error:", error);
        }
    };

    // Handle Signup
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch("http://localhost:5000/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Signup successful! Please log in.");
            setOpenSignUp(false);
        } else {
            alert("Signup failed.");
        }
        } catch (error) {
        console.error("Signup error:", error);
        }
    };

    return (
    <div className="auth-buttons">
      <button className="login-btn" onClick={() => setOpenLogin(true)}>Login</button>
      <button className="signup-btn" onClick={() => setOpenSignUp(true)}>Sign Up</button>

      {/* Login Modal */}
      <Modal isOpen={openLogin} onClose={() => setOpenLogin(false)}>
        <h2 className="modal-title">Login</h2>
        <form className="modal-form" onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="modal-btn">Sign In</button>
        </form>
      </Modal>

      {/* Sign Up Modal */}
      <Modal isOpen={openSignUp} onClose={() => setOpenSignUp(false)}>
        <h2 className="modal-title">Sign Up</h2>
        <form className="modal-form" onSubmit={handleSignUp}>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="modal-btn">Register</button>
        </form>
      </Modal>
    </div>
  );
};

export default AuthButtons;
