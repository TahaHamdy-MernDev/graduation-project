import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteCourseByIdAction,
  fetchCoursesAction,
} from "../Redux/Action/courseAction";
// import { Button  } from 'primereact/button';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
// import { Modal } from "react-bootstrap";

function CourseTable() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchCoursesAction());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleEdit = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  };

  const handleShowModal = (courseId) => {
    setCourseToDelete(courseId);
    setShowConfirmModal(true);
  };

  const handleHideModal = () => {
    setShowConfirmModal(false);
    setCourseToDelete(null);
  };

  const handleDeleteCourse = () => {
    if (courseToDelete) {
      dispatch(deleteCourseByIdAction(courseToDelete))
        .unwrap()
        .then(() => {
          toast.success("تم حذف الدوره بنجاح");
          setCourseToDelete(null);
          setShowConfirmModal(false);
          dispatch(fetchCoursesAction());
        })
        .then((err) => {
          toast.error(err.message);
        });
    }
  };

  const formatLastUpdate = (updatedAt) => {
    const date = new Date(updatedAt);

    // Format date
    const optionsDate = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("ar-EG", optionsDate).format(
      date
    );

    // Format time
    const optionsTime = {
      hour: "numeric",
      minute: "numeric",
    };
    const formattedTime = new Intl.DateTimeFormat("ar-EG", optionsTime).format(
      date
    );

    return `  يوم ${formattedDate} الساعة ${formattedTime}`;
  };

  const formattedCourses = courses?.map((course) => ({
    ...course,
    formattedUpdatedAt: formatLastUpdate(course.updatedAt),
  }));

  const actionBodyTemplate = (course) => {
    return (
      <span className="d-flex justify-content-center align-items-center gap-2 p-4">
        <Button
          onClick={() => handleEdit(course._id)}
          variant="info"
          size="md"
          className="pr-2"
        >
          تحرير
        </Button>
        <Button variant="danger"   size="md" onClick={() => handleShowModal(course._id)}>
          حذف
        </Button>
      </span>
    );
  };

  return (
    <div
      className="card p-fluid"
      style={{ borderRadius: "15px", backgroundColor: "#fff" }}
    >
      <DataTable
        // showGridlines 
        value={formattedCourses}
        dataKey="_id"
        size="small"
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
        rowHover
        style={{ fontSize: "18px",}}
        sortField="createdAt"
        sortOrder={-1}
        paginator
        rows={10}
      >
        <Column
        headerStyle={{padding:'1rem'}}
          style={{ width: "25%", marginBottom:"2em", textAlign: "right" }}
          field="name"
          header="عنوان الدورة"
        ></Column>
        <Column
          style={{ width: "25%", textAlign: "right" }}
          field="instructor"
          header="اسم المحاضر"
        ></Column>
        <Column
          style={{ width: "25%", textAlign: "right" }}
          field="category.categoryName"
          header="تصنيف الدورة"
        ></Column>
        <Column
          style={{ width: "25%", textAlign: "right" }}
          field="formattedUpdatedAt"
          header=" اخر تحديث"
          sortable
        ></Column>

        <Column
          style={{ width: "25%", textAlign: "right" }}
          header="التحكم"
          body={actionBodyTemplate}
          headerStyle={{ textAlign: "center", minWidth: "8rem" }}
        />
      </DataTable>
      <Modal show={showConfirmModal} onHide={handleHideModal} centered>
        <Modal.Header>
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>هل أنت متأكد أنك تريد حذف هذه الدورة؟</Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button variant="danger" onClick={handleDeleteCourse}>
            حذف
          </Button>
          <Button variant="secondary" onClick={handleHideModal}>
            إلغاء
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

    // <Table striped bordered hover responsive>
    //   <thead>
    //     <tr>
    //       <th scope="col">#</th>
    //       <th scope="col">عنوان الدورة</th>
    //       <th scope="col">   اسم المحاضر
    //       <th scope="col">تصنيف الدورة</th>
    //       <th scope="col"> اخر تحديث</th>
    //       <th scope="col">التحكم</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {formattedCourses?.map((course, index) => (
    //       <tr key={index}>
    //         <th scope="row">{index + 1}</th>
    //         <td>{course.name}</td>
    //         <td>{course.instructor}</td>
    //         <td>{course.category.categoryName}</td>
    //         <td>{course.formattedUpdatedAt}</td>
    //         <td>
    //           <Button
    //             onClick={() => handleEdit(course._id)}
    //             variant="info"
    //             size="sm"
    //             className="me-2"
    //           >
    //             تحرير
    //           </Button>
    //           <Button
    //             variant="danger"
    //             onClick={() => handleShowModal(course._id)}
    //           >
    //             حذف
    //           </Button>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>

    // </Table>
  );
}

export default CourseTable;
