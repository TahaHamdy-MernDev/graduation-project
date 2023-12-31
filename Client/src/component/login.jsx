
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "../images/b3.jpg";
import { Container, Col, Row } from "react-bootstrap";
import {  FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUserAction } from "../Redux/Action/userAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Form1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const onSubmit = (data) => {
    dispatch(loginUserAction(data)).unwrap().then(()=>{
    navigate("/")
    }).catch((err) => {
      toast.error(err.message)
    })

  };
  const google = (e) => {
    e.preventDefault();
    window.open("http://localhost:4000/api/v1/auth/google/signin", "_self");
  };
  return (
    <div id="second-sec" className="sec2">
      <Container className="sec2-div">
        <Row className="align-items-center">
          <Col lg={6} sm={12} className="justify-content-center">
            <div className="image-div-form">
              <img src={logo} alt="animation2" />
            </div>
          </Col>
          <Col lg={6} sm={12} className="f1">
            <Form className="form1" onSubmit={handleSubmit(onSubmit)}>
              <span className="link-form">تسجيل الدخول </span>
              <Row className="justify-content-center">
                <Col size={12} sm={12} className="px-1">
                  <Form.Control
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email", { required: true })}
                    type="Email"
                    placeholder="ادخل بريدك الالكتروني"
                    id="t1"
                  />
                  </Col>
                <Col size={12} sm={12} className="px-1">
                  <Form.Control
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password", { required: true })}
                    type="password"
                    placeholder="كلمة السر"
                    id="t1"
                  />
                  {errors.password && (
                    <span className="error-msg">هذا الحقل مطلوب</span>
                  )}
                </Col>
                <Col size={12} sm={12} className="px-1">
                  <Button variant="primary" type="submit" className="btn3">
                    ارسال
                  </Button>
                  <br />
                  <span>أو</span>
                </Col>

                <Col
                  size={12}
                  sm={12}
                  className="px-1 mt-2 d-flex align-items-center justify-content-center"
                >
                   <Button variant="outline-dark" onClick={google}>
                    <FaGoogle className="google-icon" /> تسجيل الدخول باستخدام
                    Google
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Form1;
