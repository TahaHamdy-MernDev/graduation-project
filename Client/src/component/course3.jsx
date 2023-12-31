import React from 'react';
import {Container, Row ,Col} from 'react-bootstrap';
import Logo from '../images/card3.png'

function Details2() {
    return(
   <Container>
<Row className="justify-content-start">
 <Col lg={3}  md={6}   sm={12}>
  <div className="all-course">
  <img src={Logo}  alt="course-logo"/>
     <div className="details">
    <div>
    <h4> payhon دورة برمجة<button>290$</button></h4>
      <p>بانهائك هذه الدورة ستصبح مبرمجا قادرا على كتابة اكواد برمجية وصنع مواقع ويب </p>
</div>
<hr/>
<div className='details-content'>
   <h3> عن دورة البرمجة بايثون</h3>
   <p>  بانهائك هذه الدورة ستصبح قادرا على تصميم وبناء مواقع الويب بلغات مختلفة والتأهل الى سوق العمل</p>
</div>
<hr/>
<div className="course-content">
  <h5>ماذا ستتعلم في هذه الدورة ؟</h5>
<ul>
    
    <li>المفاهيم الاساسية في تعلم البرمجة </li>
    <li> دراسة سوق العمل واحتياجاته البرمجية</li>
    <li>كتابة حالات الاستخدام للمواقع</li>
    <li>تستطيع استخدام html css css3 javascrit وتقنيات اخرى</li>
    <li>نشر مواقع الويب   وتطبيقات الجوال والوصول الى مختلف المستخدمين</li>
</ul>

</div>
<a href="/courses">رجوع</a>
 <a href="#">اشترك الان</a>
 </div>
 </div>

 </Col>
</Row>
   </Container>

    )

}

export default Details2;