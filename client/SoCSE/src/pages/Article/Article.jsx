// Article.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom'; // Import useParams
import './Article.css';

const Article = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/posts/post/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const articleData = await response.json();
        setArticle(articleData);
      } catch (error) {
        console.error('Error fetching article:', error);
        // Handle error state
      }
    };

    fetchArticle();
  }, [id]); // Use 'id' in the dependency array

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-container">
      <h1 className="article-title">{article.title}</h1>
      <img src={article.cover} alt={article.title} className="article-cover" />
      <p className="article-summary">{article.summary}</p>
      <div className="article-content">{article.content}</div>
      {/* Add any other article details here */}
    </div>
  );
};

export default Article;
