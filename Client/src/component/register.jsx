import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Logo from "../images/b3.jpg";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserAction } from "../Redux/Action/userAction";
const PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
function Registration() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    delete data.agree;
    dispatch(registerUserAction(data))
      .unwrap()
      .then(() => {
        Navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const google = (e) => {
    e.preventDefault();
    window.open("http://localhost:4000/api/v1/auth/google/signin", "_self");
  };

  return (
    <Container className="reg-sec">
      <Row className="justify-content-center">
        <Col lg={6} sm={12}>
          <div className="image-div-form">
            <img src={Logo} alt="form-logo" />
          </div>
        </Col>
        <Col lg={6} sm={12}>
          <Form className="form2" onSubmit={handleSubmit(onSubmit)}>
            <div className="buttons">
              <button className="btn4" onClick={google}>
                تسجيل باستخدام جوجل{" "}
              </button>
              <hr />
            </div>

            <Form.Group className="mb-3 gap-4" controlId="formBasicEmail">
              <Form.Label className="label1"> الاسم الأول</Form.Label>
              <Form.Control
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                {...register("firstName", { required: true })}
                type="text"
                placeholder="ادخل الاسم باللغة العربية"
              />
            </Form.Group>

            <Form.Group className="mb-3 gap-4" controlId="formBasicEmail">
              <Form.Label className="label1">اسم العائلة</Form.Label>
              <Form.Control
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                {...register("lastName", { required: true })}
                type="text"
                placeholder="ادخل اسم العائلة باللغة العربية"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="label1">البريد الإلكتروني</Form.Label>
              <Form.Control
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                type="email"
                placeholder="ادخل بريدك الالكتروني"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="label1">كلمة السر</Form.Label>
              <Form.Control
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password", {
                  required: true,
                  pattern: PASSWORD_REGEXP,
                })}
                type="password"
                placeholder="ادخل كلمة السر"
              />
                  {errors.password && <span className="error-msg">  كلمة السر يجب أن تحتوي على 8 أحرف على الأقل، وتحتوي على رقم وحرف كبير وحرف صغير.</span>}
     
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Label className="label1">
                {" "}
                اوافق على الشروط والاحكام{" "}
              </Form.Label>
              <Form.Check
                 className="checked"

                {...register("agree", { required: true })}
                type="checkbox"
              />
              {errors.agree && (
                <span className="error-msg">
                  يجب الموافقة على الشروط والأحكام
                </span>
              )}
            </Form.Group>

            <Button variant="primary" className="btn" type="submit">
              ارسال
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
