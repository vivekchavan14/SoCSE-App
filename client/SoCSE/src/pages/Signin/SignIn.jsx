import { useContext, useState } from 'react';
import '../Signin/SignIn.css'
import {Navigate, Link} from 'react-router-dom'
import { UserContext } from '../../components/ContextAPI/userContext';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false); 
  const {setUserInfo} = useContext(UserContext);

  function handleLogin(event) {
    event.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          response.json().then(userInfo => { 
            setUserInfo(userInfo)
            setRedirect(true);
          })
         
        } else {
          alert('Login failed');
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        
      });
  }

  if (redirect) {
    return <Navigate to={'/'} />; // Redirect to the home page or any desired route
  }


  return (
    <div>
        <div className='signin-form'>
      <h1>Sign In</h1>
      <form onSubmit={handleLogin}>
        <input type='text' placeholder='Email' id='email'   onChange={event => setEmail(event.target.value)}/>
        <input type='password' placeholder='Password' id='password' onChange={event => setPassword(event.target.value)} />
        <button type='submit'>Sign In</button>
      </form>
      <div>
        <p>Dont have an account?</p>
        <Link to='/signup'>Sign Up</Link>
      </div>
      </div>
    </div>
  );
}

export default SignIn;
