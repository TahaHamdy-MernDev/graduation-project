import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Logo1 from "../images/Screenshot 2023-12-04 180258.png";
import Logo11 from "../images/card5.png";
import Logo12 from "../images/card4.png";
import Logo13 from "../images/card3.png";
import Logo16 from "../images/card6.png";
import Logo17 from "../images/card2.png";
import Logo18 from "../images/card1.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCoursesAction } from "../Redux/Action/courseAction";

function Course() {
  const { courses } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoursesAction());
  }, [dispatch]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={12} md={12} sm={12}>
          <div className="img-div2">
            <img src={Logo1} alt="course-mage" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <h4 className="title1">افضل الدورات</h4>
          {courses?.length > 0 && (
            <span className="det-para">
              انقر على اي من الدورات للاطلاع على التفاصيل
            </span>
          )}

          <br />
        </Col>
      </Row>

      {courses?.length > 0 ? (
        <Row className="justify-content-center">
          {courses.map((course) => (
            <Col lg={4} sm={12} md={6} key={course._id}>
              <Link to={`/course-details/${course._id}`}>
                {course.image ? (
                  <img
                    className="img3"
                    src={`http://localhost:4000/uploads/${course.image}`}
                    alt={`course-${course._id}`}
                  />
                ) : (
                  <div className="placeholder-image">Placeholder Image</div>
                )}
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="no-courses-message">لايوجد دورات لعرضها حاليا </div>
      )}
    </Container>
  );
}

export default Course;
