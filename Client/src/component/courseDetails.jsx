import React, { useEffect } from 'react';
import {Container, Row ,Col} from 'react-bootstrap';
import Logo from '../images/card1.png';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesAction } from '../Redux/Action/courseAction';
function CourseDetails() { 
   const { id } = useParams();
   const dispatch = useDispatch();
  useEffect(() => {
   dispatch(fetchCoursesAction());
 }, [dispatch]); 

  const courseToPreview = useSelector((state) =>
    state.course.courses.find((course) => course._id === id)
  );
    return(
      <Container>
      <Row className="justify-content-start">
        <Col lg={3} md={6} sm={12}>
          <div className="all-course">
            {/* Assuming you have an image URL in the course data */}
            <img src={`http://localhost:4000/uploads/${courseToPreview?.image}`} alt="course-logo" />
            <div className="details">
              <div>
                <h4>
                  {courseToPreview?.name} <button>{`${courseToPreview?.price}$`}</button>
                </h4>
                <p>{courseToPreview?.subDescription}</p>
              </div>
              <hr />
              <div className="details-content">
                <h3>عن الدورة</h3>
                <p>{courseToPreview?.description}</p>
              </div>
              <hr />
              <div className="course-content">
                <h5>ماذا ستتعلم في هذه الدورة؟</h5>
                <ul>
                  {courseToPreview?.whatUWillLearn.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>

    )

}

export default CourseDetails;