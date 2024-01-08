import { useState, useEffect } from 'react';
import Newsletter from '../Newsletter/Newsletter.jsx';
import './NewsletterList.css';

const NewsletterList = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/posts/post')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then(articlesData => {
        setArticles(articlesData);
        setFilteredArticles(articlesData); // Initially set filtered articles to all articles
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || article.category === selectedCategory)
    );
    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory, articles]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryClick = category => {
    setSelectedCategory(category === selectedCategory ? '' : category);
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
        <div className='categories'>
          <div className='category-buttons-scroll'>
            <div className='category-buttons'>
              {['All', 'literature', 'sport', 'co-curricular', 'events', 'achievements', 'technical', 'other'].map((category, index) => (
                <button
                  key={index}
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className='cards'>
          {filteredArticles.map(article => (
            <Newsletter
              key={article._id} // Use _id instead of id
              _id={article._id} // Pass _id as the article ID
              title={article.title}
              image={article.cover} // Assuming cover is the image field
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsletterList;
