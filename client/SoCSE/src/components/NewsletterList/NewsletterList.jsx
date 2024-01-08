// NewsletterList.jsx

import { useState, useEffect } from 'react';
import Newsletter from '../Newsletter/Newsletter.jsx';
import './NewsletterList.css'; // Ensure proper CSS styles are imported

const NewsletterList = () => {
  const [articles, setArticles] = useState([  {
    id: 1,
    title: 'Exciting Literature News',
    image: 'https://via.placeholder.com/150x150',
    category: 'literature',
  },
  {
    id: 2,
    title: 'Sports Update',
    image: 'https://via.placeholder.com/150x150',
    category: 'sport',
  },{
    id: 3,
    title: 'Achievements Update',
    image: 'https://via.placeholder.com/150x150',
    category: 'achievements',
  },{
    id: 4,
    title: 'Events Update',
    image: 'https://via.placeholder.com/150x150',
    category: 'events',
  }]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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

  const handleCategoryClick = category => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const filteredArticles = selectedCategory
    ? articles.filter(article => article.category === selectedCategory)
    : articles;

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
