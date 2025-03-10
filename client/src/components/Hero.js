import React from "react";
import "../css/hero.css";

const Hero = ({ title, activeHero }) => {
  return (
    <div className="hero">
        <h1>{title}</h1>

        {/* Search bar for 'default' */}
        {activeHero === "default" && (
          <div className="search-bar">
            <input type="text" placeholder="Search for any service..." />
            <button>Search</button>
          </div>
        )}

        {/* Search bar for 'find' or 'provide' */}
        {(activeHero === "find" || activeHero === "provide") && (
          <div className="search-bar">
            <input
              type="text"
              placeholder={
                activeHero === "find"
                  ? "Search for a service..."
                  : "Search for jobs..."
              }
            />
            <button>{activeHero === "find" ? "Search" : "List Service"}</button>
          </div>
        )}
            </div>
          );
};

export default Hero;
