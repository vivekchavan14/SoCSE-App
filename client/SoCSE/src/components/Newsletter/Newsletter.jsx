import React from 'react';
import PropTypes from 'prop-types';
import '../Newsletter/Newsletter.css'

const Newsletter = ({ title, image }) => {
  return (
    <div className="newsletter-container">
      <img src={image} alt={title} className="newsletter-image" />
      <h3 className="newsletter-title">{title}</h3>
      <button className="newsletter-button" onClick={() => { alert(`View article ${title}`) }}>View article</button>
    </div>
  );
};

Newsletter.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Newsletter;
