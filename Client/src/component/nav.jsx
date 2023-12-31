import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Api from "../Api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { currentUserAction } from "../Redux/Action/userAction";

function Nav1({ user }) {
  const navigate = useNavigate();
  const logout = async () => {
    window.open("http://localhost:4000/api/v1/auth/logout", "_self");
  };
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(currentUserAction());
  }, [dispatch]);

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Link className="nav-link" to="/">
              الصفحة الرئيسية
            </Link>
            <Link className="nav-link" to="/courses">
              دورات
            </Link>
            <Link className="nav-link" to="/books">
              كتب
            </Link>
            <Link className="nav-link" to="/language">
              لغات برمجة
            </Link>
            <Link className="nav-link" to="/question">
              أسئلة وأجوبة
            </Link>
            {currentUser?.role === "Admin" && (
              <>
                <Link className="nav-link" to="/all-books">
                  ادمن الكتب
                </Link>
                <Link className="nav-link" to="/admincourse">
                  ادمن الكورسات
                </Link>
                <Link className="nav-link" to="/add-category">
                  إضافة التصنيف
                </Link>
              </>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link
                  id="button1"
                  onClick={logout}
                  style={{ cursor: "pointer" }}
                >
                  تسجيل الخروج
                </Nav.Link>
              </>
            ) : (
              <>
                <Link id="button1" className="nav-link" to="/login">
                  تسجيل الدخول
                </Link>
                <Link id="button2" className="nav-link" to="/register">
                  حساب جديد
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nav1;
