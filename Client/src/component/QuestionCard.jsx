

function QuestionCard() {
  return (
    <div className="container-card" style={{ borderBottom: "1px solid black" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <img
            className="imgStyle"
            src="https://th.bing.com/th/id/R.d1998651f86b13f7d609137f1f7d5ea9?rik=Y59icN0ofQ4V3A&riu=http%3a%2f%2fpngimg.com%2fuploads%2fquestion_mark%2fquestion_mark_PNG75.png&ehk=Agfjh9fZoTZ%2bhKxgBRWIqxzcrB%2fkpUN2OJWQ1EAXT%2bM%3d&risl=&pid=ImgRaw&r=0"
            alt="img"
          />
        </div>

        <div  className="ques-card-div">
          <h3>ربط جهاز الaccess control بمشروع ويب</h3>
          <p>بواسطة محمود مرسي 2, 27 نوفمبر</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          textAlign: "center",
          padding: "15px",
          gap: "15px",
        }}
      >
        <div>
          <p>0</p>
          <p>أصوات</p>
        </div>
        <div>
          <p>0</p>
          <p>أجوبة</p>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
