import React, { useState, useEffect } from 'react';
import './Article.css'; // Update the path to your CSS file

const Article = ({ match }) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleId = match.params.id;
        const response = await fetch(`http://localhost:8000/api/posts/post/${articleId}`);
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
  }, [match.params.id]);

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
