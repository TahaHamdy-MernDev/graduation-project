import  { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

import BookCard from "./bookCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookAction } from "../Redux/Action/bookAction";
import BookDownloadItem from "./bookDownloadItem";
function Book() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBookAction());
  }, [dispatch]);
  const { books } = useSelector((state) => state.book);
  // State for sorting
  const [sortCriteria, setSortCriteria] = useState("date"); // Default sort by date
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order is ascending

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

    return `اخر تحديث يوم ${formattedDate} الساعة ${formattedTime}`;
  };

  const sortBooks = (booksToSort) => {
    const sortedBooks = [...booksToSort].sort((a, b) => {
      if (sortCriteria === "downloads") {
        // Sorting based on download count
        if (sortOrder === "asc") {
          return a.downloads - b.downloads;
        } else {
          return b.downloads - a.downloads;
        }
      } else {
        // Sorting based on other criteria
        if (sortOrder === "asc") {
          return a[sortCriteria] > b[sortCriteria] ? 1 : -1;
        } else {
          return a[sortCriteria] < b[sortCriteria] ? 1 : -1;
        }
      }
    });

    return sortedBooks;
  };

  const formattedBooks = books?.map((book) => ({
    ...book,
    formattedUpdatedAt: formatLastUpdate(book.updatedAt),
  }));
  const sortedBooks =
    sortCriteria === "downloads" ? sortBooks(formattedBooks) : formattedBooks;
  const handleSortChange = (criteria) => {
    if (criteria === sortCriteria) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };
  const [sortedBooksI, setSortedBooksI] = useState([]);

  useEffect(() => {
    const sortByDownloadsDescending = (booksArray) => {
      return booksArray?.sort((a, b) => b.downloads - a.downloads);
    }; 

    const sortedBooks = sortByDownloadsDescending(formattedBooks);
    setSortedBooksI(sortedBooks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getTopDownloadedBooks = (books) => {
    const sortedBooks = [...books].sort((a, b) => b.downloads - a.downloads);
    const top5Books = sortedBooks?.slice(0, 5);
    return top5Books;
  };
  const topDownloadedBooks = getTopDownloadedBooks(books);
  return (
    <Container>
      <div className="book1 mb-4">
        <span>كتب برمجية ({sortedBooks?.length})</span>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">ترتيب حسب</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSortChange("date")}>
              تاريخ الاصدار
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("downloads")}>
              الاكثر تفاعلا
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Row>
        <Col lg={6} md={8} sm={12}>
          <h3 className="mb-4"> الكتب</h3>
          <div className="sec-book">
            <Row className="justify-content-center">
              {sortedBooks?.map((book, index) => (
                <BookCard key={index} book={book} />
              ))}
            </Row>
          </div>
        </Col>

        <Col lg={6} sm={12} className="pr-4">
          <h3 className="mb-4"> الاكثر تنزيلا</h3>
          {topDownloadedBooks?.map((book, index) => (
            <BookDownloadItem
              _id={book._id}
              key={index}
              image={book.coverImage}
              title={book.title}
              author={book.author}
              downloads={book.downloads}
              rate={book.rate}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
export default Book;
