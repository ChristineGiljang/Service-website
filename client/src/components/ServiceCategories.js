import React, { useState } from "react";
import { Hammer, House, Car, Truck, HeartHandshake, TreePine, PaintRoller, Flame } from "lucide-react";
import "../css/servicecategories.css"; // Import the CSS file

const categories = [
  { id: "house", name: "House", icon: <House size={24} /> },
  { id: "car", name: "Car", icon: <Car size={24} /> },
  { id: "moving", name: "Moving", icon: <Truck size={24} /> },
  { id: "health", name: "Wellness", icon: <HeartHandshake size={24} /> },
  { id: "outdoor", name: "Outdoor Help", icon: <TreePine size={24} /> },
  { id: "home-repairs", name: "Home Repairs", icon: <Hammer size={24} /> },
  { id: "painting", name: "Painting", icon: <PaintRoller size={24} /> },
  { id: "general", name: "General", icon: <Flame size={24} /> },
];

const ServiceCategories = () => {
  const [activeCategory, setActiveCategory] = useState("home-repairs");

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-button ${activeCategory === category.id ? "active" : ""}`}
          onClick={() => setActiveCategory(category.id)}
        >
          <div className="icon-container">{category.icon}</div>
          <span className="category-name">{category.name}</span>
          {activeCategory === category.id && <div className="active-underline"></div>}
        </button>
      ))}
    </div>
  );
};

export default ServiceCategories;
