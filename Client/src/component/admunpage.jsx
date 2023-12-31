import { Container, Row, Col, Button } from "react-bootstrap";
import BookTable from "./booksTable";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>إدارة الكتب</h2>
          <Link to="/create-book">
            <Button className="btn btn-primary">إضافة كتاب جديد</Button>
          </Link>
        </div>
      </Row>

      <Row>
        <Col>
          <BookTable />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;
