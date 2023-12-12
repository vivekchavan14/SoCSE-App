import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import '../Signup/SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false); // Initialize redirect as a boolean

  const register = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert('User registered successfully');
        setRedirect(true);
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className='signup-form'>
      <h1>Sign Up</h1>
      <form onSubmit={register}>
        <input
          type='text'
          placeholder='Email'
          id='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type='submit'>Sign Up</button>
      </form>
      <div>
        <p>Already have an account?</p>
        <Link to='/signin'>Sign In</Link>
      </div>
    </div>
  );
}

export default SignUp;
