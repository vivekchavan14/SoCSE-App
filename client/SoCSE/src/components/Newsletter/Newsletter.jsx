import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Newsletter.css';

const Newsletter = ({ _id, title, image, onDelete }) => {
  const accessToken = localStorage.getItem('access_token');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/posts/${_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      onDelete(_id); // Remove the deleted post from the UI or perform necessary actions
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error state if needed
      alert('Error deleting post');
    }
  };

  return (
    <div className="newsletter-container">
      <img src={image} alt={title} className="newsletter-image" />
      <div className="newsletter-content">
        <h3 className="newsletter-title">{title}</h3>
        <div className="newsletter-buttons">
          <Link to={`/article/${_id}`} className="newsletter-button">
            View article
          </Link>
         {/*  <button
            className={`newsletter-button ${!accessToken ? 'hidden' : ''}`}
            onClick={handleDelete} // Remove passing _id to handleDelete
          >
            Delete post
  </button> */}
        </div>
      </div>
    </div>
  );
};

Newsletter.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Newsletter;
