import axios from "axios";

// Login Function
const API_URL = "http://localhost:5000/auth/login";

export const handleLogin = async (email, password, login, navigate) => {
    try {
      console.log("🔄 Sending login request with:", email, password);
  
      const response = await axios.post(API_URL, { email, password });
  
      console.log("✅ Login response from server:", response.data);
  
      if (!response.data.user) {
        console.error("❌ Server did not return user data!");
        alert("Login failed. No user data received.");
        return;
      }
  
      console.log("🟢 Calling login() with:", response.data.user);
      login(response.data.user);
  
      console.log("🚀 Navigating to dashboard...");
      navigate("/dashboard");
  
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed!");
    }
  };
  

// Logout Function
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  window.dispatchEvent(new Event("userLoggedOut"));
};
