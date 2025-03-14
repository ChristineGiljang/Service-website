import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/profilecard.css"; // Import separate CSS file

const ProfileCard = ({ userId }) => {

    const localUserId = userId || localStorage.getItem("userId");
  
  console.log("Using userId:", localUserId); // Debugging check
  const [activeProfile, setActiveProfile] = useState("user");
  const [userProfile, setUserProfile] = useState({
    name: "",
    location: "",
    image: "",
  });
  console.log(localStorage.getItem("userId"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ name: "", location: "" });

  // Fetch user profile from MongoDB
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/userinfo/${localUserId}`);
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, [localUserId]);

  // Open/Close Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditedProfile({ name: userProfile.name, location: userProfile.location });
  };

  // Handle Input Change
  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  // Save Changes to MongoDB
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        {
          name: editedProfile.name,
          location: editedProfile.location,
        },
        { headers: { "Content-Type": "application/json" } } // ✅ Ensure JSON format
      );
      console.log("Received userId:", userId);
      setUserProfile(response.data); // ✅ Update UI
      toggleModal(); // ✅ Close modal
    } catch (error) {
      console.error("Error updating profile", error.response?.data || error.message);
    }
  };
  // Business data (initially empty)
  const [businessProfile, setBusinessProfile] = useState(null);

  // Function to add business details
  const handleAddBusiness = () => {
    setBusinessProfile({
      company: "XYZ Solutions",
      industry: "Software Development",
      founded: "2018",
    });
  };

  return (
    <div className="profilecard-container">
      {/* Profile Tabs */}
      <div className="profilecard-tabs">
        <button
          className={activeProfile === "user" ? "active" : ""}
          onClick={() => setActiveProfile("user")}
        >
          Personal Profile
        </button>
        <button
          className={activeProfile === "business" ? "active" : ""}
          onClick={() => setActiveProfile("business")}
        >
          Business Profile
        </button>
      </div>

      {/* Dynamic Profile Content */}
      {activeProfile === "user" ? (
        <UserProfile
          userProfile={userProfile}
          toggleModal={toggleModal}
          isModalOpen={isModalOpen}
          editedProfile={editedProfile}
          handleChange={handleChange}
          handleSave={handleSave}
        />
      ) : (
        <BusinessProfile businessProfile={businessProfile} onAddBusiness={handleAddBusiness} />
      )}
    </div>
  );
};

// ✅ User Profile Component
const UserProfile = ({ userProfile, toggleModal, isModalOpen, editedProfile, handleChange, handleSave }) => (
    <div className="profilecard-content">
      <h2>User Profile</h2>
  
      {/* Profile Header - Image & Details Side by Side */}
      <div className="profilecard-header">
        <div className="profile-image-container">
          <img 
            src={userProfile.image || "https://via.placeholder.com/100"} 
            alt="Profile" 
            className="profilecard-image"
          />
        </div>
  
        <div className="profilecard-details">
          <p><strong>Name:</strong> {userProfile.name}</p>
          <p><strong>Location:</strong> {userProfile.location}</p>
        </div>
      </div>
  
      <button onClick={toggleModal}>Edit Profile</button> {/* ✅ This now works */}
  
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Profile</h3>
  
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={handleChange}
            />
  
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={editedProfile.location}
              onChange={handleChange}
            />
  
            <div className="modal-buttons">
              <button onClick={handleSave}>Save</button>
              <button className="cancel" onClick={toggleModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  

// ✅ Business Profile Component
const BusinessProfile = ({ businessProfile, onAddBusiness }) => (
  <div className="profilecard-content">
    <h2>Business Profile</h2>
    {businessProfile ? (
      <>
        <p><strong>Company:</strong> {businessProfile.company}</p>
        <p><strong>Industry:</strong> {businessProfile.industry}</p>
        <p><strong>Founded:</strong> {businessProfile.founded}</p>
        <button>Edit Business Profile</button>
      </>
    ) : (
      <button className="add-business-btn" onClick={onAddBusiness}>
        + Add Business Profile
      </button>
    )}
  </div>
);

export default ProfileCard;
