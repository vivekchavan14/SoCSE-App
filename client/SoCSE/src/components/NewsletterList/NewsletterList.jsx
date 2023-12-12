import { useState, useEffect } from 'react';
import Newsletter from '../Newsletter/Newsletter.jsx';
import '../NewsletterList/NewsletterList.css';

const NewsletterList = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/post')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(articlesData => {
        setArticles(articlesData);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    const filteredArticles = articles.filter(article =>
      article.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setArticles(filteredArticles);
  };

  return (
    <div className='News'>
      <div className='NewsL'>
        <div>
          <input
            type="text"
            placeholder="Search News Articles..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className='cards'>
          {articles.map(article => (
            <Newsletter
              key={article.id}
              title={article.title}
              image={article.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsletterList;
