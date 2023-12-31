import { useState } from "react";
import QuestionCard from "./QuestionCard";

function Questions() {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <div className="container-right">
        
          <div className="right-header">
            <div>الأسئلة الأكثر شعبية خلال الشهر الماضي</div>

            <div>أسئلة تنتظر من يجيب عليها</div>
          </div>
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
          <QuestionCard />
        </div>

        <div className="left-side  col-sm-12 "  >
          
          <h4 style={{ borderBottom: "1px solid black" }}>أشهر المشاركين</h4>
          <div>
            <ul className="timeline">
              <li>أسبوع</li>
              <li>شهر</li>
              <li>سلة</li>
              <li>منذ البداية</li>
            </ul>
          </div>
        </div>
   
      </div>
     
    
  );
}

export default Questions;
