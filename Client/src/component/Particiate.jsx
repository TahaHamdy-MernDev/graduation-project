import React, { useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";

const Particiate = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <div className="tabs  col-12">
        <button
          onClick={() => handleTabClick("tab1")}
          className={activeTab === "tab1" ? "active tab-button" : "tab-button"}
        >
          أسبوع
        </button>
        <button
          onClick={() => handleTabClick("tab2")}
          className={activeTab === "tab2" ? "active tab-button" : "tab-button"}
        >
          شهر
        </button>
        <button
          onClick={() => handleTabClick("tab3")}
          className={activeTab === "tab3" ? "active tab-button" : "tab-button"}
        >
          سلة
        </button>
        <button
          onClick={() => handleTabClick("tab4")}
          className={activeTab === "tab4" ? "active tab-button" : "tab-button"}
        >
          منذ البداية
        </button>
        {/* Add more tabs as needed */}
      </div>

      <div className="tab-content">
        {activeTab === "tab1" && (
          <div>
            <div className="particiate-content">
        <img
            className="imgStyle-toast"
            src="https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?rs=1&pid=ImgDetMain"
            alt="img"
          />
          <h3 style={{ color: "rgba(76, 175, 175, 0.5)" }}>
           Mohammad alsayed
          </h3>
          <p>52  <BsArrowDownCircle/> </p>
          </div>
          <div className="particiate-content">
          <img
              className="imgStyle-toast"
              src="https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?rs=1&pid=ImgDetMain"
              alt="img"
            />
            <h3 style={{ color: "rgba(76, 175, 175, 0.5)" }}>
             Ahmad Hossam
            </h3>
            <p>521 <BsArrowDownCircle/> </p>
            </div>
            <div className="particiate-content">
          <img
              className="imgStyle-toast"
              src="https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?rs=1&pid=ImgDetMain"
              alt="img"
            />
            <h3 style={{ color: "rgba(76, 175, 175, 0.5)" }}>
             Mayar al-tamimi
            </h3>
            <p>32  <BsArrowDownCircle/> </p>
            </div>
            <div className="particiate-content">
          <img
              className="imgStyle-toast"
              src="https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?rs=1&pid=ImgDetMain"
              alt="img"
            />
            <h3 style={{ color: "rgba(76, 175, 175, 0.5)" }}>
             Haifa abual-rub
            </h3>
            <p>33 <BsArrowDownCircle/> </p>
            </div>
            <div className="particiate-content">
          <img
              className="imgStyle-toast"
              src="https://th.bing.com/th/id/OIP.eU8MYLNMRBadK-YgTT6FJQHaHw?rs=1&pid=ImgDetMain"
              alt="img"
            />
            <h3 style={{ color: "rgba(76, 175, 175, 0.5)" }}>
             Ghada Abu al-rub
            </h3>
            <p>598 <BsArrowDownCircle/> </p>
            </div>
            </div>
          
        )}

        {activeTab === "tab2" && (
          <div>
            {/* Content for Tab 2 */}
            <h3>Content for Tab 2</h3>
          </div>
        )}
        {activeTab === "tab3" && (
          <div>
            {/* Content for Tab 3 */}
            <h3>Content for Tab 3</h3>
          </div>
        )}
        {activeTab === "tab4" && (
          <div>
            {/* Content for Tab 4 */}
            <h3>Content for Tab 4</h3>
          </div>
        )}
        {/* Add more content sections as needed */}
        
      
      </div>
    
    </div>
  );
};

export default Particiate;
