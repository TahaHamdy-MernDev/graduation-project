import { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookAction, getAllBookAction } from "../Redux/Action/bookAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

function BookTable() {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllBookAction());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleEdit = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  const handleShowModal = (bookId) => {
    setBookToDelete(bookId);
    setShowConfirmModal(true);
  };

  const handleHideModal = () => {
    setShowConfirmModal(false);
    setBookToDelete(null);
  };

  const handleDeleteBook = () => {
    if (bookToDelete) {
      dispatch(deleteBookAction(bookToDelete))
        .unwrap()
        .then(() => {
          toast.success("Book deleted successfully");
          setBookToDelete(null);
          setShowConfirmModal(false);
          dispatch(getAllBookAction());
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('ar-EG', optionsDate).format(date);
  
    // Format time
    const optionsTime = {
      hour: 'numeric',
      minute: 'numeric',
    };
    const formattedTime = new Intl.DateTimeFormat('ar-EG', optionsTime).format(date);
  
    return `يوم ${formattedDate} الساعة ${formattedTime}`;
  };
  const formattedBooks = books?.map((book) => ({
    ...book,
    title :book.title.split(' ').slice(0, 4).join(' '),
    formattedUpdatedAt: formatLastUpdate(book.updatedAt),
  })); 
  const actionBodyTemplate = (book) => {
    return (
      <span className="d-flex justify-content-center align-items-center gap-2 p-4">
        <Button
          onClick={() => handleEdit(book._id)}
          variant="info"
          size="md"
          className="pr-2"
        >
          تحرير
        </Button>
        <Button variant="danger"   size="md" onClick={() => handleShowModal(book._id)}>
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
      value={formattedBooks}
      dataKey="_id"
      stripedRows
      tableStyle={{ minWidth: "50rem"}}
      rowHover
      style={{ fontSize: "18px" ,padding:'10px'}}
      sortField="createdAt"
      sortOrder={-1}
      paginator
      rows={10}
    >
      <Column
      headerStyle={{padding:'1rem'}}
        style={{ width: "25%", textAlign: "right"}}
        field="title"
        header="عنوان الكتاب"
      ></Column>
      <Column
        style={{ width: "25%", textAlign: "right" }}
        field="author"
        header="اسم المؤلف"
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
        <Modal.Body>هل أنت متأكد أنك تريد حذف هذا الكتاب؟</Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Button variant="danger" onClick={handleDeleteBook}>
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
    //       <th scope="col">عنوان الكتاب</th>
    //       <th scope="col">اسم المؤلف</th>
    //       <th scope="col">تصنيف الكتاب</th>
    //       <th scope="col">اخر تحديث</th>
    //       <th scope="col">التحكم</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {formattedBooks?.map((book, index) => (
    //       <tr key={index}>
    //         <th scope="row">{index + 1}</th>
    //         <td>{book.title}</td>
    //         <td>{book.author}</td>
    //         <td>{book.category.categoryName}</td>
    //         <td>{book.formattedUpdatedAt}</td>
    //         <td>
    //           <Button
    //             onClick={() => handleEdit(book._id)}
    //             variant="info"
    //             size="sm"
    //             className="me-2"
    //           >
    //             تحرير
    //           </Button>
    //           <Button
    //             variant="danger"
    //             onClick={() => handleShowModal(book._id)}
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

export default BookTable;
