import React, { useState } from "react";
import "../css/profile.css";

const Profile = ({ displayName }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <button className="logout-button" onClick={() => console.log("Logging out...")}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
