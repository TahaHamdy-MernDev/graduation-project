import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import uploadPdf from "../images/UploadPdf.png";
import pdf from "../images/pdf.png";
import uploadImage from "../images/upload.png";
import { useDispatch, useSelector } from "react-redux";
import { createBookAction } from "../Redux/Action/bookAction";
import { toast } from "react-toastify";
import { getAllCategoriesAction } from "../Redux/Action/categoryAction";
import { useNavigate } from "react-router-dom";

function CreateBook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [coverImage, setCoverImage] = React.useState(null);

  const [bookFile, setBookFile] = useState(null);

  const onDropBookFile = (acceptedFiles) => {
    setBookFile(acceptedFiles[0]);
  };

  const {
    getRootProps: getRootBookFileProps,
    getInputProps: getInputBookFileProps,
  } = useDropzone({
    onDrop: onDropBookFile,
    accept: ".pdf",
  });

  const onDropCoverImage = (acceptedFiles) => {
    setCoverImage(acceptedFiles[0]);
  };

  const {
    getRootProps: getRootCoverImageProps,
    getInputProps: getInputCoverImageProps,
  } = useDropzone({
    onDrop: onDropCoverImage,
    accept: "image/*",
  });
  const dispatch = useDispatch();
  const {categories} = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);
  const navigate =useNavigate()
  const onSubmit = (data) => {
    if(!bookFile){return toast.error("يرجى اضافة الكتاب") }
    if(!coverImage){return toast.error("يرجى اضافة صوره الكتاب") }
    data.bookFile = bookFile;
    data.coverImage = coverImage;

    dispatch(createBookAction(data))
      .unwrap()
      .then((res) => {
     
        toast.success("Book created successfully")
        navigate("/all-books")
      })
      .catch((error) => {
        toast.error(error.message);
      });
  
  };



  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-5">
          <Col lg={6} md={12} className="mb-4">
            <h2>إضافة كتاب جديد</h2>

            <Form.Group controlId="formTitle" className="mb-2">
              <Form.Label>عنوان الكتاب</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل عنوان الكتاب"
                name="title"
                {...register("title", { required: true })}
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              />
              
            </Form.Group>

            <Form.Group controlId="formAuthor" className="mb-2">
              <Form.Label>اسم المؤلف</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل اسم المؤلف"
                name="author"
                {...register("author", { required: true })}
                className={`form-control ${errors.author ? 'is-invalid' : ''}`}
              />
             
            </Form.Group>
            <Form.Group controlId="formAuthor" className="mb-2">
              <Form.Label>تقيم الكتاب</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={5}
                placeholder="أدخل تقيم الكتاب"
                name="author"
                {...register("rate", { required: true})}
                className={`form-control ${errors.rate ? 'is-invalid' : ''}`}
              />
             
            </Form.Group>
            <Form.Group controlId="formCategory" className="mb-2">
              <Form.Label>تصنيف الكتاب</Form.Label>
              <Form.Control
                as="select"
                name="category"
                {...register("category", { required: true })}
                className={`form-control ${errors.category ? 'is-invalid' : ''}`}
              >
                <option value="" disabled>
                  اختر تصنيف الكتاب
                </option>
                {categories?.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Control>
            
            </Form.Group>
            <Form.Group controlId="formDescription" className="mb-2">
              <Form.Label>وصف الكتاب</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="أدخل وصف الكتاب"
                name="description"
                {...register("description", { required: true })}
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              />
              {/* {errors.description && (
                <p className="text-danger">{errors.description.message}</p>
              )} */}
            </Form.Group>
          </Col>

          <Col lg={6} md={12}>
            <Form.Group controlId="formBookFile" className="mb-4">
              <Form.Label>تحميل ملف الكتاب</Form.Label>
              <div
                {...getRootBookFileProps()}
                className="dropzone border rounded p-3 cursor-pointer"
              >
                <input
                  {...getInputBookFileProps()}
                  type="file"
                  accept="application/pdf"
                  
                />
                {bookFile ? (
                  <>
                    <Image
                      src={pdf}
                      alt="Placeholder PDF"
                      fluid
                      className="mb-3"
                    />
                    <p className="text-muted small">تم تحميل الكتاب بنجاح!</p>
                  </>
                ) : (
                  <>
                    <Image
                      src={uploadPdf}
                      alt="Placeholder PDF"
                      fluid
                      className="mb-3"
                    />
                    <p className="text-muted small">
                      اسحب وأفلت ملف الكتاب هنا أو انقر لاختيار الملف
                    </p>
                  </>
                )}
              </div>
              {errors.bookFile && (
                <p className="text-danger mt-1">{errors.bookFile.message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formCoverImage" className="mb-4">
              <Form.Label>تحميل صورة الغلاف</Form.Label>
              <div
                {...getRootCoverImageProps()}
                className="dropzone border rounded p-3 cursor-pointer"
              >
                <input {...getInputCoverImageProps()} />
                {coverImage ? (
                  <Image
                    src={URL.createObjectURL(coverImage)}
                    alt="Cover Image Preview"
                    fluid
                    className="mb-3"
                  />
                ) : (
                  <Image
                    src={uploadImage}
                    alt="Placeholder Image"
                    fluid
                    className="mb-3"
                  />
                )}
                <p className="text-muted small">
                  اسحب وأفلت صورة الغلاف هنا أو انقر لاختيار الصورة
                </p>
              </div>
              {errors.coverImage && (
                <p className="text-danger mt-1">{errors.coverImage.message}</p>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              إضافة الكتاب
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CreateBook;
