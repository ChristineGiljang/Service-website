import { useState, useEffect } from "react";
import { User, Image as ImageIcon, Trash } from "lucide-react";

const AccountPreferences = () => {
    const API_BASE_URL = "http://localhost:5000/api/user";
    const [userId, setUserId] = useState(null);
    const defaultProfileImage = "https://placehold.co/80x80";

    const [user, setUser] = useState({
        username: "",
        email: "",
        profileImage: defaultProfileImage, // Default placeholder
      });
    
      useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        console.log("Retrieved User ID:", storedUserId);
        if (storedUserId) setUserId(storedUserId);
    }, []);

    useEffect(() => {
        if (!userId) return; // Prevent API call with null userId
    
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/${userId}`);
                if (!response.ok) throw new Error("Failed to fetch user");
    
                const data = await response.json();
                setUser((prevUser) => ({
                    ...prevUser,
                    username: data.username || "",
                    email: data.email || "",
                    profileImage: data.profileImage || "https://via.placeholder.com/80"
                }));
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchUserData();
    }, [userId]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append("profileImage", file);
    
        try {
            const response = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData
            });
    
            const data = await response.json();
            if (response.ok) {
                setUser((prevUser) => ({
                    ...prevUser,
                    profileImage: `http://localhost:5000${data.imageUrl}` // Save uploaded image URL
                }));
            } else {
                alert("Image upload failed: " + data.message);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };
    const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    };


     // Handle update button click
    const handleUpdate = async () => {
        const updatedUser = {
            username: user.username, 
            profileImage: user.profileImage
        };

        try {
            const response = await fetch(`${API_BASE_URL}/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
    }
};


  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <User size={20} className="mr-2" /> Account preferences
      </h2>

      {/* Profile Picture */}
      <div className="flex items-center space-x-4">
        <img
          src={user.profileImage} // Replace with actual image URL
          alt="Profile"
          className="w-20 h-20 rounded-full"
        />
        <div className="space-y-2">
            <label className="flex items-center space-x-2 border px-4 py-1 rounded-md text-blue-600 border-blue-500 hover:bg-blue-100 cursor-pointer">
                <ImageIcon size={16} />
                <span>Change</span>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                />
            </label>
            <button 
                className="flex items-center space-x-2 border px-4 py-1 rounded-md text-red-600 border-red-500 hover:bg-red-100"
                onClick={() => setUser((prevUser) => ({ ...prevUser, profileImage: defaultProfileImage }))}
            >
            <Trash size={16} />
            <span>Remove</span>
          </button>
        </div>
      </div>

      {/* Form Inputs */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="text-gray-600 text-sm">Name</label>
          <input type="text" className="w-full border px-3 py-2 rounded-md" name="username" value={user.username} onChange={handleChange} />
        </div>
        <div>
          <label className="text-gray-600 text-sm">Email</label>
          <input type="text" className="w-full border px-3 py-2 rounded-md" name="email" value={user.email} onChange={handleChange} />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <button className="border px-4 py-2 rounded-md text-gray-600 border-gray-400 hover:bg-gray-100">
          Cancel
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default AccountPreferences;
