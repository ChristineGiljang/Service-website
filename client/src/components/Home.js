import { useEffect, useState } from "react";

function Home() {
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
        <div>
          <h1>Welcome, {username ? username : "Guest"}!</h1>
        </div>
      );
  }
  
  export default Home;