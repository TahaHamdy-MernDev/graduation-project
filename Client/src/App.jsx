import {  Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import Nav1 from "./component/nav";
import Home from "./component/home";
import Footer from "./component/footer";
import Form1 from "./component/login";
import Registration from "./component/register";
import Book from "./component/books";
import Codelang from "./component/language";
import Ques from "./component/question";
import Course from "./component/courses";
import Details from "./component/corse-details";
import Details1 from "./component/course2";
import Details2 from "./component/course3";
import Details3 from "./component/course4";
import Details4 from "./component/course5";
import Details5 from "./component/courseDetails";
import AdminPage from "./component/admunpage";
import AdminCourse from "./component/admincourse";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserAction } from "./Redux/Action/userAction";
import CreateBook from "./component/createBook";
import AddCategory from "./component/addCategory";
import EditBook from "./component/editBook";
import BookDetailPage from "./component/bookDetailPage";
import AddCourse from "./component/addCourse"; 
import EditCourse from "./component/editCourse";
import CourseDetails from "./component/courseDetails";
// import DefaultComponent from "./component/test";
import QuestionDetails from "./component/QuestionDetails";
import QuestionPreview from "./component/QuestionDetails";
import SearchResults from "./component/SearchResults";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(currentUserAction())
  }, [dispatch]);
  return (
  <>    <Nav1  user={currentUser}/>

        <Routes>
          {/* new */}
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/comments" element={<QuestionDetails />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/add-category" element={<AddCategory/>} />
          <Route path="/book-details/:id" element={<BookDetailPage/>} />
          <Route path="/create-course" element={<AddCourse/>} />
          <Route path="/edit-course/:id" element={<EditCourse/>} /> 
          <Route path="/admin-course" element={<AdminCourse />} />
          <Route path="/question-preview/:id" element={<QuestionPreview />} />
          <Route path="/all-books" element={<AdminPage />} />
          <Route path="/search-results" element={<SearchResults/>} />
          {/* new */}
          <Route path="/course-details/:id" element={<CourseDetails />} />
          <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Registration />}/>
          <Route path="/login" element={currentUser ? <Navigate to={"/"} /> : <Form1 />} />
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Book />} />
          <Route path="/language" element={<Codelang />} />
          <Route path="/question" element={<Ques />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/corse-details" element={<Details />} />
          <Route path="/course2" element={<Details1 />} />
          <Route path="/course3" element={<Details2 />} />
          <Route path="/course4" element={<Details3 />} />
          <Route path="/course5" element={<Details4 />} />
          <Route path="/courses6" element={<Details5 />} />
        
          <Route path="/admincourse" element={<AdminCourse />} />
        </Routes>

        <Footer />
  </>

  );
}

export default App;
