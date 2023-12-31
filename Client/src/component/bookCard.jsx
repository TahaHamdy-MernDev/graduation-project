
import { Col } from "react-bootstrap";
import { BsArrowDownCircle } from "react-icons/bs";
import PropTypes from "prop-types";
import RatingComponent from "./rate";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const {
    _id,
    title,
    author,
    description,
    coverImage,
    downloads,
    reviews,
    rate,
    formattedUpdatedAt,
  } = book;

  const imageUrl = `http://localhost:4000/uploads/${coverImage}`;
 const navigate=useNavigate()
 const hoverStyles = {
  textDecoration: 'underline',
  cursor: 'pointer',
};
  return (
    <>
      <Col lg={4} md={6} sm={12}>
        <div className="book2-img">
          <img src={imageUrl} alt="logo-book" />
        </div>
      </Col>
      <Col lg={4} md={6} sm={12}>
        <div className="book2-content">
          <h4 style={hoverStyles} onClick={()=>navigate(`/book-details/${_id}`)}>{title}</h4>
          <span>بواسطة {author}</span>
          <p>{description}</p>
          <div className="icon-book">
            <BsArrowDownCircle /> {downloads} تنزيل
          </div>
        </div>
      </Col>
      <Col lg={4} md={6} sm={12}>
        <div className="review">
          <div className="div-review">
            {reviews?.length} مراجعات
            <RatingComponent edit={false} initialRating={rate} />
          </div>
          <div className="edit">{formattedUpdatedAt}</div>
        </div>
      </Col>
    </>
  );
};
BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    _id: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    coverImage: PropTypes.string,
    downloads: PropTypes.number,
    rate: PropTypes.number,
    reviews: PropTypes.array,
    formattedUpdatedAt: PropTypes.string,
  }),
};
export default BookCard;
