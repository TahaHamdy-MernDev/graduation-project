
import { useForm } from "react-hook-form";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { unRegisterUserAskQuestionAction } from "../Redux/Action/questionAction";

function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(unRegisterUserAskQuestionAction(data))
      .unwrap()
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("email", "");
    setValue("address", "");
    setValue("content", "");
  };

  return (
    <section className="form-sec2">
      <Container>
        <Row className="justify-content-center">
          <Col lg={12} md={12} sm={12}>
            <form onSubmit={handleSubmit(onSubmit)} className="container-form">
              <h4>اضافة سؤال جديد</h4>
              <p>
                يمكنك أن تنشر الان وتسجل لاحقا, إذا كان لديك حساب, فسجل الدخول
                الان لتنشر بإسم حسابك.
              </p>
              <div className="childContainer">
                <div>
                  <label htmlFor="firstName" style={{ marginBottom: "3px" }}>
                    الاسم الأول
                  </label>
                  <br />
                  <input
                    {...register("firstName", {
                      required: "This field is required",
                    })}
                    style={{
                      width: "80%",
                      height: "40px",
                      margin: "7px",
                      padding: "10px",
                    }}
                  />
                  <span style={{ color: "red" }}>
                    {errors.firstName?.message}
                  </span>
                </div>
                <div>
                  <label htmlFor="lastName" style={{ marginBottom: "3px" }}>
                    الاسم الأخير
                  </label>
                  <br />
                  <input
                    {...register("lastName", {
                      required: "This field is required",
                    })}
                    style={{
                      width: "80%",
                      height: "40px",
                      margin: "7px",
                      padding: "10px",
                    }}
                  />
                  <span style={{ color: "red" }}>
                    {errors.lastName?.message}
                  </span>
                </div>
                <div>
                  <label htmlFor="email" style={{ marginBottom: "3px" }}>
                    البريد الإلكتروني
                  </label>
                  <br />
                  <input
                    {...register("email", {
                      required: "This field is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="inputEmail"
                    style={{
                      width: "50%",
                      height: "40px",
                      margin: "7px",
                      padding: "10px",
                    }}
                  />
                  <br />
                  <span style={{ fontSize: "12px" }}>
                    لن يظهر إلي باقي المستخدمين.
                  </span>
                  <span style={{ color: "red" }}>{errors.email?.message}</span>
                </div>
                {/* <div>
                  <label htmlFor="Rec">التحقق البشري</label>
                  <br />
                  <ReCAPTCHA
                    id="repeach"
                    sitekey="Your client site key"
                    onChange={onchange}
                    style={{ padding: "10px" }}
                  />
                  <br />
                </div> */}

                {/* <div className="col-md-6 col-sm-12">
                  <label htmlFor="address">العنوان</label>
                  <br />
                  <input
                    {...register("address", { required: "This field is required" })}
                    style={{ width: "80%", height: "40px", margin: "7px" ,padding:"10px" }}
                  />
                  <span style={{ color: "red" }}>{errors.address?.message}</span>
                </div> */}
                <div className="col-md-6 col-sm-12">
                  <label htmlFor="content">المحتوى</label>
                  <br />
                  <textarea
                    {...register("content", {
                      required: "This field is required",
                    })}
                    style={{ width: "100%", height: "400px", padding: "10px" }}
                  />
                  <span style={{ color: "red" }}>
                    {errors.content?.message}
                  </span>
                </div>
              </div>
              <div className="button-container">
                {/* <button className="btn1-style">اضف صورة</button> */}
                <button className="btn-style" type="submit">
                  أرسل سؤال
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Form;
