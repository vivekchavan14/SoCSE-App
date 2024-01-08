import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Newsletter.css'; // Update the path to your CSS file

const Newsletter = ({ title, image, onDelete, onUpdate }) => {
  return (
    <div className="newsletter-container">
      <img src={image} alt={title} className="newsletter-image" />
      <div className="newsletter-content">
        <h3 className="newsletter-title">{title}</h3>
        <div className="newsletter-buttons">
          <Link to={`/article/${title}`} className="newsletter-button">
            View article
          </Link>
          <button className="newsletter-button" onClick={onUpdate}>
            Update post
          </button>
          <button className="newsletter-button" onClick={onDelete}>
            Delete post
          </button>
        </div>
      </div>
    </div>
  );
};

Newsletter.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Newsletter;
