import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import uploadPdf from "../images/UploadPdf.png";
import pdf from "../images/pdf.png";
import uploadImage from "../images/upload.png";
import { useDispatch, useSelector } from "react-redux";
// import { editBookAction } from "../Redux/Action/bookAction";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategoriesAction } from "../Redux/Action/categoryAction";
import { getAllBookAction, updateBookAction } from "../Redux/Action/bookAction";
import { toast } from "react-toastify";
function EditBook() {
  const dispatch = useDispatch();
  const { id: bookId } = useParams();
  useEffect(() => {
    dispatch(getAllBookAction());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
 const bookToEdit = useSelector((state) =>
    state.book.books.find((book) => book._id === bookId)
  );

  const [coverImage, setCoverImage] = useState(null);
  const [bookFile, setBookFile] = useState(null);

 
  useEffect(() => {
    if (bookToEdit) {
      setValue("title", bookToEdit.title);
      setValue("author", bookToEdit.author);
      setValue("description", bookToEdit.description);
      setValue("category", bookToEdit?.category._id);
    }
  }, [bookToEdit, setValue]);

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
  const { categories } = useSelector((state) => state.category);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);
  const coverImageUrl = `http://localhost:4000/uploads/${bookToEdit?.coverImage}`;
  const onSubmit = (data) => {
    delete data.bookFile;
    if (data.coverImage === null) {
      delete data.coverImage;
    }
     data.coverImage = coverImage;
    dispatch(updateBookAction({ bookId: bookToEdit._id, bookData: data }))
      .unwrap()
      .then(() => {
          toast.success("Book updated successfully");
        navigate("/all-books");
      });
  };
  let bookCategory =
    bookToEdit && bookToEdit.category && bookToEdit.category._id;
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-5">
          <Col lg={6} md={12} className="mb-4">
            <h2>تعديل الكتاب</h2>

            <Form.Group controlId="formTitle" className="mb-2">
              <Form.Label>عنوان الكتاب</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل عنوان الكتاب"
                name="title"
                {...register("title", { required: "حقل العنوان مطلوب" })}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
              />
              {errors.title && (
                <p className="text-danger">{errors.title.message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formAuthor" className="mb-2">
              <Form.Label>اسم المؤلف</Form.Label>
              <Form.Control
                type="text"
                placeholder="أدخل اسم المؤلف"
                name="author"
                {...register("author", { required: "حقل اسم المؤلف مطلوب" })}
                className={`form-control ${errors.author ? "is-invalid" : ""}`}
              />
              {errors.author && (
                <p className="text-danger">{errors.author.message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formCategory" className="mb-2">
              <Form.Label>تصنيف الكتاب</Form.Label>
              <Form.Control
                as="select"
                name="category"
                {...register("category", {
                  required: "حقل تصنيف الكتاب مطلوب",
                })}
                className={`form-control ${
                  errors.category ? "is-invalid" : ""
                }`}
                // value={bookCategory}
                defaultValue={bookCategory}
              >
                <option value="" disabled>
                  اختر تصنيف الكتاب
                </option>
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Control>
              {errors.category && (
                <p className="text-danger">{errors.category.message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-2">
              <Form.Label>وصف الكتاب</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="أدخل وصف الكتاب"
                name="description"
                {...register("description", {
                  required: "وصف الكتاب مطلوب",
                })}
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
              />
              {errors.description && (
                <p className="text-danger">{errors.description.message}</p>
              )}
            </Form.Group>
          </Col>

          <Col lg={6} md={12}>
            <Form.Group controlId="formBookFile" className="mb-4">
              <Form.Label>تحميل ملف الكتاب</Form.Label>
              {bookToEdit?.file ? (
                <div className="mb-3">
                  <Image
                    src={pdf}
                    alt="Placeholder PDF"
                    fluid
                    className="mb-3"
                  />
                  <p className="text-muted small">تم تحميل الكتاب بنجاح!</p>
                </div>
              ) : (
                <div
                  {...getRootBookFileProps()}
                  className="dropzone border rounded p-3 cursor-pointer"
                >
                  <input
                    {...getInputBookFileProps()}
                    type="file"
                    accept="application/pdf"
                  />
                  <Image
                    src={uploadPdf}
                    alt="Placeholder PDF"
                    fluid
                    className="mb-3"
                  />
                  <p className="text-muted small">
                    اسحب وأفلت ملف الكتاب هنا أو انقر لاختيار الملف
                  </p>
                </div>
              )}
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
                  <>
                    <Image
                      src={URL.createObjectURL(coverImage)}
                      alt="Cover Image Preview"
                      fluid
                      className="mb-3"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src={coverImageUrl}
                      alt="Cover Image"
                      fluid
                      className="mb-3"
                    />
                  </>
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
              تحديث الكتاب
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default EditBook;
