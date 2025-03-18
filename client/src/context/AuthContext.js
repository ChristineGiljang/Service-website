import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to log in user (example)
  const login = (userData) => {
    console.log("AuthContext login called with:", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Store in local storage
    localStorage.setItem("isLoggedIn", "true");
    
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

   // Simulating user login (Replace with actual authentication logic)
   useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Get user from local storage
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const authValue = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <AuthContext.Provider value={ authValue }>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Ensure `useAuth()` is correctly accessing the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("Error: useAuth() called outside of AuthProvider!");
  }
  return context;
};
