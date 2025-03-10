import { useEffect, useState } from "react";
import '../css/header.css';
import '../css/authbuttons.css';
import AuthButtons from './Authbuttons';
import Profile from './Profile'

function Header({ setActiveHero }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  
      useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        console.log("Retrieved username from localStorage:", storedUsername);
        if (storedUsername) {
          setUsername(storedUsername);
        } else {
          console.error("No username found in localStorage");
        }
      }, []);

  return (
    <>
      <header className="header">
        <div className="logo">
          <h2>Logo</h2>
        </div>
        <nav className="nav-links">
          <button onClick={() => setActiveHero("find")}>Find Services</button>
          <button onClick={() => setActiveHero("provide")}>Offer Services</button>
          <button>Contact Us</button>
        </nav>
        <span className="separator">|</span>

        {isLoggedIn ? (
          <Profile displayName={username} />
        ) : (
          <AuthButtons setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
        )}
      </header>
    </>
  );
}

export default Header;
