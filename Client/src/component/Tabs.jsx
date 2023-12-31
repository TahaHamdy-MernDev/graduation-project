import React, { useState } from "react";
import QuestionCard from "./QuestionCard";


const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    
    // <div className="right-header">
    //   <div className="tabs">
    //     <button
    //       onClick={() => handleTabClick("tab1")}
    //       className={activeTab === "tab1" ? "active tab-button" : "tab-button"}
    //     >
    //       الأسئلة الأكثر شعبية خلال الشهر الماضي
    //     </button>
    //     <button
    //       onClick={() => handleTabClick("tab2")}
    //       className={
    //         activeTab === "tab2" ? "active tab-button " : "tab-button "
    //       }
    //     >
    //       أسئلة تنتظر من يجيب عليها
    //     </button>
    //   </div>

    //   <div className="tab-content">
    //     {activeTab === "tab1" && (
    //       <div>
    //         {/* Content for Tab 1 */}
    //         <QuestionCard />
    //         <QuestionCard />
    //         <QuestionCard />
    //         <QuestionCard />

            
    //       </div>
    //     )}

    //     {activeTab === "tab2" && (
    //       <div>
    //         {/* Content for Tab 2 */}
    //         <QuestionCard />
    //         <QuestionCard />
    //         <QuestionCard />
    //         <QuestionCard />

            
    //       </div>
    //     )}
    //     {/* Add more content sections as needed */}
    //   </div>
    // </div>
  );
};

export default Tabs;
