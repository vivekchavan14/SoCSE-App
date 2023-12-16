// Header.js

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../ContextAPI/userContext.jsx';
import { motion } from 'framer-motion';
import './Header.css';

function Header() {
  const [error, setError] = useState(null);
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:5000/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch user info');
      })
      .then((userInfo) => {
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
        setError('Failed to fetch user info');
      });
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => {
        if (response.ok) {
          setUserInfo(null);
        } else {
          throw new Error('Failed to logout');
        }
      })
      .catch((error) => {
        console.error('Error logging out:', error);
        setError('Failed to logout');
      });
  }

  const headerVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.5 } },
  };

  const childVariant = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  };
  
  return (
    <motion.div className='header-bar' initial='initial' animate='animate' variants={headerVariants}>
      <header className='header'>
        <div className='logo'>
          <Link to='/' className='Logo'>
            <div className='logoSO'>
              <div>
                {' '}
                <motion.img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-awd-mDSSm-S4D50ic2DeXqhh0nES9DtHxwRFlqBtUQ&s'
                  alt='Logo'
                  className='logo-image'
                  initial='initial'
                  animate='animate'
                  variants={navItemVariants}
                />
              </div>
              <div> SoCSE-Newsletter </div>
            </div>
          </Link>
        </div>
        <motion.div className='Navigation' initial='initial' animate='animate' variants={headerVariants}>
        <nav>
            {error || !userInfo ? (
              <>
                <motion.div variants={childVariant}>
                  <Link to='/signin'>Login</Link>
                </motion.div>
                <motion.div variants={childVariant}>
                  <Link to='/signup'>Register</Link>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div variants={childVariant}>
                  <Link to='/create'>Add Post</Link>
                </motion.div>
                <motion.div variants={childVariant}>
                  <button onClick={logout}>Logout</button>
                </motion.div>
              </>
            )}
          </nav>
        </motion.div>
      </header>
    </motion.div>
  );
}

export default Header;
