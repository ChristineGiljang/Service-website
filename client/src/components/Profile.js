import React, { useState } from "react";
import "../css/profile.css";
import { useNavigate } from "react-router-dom";

const Profile = ({ displayName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Remove token
    localStorage.removeItem("username"); // ✅ Remove username
    localStorage.removeItem("isLoggedIn"); // ✅ Remove login status
    window.location.reload(); // ✅ Refresh to apply changes
  };

  return (
    <div className="profile-container">
      <div className="profile" onClick={() => setIsOpen(!isOpen)}>
        <img 
          src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with real profile image URL
          alt="Profile" 
          className="profile-image" 
        />
        <span className="profile-username">{displayName}</span>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <button>Edit profile</button>
          <button onClick={() => navigate("/profile")}>My Services</button>
          <button onClick={() => navigate("/profile")}>Saved Services</button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
