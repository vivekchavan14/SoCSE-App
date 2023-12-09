import { useState } from 'react';
import Newsletter from '../Newsletter/Newsletter.jsx';
import '../NewsletterList/NewsletterList.css'

const NewsletterList = () => {
  const initialArticles = [
    {
      id: 1,
      title: 'News Article 1',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      title: 'News Article 2',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      title: 'News Article 3',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const [articles, setArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    const filteredArticles = initialArticles.filter(article =>
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
