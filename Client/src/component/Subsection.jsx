import React from 'react';
import Toasts from "./Toasts";
import {Container, Row, Col}  from 'react-bootstrap';
function Subsection() {
  return (
<Container>
  <Row >
    <Col lg={4}  md={6} sm={12}>
      <div id="sub-sec"  className="text-center">
    <div className="container-subsection">
  
        <div className="subsection-content">
        <img
            className="imgStyle"
            src="https://th.bing.com/th/id/R.d1998651f86b13f7d609137f1f7d5ea9?rik=Y59icN0ofQ4V3A&riu=http%3a%2f%2fpngimg.com%2fuploads%2fquestion_mark%2fquestion_mark_PNG75.png&ehk=Agfjh9fZoTZ%2bhKxgBRWIqxzcrB%2fkpUN2OJWQ1EAXT%2bM%3d&risl=&pid=ImgRaw&r=0"
            alt="img"
          />
          <h3 style={{ color: "rgba(76, 175, 175, 0.5)" }}>
            تطوير الواجهات الأمامية
          </h3>
          <p>بواسطة محمود مرسي 2, 27 نوفمبر</p>
        </div>
      

      <div className="num-subsection  m-auto">
        <h3>4.2K</h3>
        <p>مساهمة</p>
      </div>

      <div>
        <Toasts />
      </div>

    </div>
    
    </div>
    </Col>
    </Row>
    </Container>
  )
}

export default Subsection;
