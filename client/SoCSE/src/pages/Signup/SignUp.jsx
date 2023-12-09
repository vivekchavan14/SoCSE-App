// SignUp.jsx
import { Link } from 'react';
import { useState } from 'react';
import '../Signup/SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
  };

  return (
    <div className='signup-form'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Email'
          id='email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          value={formData.password}
          onChange={handleChange}
        />
        <button type='submit'>Sign Up</button>
      </form>
      <div>
        <p>Already have an account?</p>
       {/* <Link to='/signin'>Sign In</Link> */}
      </div>
    </div>
  );
}

export default SignUp;
