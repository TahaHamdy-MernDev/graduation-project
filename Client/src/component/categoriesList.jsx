import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";

function CategoriesList({ categories }) {
  return (
    <ListGroup>
    {categories?.map((category) => (
      <ListGroup.Item key={category._id}>{category.categoryName}</ListGroup.Item>
    ))}
  </ListGroup>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired || PropTypes.number.isRequired,
      categoryName: PropTypes.string.isRequired,
      categoryDescription: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CategoriesList;
