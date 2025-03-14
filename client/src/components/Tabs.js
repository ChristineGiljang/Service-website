import React, { useState } from "react";
import "../css/tabs.css"; // Ensure you have styles for the tabs

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("myServices");

  return (
    <div className="tabs-container">
      {/* Tab Buttons */}
      <div className="tabs">
        <button
          className={activeTab === "myServices" ? "active" : ""}
          onClick={() => setActiveTab("myServices")}
        >
          My Services
        </button>
        <button
          className={activeTab === "savedServices" ? "active" : ""}
          onClick={() => setActiveTab("savedServices")}
        >
          Saved Services
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "myServices" && <div>📌 Here are your listed services.</div>}
        {activeTab === "savedServices" && <div>⭐ Here are your saved services.</div>}
      </div>
    </div>
  );
};

export default Tabs;
