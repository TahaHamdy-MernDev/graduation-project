import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsArrowDownCircle } from "react-icons/bs";

import Logo1 from "../images/b3.jpg";
import Logo2 from "../images/img3.jpg";
import Logo3 from "../images/img2.jpg";
import Logo4 from "../images/img1.jpg";
import Logo5 from "../images/img4.jpg";
import Logo6 from "../images/img6.jpg";
import Logo7 from "../images/img5.jpg";
import Logo8 from "../images/b1.jpg";
import Logo9 from "../images/b2.png";
import Logo10 from "../images/main.png";

import Logo15 from "../images/Screenshot 2023-12-04 180258.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCoursesAction } from "../Redux/Action/courseAction";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getAllBookAction } from "../Redux/Action/bookAction";

function Home() {
  const { register, handleSubmit, watch } = useForm();
  const { courses } = useSelector((state) => state.course);
  const { books } = useSelector((state) => state.book);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoursesAction());
    dispatch(getAllBookAction());
  }, [dispatch]);

  const onSubmit = (data) => {
    navigate(
      `/search-results?category=${data.category}&selectedCategory=${data.selectedCategory}`
    );
  };
  const inputStyles = {
    outline: "none",
    border: "1px solid rgb(0, 174, 255)",
    width: "200px",
    height: "40px",
    borderRadius: "30px",
    paddingRight: "35px",
  };
  const selectedCategory = watch("category");
  const categories =
    selectedCategory === "course"
      ? Array.from(
          new Set(courses.map((course) => course.category.categoryName))
        )
      : selectedCategory === "book"
      ? Array.from(new Set(books.map((book) => book.category.categoryName)))
      : [];
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="justify-content-center">
          <Col lg={2} md={6} sm={12}>
            <div className="home-div">
              <img src={Logo1} alt="logo" />
            </div>
          </Col>

          <Col lg={2} md={6} sm={12}>
            <div className="home-div">
              <h5>تبحث عن</h5>

              <select required style={inputStyles} {...register("category")}>
                <option value="" defaultValue disabled>
                  اضغط للاختيار
                </option>
                <option value="course">دورة</option>
                <option value="book">كتاب</option>
              </select>
              <BsArrowDownCircle className="icon1" />
            </div>
          </Col>

          <Col lg={2} md={6} sm={12}>
            <div className="home-div">
              <h5>التصنيف</h5>
              <select
                required
                style={inputStyles}
                {...register("selectedCategory")}
              >
                <option defaultValue value="" disabled>
                  اضغط للاختيار
                </option>
                {categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <BsArrowDownCircle className="icon1" />
            </div>
          </Col>

          <Col lg={2} md={6} sm={12}>
            <div className="home-div">
              <button type="submit" className="link-home">
                بحث
              </button>
            </div>
          </Col>
        </Row>
      </form>

      <Row className="justify-content-center">
        <Col sm={12}>
          <div className="img-div">
            <img src={Logo2} alt="logo"></img>
            <img src={Logo3} alt="logo"></img>
            <img src={Logo4} alt="logo"></img>
            <img src={Logo5} alt="logo"></img>
            <img src={Logo6} alt="logo"></img>
            <img src={Logo7} alt="logo"></img>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs>
          <h4 className="title1">افضل المنصات التعليمية</h4>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col sm={12}>
          <div className="imgdiv">
            <img className="img-home" src={Logo10} alt="image1" />
            <img className="img-home" src={Logo8} alt="image1" />
            <img className="img-home" src={Logo9} alt="image1" />
          </div>
        </Col>
      </Row>

      <Row className="align-items-center ">
        <Col lg={12} sm={12}>
          <div className="img-div2">
            <img src={Logo15} alt="image11" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs>
          <h4 className="title1">افضل الدورات</h4>
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
export default Home;
