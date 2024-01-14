// Article.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import './Article.css';

const Article = () => {
  const { id } = useParams();
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
  }, [id]);

  if (!article) {
    return <div className='loading'>Loading...</div>;
  }

  const imageUrl = article.cover && article.cover.data
  ? `data:${article.cover.contentType};base64,${Buffer.from(article.cover.data).toString('base64')}`
  : '';


  return (
    <div className="article-container">
      <h1 className="article-title">{article.title}</h1>
      <img src={imageUrl} alt={article.title} className="article-cover" />
      <p className="article-summary">{article.summary}</p>
      <div className="article-content">{article.content}</div>
    </div>
  );
};

Article.propTypes = {
  title: PropTypes.string,
  cover: PropTypes.shape({
    data: PropTypes.string,
    contentType: PropTypes.string,
  }),
  summary: PropTypes.string,
  content: PropTypes.string,
};

export default Article;
