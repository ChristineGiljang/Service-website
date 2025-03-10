import React, { useState } from 'react';
import Header from './Header';
import "../css/hero.css";

function HeroContainer() {
  const [activeHero, setActiveHero] = useState("default");

  return (
    <div>
      <Header setActiveHero={setActiveHero} />
      <Hero 
        title={
          activeHero === "default" 
            ? "Find the best services near you, anytime, anywhere!" 
            : activeHero === "find" 
            ? "Discover top-rated services tailored to your needs!" 
            : "Offer your expertise and connect with clients!"
        } 
        activeHero={activeHero}
      />
    </div>
  );
}

const Hero = ({ title, activeHero }) => {
  return (
    <div className="hero">
      <h1>{title}</h1>

      {/* Search bar for all sections */}
      <div className="search-bar">
        <input
          type="text"
          placeholder={
            activeHero === "default"
              ? "Search for any service..."
              : activeHero === "find"
              ? "Search for a service..."
              : "Search for jobs..."
          }
        />
        <button>{activeHero === "provide" ? "List Service" : "Search"}</button>
      </div>
    </div>
  );
};

export default HeroContainer;
