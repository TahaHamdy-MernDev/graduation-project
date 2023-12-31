import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAction,
  getAllCategoriesAction,
} from "../Redux/Action/categoryAction";
import { toast } from "react-toastify";
// import { addCategoryAction } from "../Redux/Action/categoryAction";

function AddCategory() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);
  const onSubmit = (data) => {
    dispatch(createCategoryAction(data))
      .unwrap()
      .then(() => {
        toast.success("تمت إضافة التصنيف");
        dispatch(getAllCategoriesAction());
        reset()
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container fluid style={{ minHeight: "calc(100vh - 56px - 56px)" }}>
      <Row className="mt-5">
        <Col lg={3} md={12} className="mb-4">
          {/* <CategoriesList categories={categories} /> */}
          <ListGroup>
            {categories?.map((category) => (
              <ListGroup.Item key={category._id}>
                {category.categoryName}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col lg={9} md={12} className="mb-4">
          <h2>إضافة تصنيف جديد</h2>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formCategoryName" className="mb-3">
              <Form.Label className="mb-1">اسم التصنيف</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل اسم التصنيف"
                name="categoryName"
                {...register("categoryName", {
                  required: "حقل اسم التصنيف مطلوب",
                })}
                className={`form-control ${
                  errors.categoryName ? "is-invalid" : ""
                }`}
              />
              {errors.categoryName && (
                <div className="invalid-feedback">
                  {errors.categoryName.message}
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="formCategoryDescription" className="mb-3">
              <Form.Label className="mb-1">وصف التصنيف</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="أدخل وصف التصنيف"
                name="categoryDescription"
                {...register("categoryDescription", {
                  required: "حقل وصف التصنيف مطلوب",
                })}
                className={`form-control ${
                  errors.categoryDescription ? "is-invalid" : ""
                }`}
              />
              {errors.categoryDescription && (
                <div className="invalid-feedback">
                  {errors.categoryDescription.message}
                </div>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              إضافة التصنيف
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddCategory;
