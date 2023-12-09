import React from 'react';
import '../Profile/Profile.css'

function Profile() {
  

  return (
    <div className='profile-container'>
      <h1 className='profile-title'>Profile</h1>

      <form className='profile-form'>
        <input type='text' placeholder='Username' id='username' />
        <input type='email' placeholder='Email' id='email' />
        <input type='password' placeholder='Password' id='password' />
        <button className='update-profile-btn'>Update profile</button>
      </form>

      <div className='profile-actions'>
        <span className='delete-account'>Delete Account</span>
        <span className='sign-out'>Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
