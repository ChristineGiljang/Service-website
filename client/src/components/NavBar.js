import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import MobileFooter from "./MobileFooter";
import ServiceProviderButton from "./ServiceProviderButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("home");
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.username) {
        setUser(parsedUser);
      } else {
        localStorage.removeItem("user"); // Remove invalid user data
        setUser(null);
      }
    }
  }, [loginOpen, signUpOpen]);

  const switchToSignUp = () => {
    setLoginOpen(false);
    setSignUpOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full border-b bg-gray-800 z-50">
      <nav className="flex items-center justify-between py-4 px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-white font-bold text-2xl">| Service Finder</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-4 text-lg">
            <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Find Services</a>
            <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Contact Us</a>
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
              <ServiceProviderButton onClick={() => setSignUpOpen(true)}/>
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
        <SignUpModal isOpen={signUpOpen} onClose={() => setSignUpOpen(false)} />
      </nav>
      
      {/* Mobile Menu Button */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-gray-800 text-white px-6 py-4 space-y-2">
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded-md">Find Services</a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded-md">Offer Services</a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded-md">Contact Us</a>
          <hr className="border-gray-600" />

          {user ? (
            <button onClick={handleLogout} className="w-full text-left px-3 py-2 hover:bg-gray-700">Logout</button>
          ) : (
            <>
              {/* ✅ Add Login & Sign Up buttons for mobile */}
              <button 
                onClick={() => setLoginOpen(true)} 
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-700"
              >
                Login
              </button>
              <button 
                onClick={() => setSignUpOpen(true)} 
                className="w-full text-left px-3 py-2 rounded-md bg-[#008080] hover:bg-[#006666]"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
       <MobileFooter setActiveComponent={setActiveComponent} />
    </div>
  );
};

export default Navbar;
