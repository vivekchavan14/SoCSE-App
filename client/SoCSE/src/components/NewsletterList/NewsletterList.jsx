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
        setFilteredArticles(articlesData);
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

  const handleDelete = async id => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Access token not found');
      }
  
      const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
  
      // Update state after successful deletion
      setArticles(prevArticles => prevArticles.filter(article => article._id !== id));
      setFilteredArticles(prevFilteredArticles => prevFilteredArticles.filter(article => article._id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };
  

  return (
    <div className='News'>
      <input
        type='text'
        placeholder='Search News Articles...'
        value={searchTerm}
        onChange={handleSearch}
      />
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
            key={article._id}
            _id={article._id}
            title={article.title}
            image={article.cover}
            onDelete={() => handleDelete(article._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsletterList;