/* eslint-disable react/jsx-key */
import  { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { useDispatch } from "react-redux";
import {
  addCommentBookAction,
  getAllBookAction,
  downloadsCountAction,
} from "../Redux/Action/bookAction";
import RatingComponent from "./rate";
import CommentSection from "./commentSection";
import DownloadButton from "./DownloadButton";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { currentUserAction } from "../Redux/Action/userAction";
import { toast } from "react-toastify";
const BookDetailPage = () => {
  const { id: bookId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBookAction());
    dispatch(currentUserAction());
  }, [dispatch]);

  const bookToPreview = useSelector((state) =>
    state.book.books.find((book) => book._id === bookId)
  );
  const [comment, setComment] = useState("");
  const handleRatingChange = (newRating) => {};

  const handleDownloadClick = () => {
    dispatch(downloadsCountAction({ bookId: bookToPreview._id }))
      .unwrap()
      .then(() => {
        window.open(
          `http://localhost:4000/uploads/${bookToPreview.file}`,
          "_blank"
        );
      });
  };

  const handleCommentSubmit = async (Comment) => {
    dispatch(
      addCommentBookAction({ bookId: bookToPreview?._id, comment: Comment })
    )
      .unwrap()
      .then(() => {
        dispatch(getAllBookAction());
        setComment("");
      })
      .catch((error) => {
        toast.error(error.message)
      });
  };

  const coverImage = `http://localhost:4000/uploads/${bookToPreview?.coverImage}`;

  return (
    <Container>
      <Row className="mt-5">
        <Col lg={6} md={12}>
          {bookToPreview ? (
            <>
              <h2>{bookToPreview.title}</h2>
              <img
                src={coverImage}
                alt={bookToPreview.title}
                className="img-fluid mb-3"
              />
              <p>{bookToPreview?.description}</p>
              <p>المؤلف: {bookToPreview?.author}</p>
              <p>عدد التحميلات: {bookToPreview?.downloads}</p>

              <h4>تقييم الكتاب</h4>
              <RatingComponent
                edit={false}
                initialRating={bookToPreview?.rate}
                onRatingChange={handleRatingChange}
              />
              <h4 className="mt-4">تحميل الكتاب</h4>
              <DownloadButton onDownloadClick={handleDownloadClick} />
              {currentUser && (
                <>
                  <h4 className="mt-4">تعليقات القراء</h4>
                  <CommentSection
                    comment={comment}
                    buttonText={"إضافة تعليق"}
                    placeholder={"أضف تعليقًا..."}
                    onCommentChange={(e) => setComment(e.target.value)}
                    onCommentSubmit={handleCommentSubmit}
                  />
                </>
              )}
            </>
          ) : (
            <p>لم يتم تحديد كتاب للعرض.</p>
          )}
        </Col>

        <Col lg={6} md={12}>
          {bookToPreview ? (
            <>
              <h4 className="mt-4">مراجعات القراء</h4>
              {bookToPreview.reviews.length > 0 ? (
                <>
                  {bookToPreview.reviews
                    .filter((review) => review.text !== undefined)
                    .map((review, index) => (
                      <div key={index} className="mb-3 border p-3 rounded">
                        <span className="text-muted mb-2 d-flex justify-content-between">
                          <strong>
                            <p>
                              {review.user.firstName} {review.user.lastName}
                            </p>
                          </strong>{" "}
                          &bull; {formatTimeAgo(review.createdAt)}
                        </span>
                        <p className="mb-0">{review.text}</p>
                      </div>
                    ))}
                </>
              ) : (
                <p>لا توجد مراجعات حاليًا.</p>
              )}
            </>
          ) : (
            <p>لم يتم تحديد كتاب للعرض.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};
const formatTimeAgo = (createdAt) => {
  const now = moment();
  const commentTime = moment(createdAt);
  const diffInSeconds = now.diff(commentTime, "seconds");

  if (diffInSeconds < 60) {
    return "الآن";
  } else if (diffInSeconds < 60 * 60) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes}دقيقة `;
  } else if (diffInSeconds < 24 * 60 * 60) {
    const diffInHours = Math.floor(diffInSeconds / (60 * 60));
    return `${diffInHours} ساعة${diffInHours === 1 || ""} مضت`;
  } else if (diffInSeconds < 24 * 60 * 30 * 60) {
    const diffInDays = Math.floor(diffInSeconds / (24 * 60 * 60));
    return `${diffInDays} يوم`;
  } else if (diffInSeconds < 24 * 60 * 30 * 12 * 60) {
    const diffInMonths = Math.floor(diffInSeconds / (24 * 60 * 30 * 60));
    return `${diffInMonths} شهر `;
  } else {
    const diffInYears = Math.floor(diffInSeconds / (24 * 60 * 30 * 12 * 60));
    return `${diffInYears} سنه`;
  }
};

export default BookDetailPage;
