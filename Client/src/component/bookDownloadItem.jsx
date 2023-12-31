import React from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import RatingComponent from "./rate";
import { useNavigate } from "react-router-dom";

const BookDownloadItem = ({ _id, image, title, author, downloads, rate }) => {
  const navigate = useNavigate();
  const hoverStyles = {
    textDecoration: "underline",
    cursor: "pointer",
  };
  const imageUrl = `http://localhost:4000/uploads/${image}`;
  return (
    <>
      <div className="book-download">
        <img src={imageUrl} alt="logo-image" />
        <div className="content">
          <h3
            style={hoverStyles}
            onClick={() => navigate(`/book-details/${_id}`)}
          >
            {title}
          </h3>
          <p>بواسطة {author}</p>
          <span className="d-flex align-items-center gap-2">
            <BsArrowDownCircle /> {downloads} تنزيل
          </span>
          <RatingComponent edit={false} initialRating={rate} />
        </div>
      </div>
      <hr />
    </>
  );
};

export default BookDownloadItem;
