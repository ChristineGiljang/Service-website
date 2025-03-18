import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../auth/LoginModal";
import SignUpModal from "../auth/SignUpModal";
import Button from "../ui/Button"


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("home");
  const navigate = useNavigate(); 

  const switchToSignUp = () => {
    setLoginOpen(false);
    setSignUpOpen(true);
  };

  const handleLogout = () => {
    logout(); // ✅ Call the centralized logout function
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full border-b bg-gray-800 z-50 bg-primary text-text border-b border-border shadow-md">
      <nav className="flex items-center justify-between py-4 px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-white font-bold text-2xl">| Service Finder</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="flex text-lg">
            <Button label="Find Services" variant="secondary" className="px-2 py-1" />
            <Button label="How It Works" variant="secondary" className="px-2 py-1"/>
            <Button label="Contact Us" variant="secondary" className="px-2 py-1"/>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-6">
            <span className="text-gray-400">|</span>

            {user ? (
              // ✅ If user is logged in, show Username & Dropdown
              <div className="relative flex items-center space-x-4 cursor-pointer">
                <div 
                  className="flex items-center space-x-2" 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="text-white">{user?.username || "User"}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-white transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} 
                  />
                </div>

                {/* Dropdown (Toggles on Click) */}
                {dropdownOpen && (
                  <div className="absolute top-12 right-0 bg-gray-700 text-white rounded-md shadow-lg w-40">
                    <a href="/profile" className="block w-full text-left px-4 py-2 hover:bg-gray-600">
                      Profile
                    </a>
                    <button 
                      onClick={handleLogout} 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // ✅ If user is NOT logged in, show Login & Sign Up
              <>
              <Button label="Sign up as a Service Provider" variant="primary" onClick={() => setSignUpOpen(true)}/>
                {/* <button onClick={() => setLoginOpen(true)} className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md">Login</button>
                <button onClick={() => setSignUpOpen(true)} className="text-white px-4 py-2 rounded-md bg-[#008080] hover:bg-[#006666]">Sign Up</button> */}
              </>
            )}
          </div>
        </div>
        <button className="block md:hidden text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <LoginModal 
          isOpen={loginOpen} 
          onClose={() => setLoginOpen(false)} 
          switchToSignUp={switchToSignUp}  // ✅ Ensure it's passed here too
        />
        <SignUpModal 
          isOpen={signUpOpen} 
          onClose={() => setSignUpOpen(false)}
          switchToLogin={() => { setSignUpOpen(false); setLoginOpen(true); }} />
      </nav>
      
      {/* Mobile Menu Button */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start bg-gray-800 text-white px-6 py-4 space-y-2">
            <Button label="Find Services" variant="secondary" />
            <Button label="How It Works" variant="secondary" />
            <Button label="Contact Us" variant="secondary" />
          <hr className="border-gray-600" />

          {user ? (
            <button onClick={handleLogout} className="w-full text-left px-3 py-2 hover:bg-gray-700">Logout</button>
          ) : (
            <>
              {/* ✅ Add Login & Sign Up buttons for mobile */}
              <Button label="Sign up as a Service Provider" variant="primary" onClick={() => setSignUpOpen(true)}/>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
