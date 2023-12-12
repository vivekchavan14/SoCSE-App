import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../ContextAPI/userContext.jsx';
import '../Header/Header.css';

function Header() {
  const [error, setError] = useState(null);
  const { userInfo, setUserInfo } = useContext(UserContext); 

  useEffect(() => {
    fetch('http://localhost:5000/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch user info');
      })
      .then(userInfo => {
        setUserInfo(userInfo); 
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        setError('Failed to fetch user info');
      });
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          setUserInfo(null); 
        } else {
          throw new Error('Failed to logout');
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
        setError('Failed to logout');
      });
  }

  return (
    <div className='header-bar'>
      <header>
        <div className='logo'>
          <Link to='/' className='Logo'>
           <div className='logoSO'><div> <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-awd-mDSSm-S4D50ic2DeXqhh0nES9DtHxwRFlqBtUQ&s"
              alt="Logo"
              className="logo-image"
            /></div>
            <div> SoCSE-Newsletter </div></div>
          </Link>
        </div>
        <div className='Navigation'>
          <nav>
            {error || !userInfo ? (
              <>
                <Link to='/signin'>Login</Link>
                <Link to='/signup'>Register</Link>
              </>
            ) : (
              <>
                <Link to='/create'>Add Post</Link>
                <button onClick={logout}>Logout</button>
              </>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
