import React from 'react';
import Rating from 'react-rating-stars-component';

const RatingComponent = ({size, initialRating, onRatingChange,edit=true }) => {
  return (
    <Rating
      count={5}
      size={size||22}
      edit={edit}
      value={initialRating}
      onChange={onRatingChange}
      fullIcon={<i className="fa fa-star"></i>}
      emptyIcon={<i className="far fa-star"></i>}
    />
  );
};

export default RatingComponent;
