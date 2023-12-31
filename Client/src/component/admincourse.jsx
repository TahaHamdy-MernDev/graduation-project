
import { Container, Row, Button } from "react-bootstrap";
// import BookTable from "./booksTable";
import { Link } from "react-router-dom";
import CourseTable from "./coursesTable";

function AdminCourse() {
  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>ادارة الدورات </h2>
          <Link to="/create-course">
            <Button className="btn btn-primary">إضافة دوره جديده</Button>
          </Link>
        </div>
      </Row>

      <Row>
     
          <CourseTable />
      </Row>
    </Container>
  );
}

export default AdminCourse;
