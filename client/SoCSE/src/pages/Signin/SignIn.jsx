import { useState } from 'react';
import '../Signin/SignIn.css'

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission here, for example:
    console.log('Form submitted:', formData);
    // You can perform API calls or any other action based on the form data.
  };

  return (
    <div>
        <div className='signin-form'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Email' id='email' value={formData.email} onChange={handleChange} />
        <input type='password' placeholder='Password' id='password' value={formData.password} onChange={handleChange} />
        <button type='submit'>Sign In</button>
      </form>
      <div>
        <p>Dont have an account?</p>
        {/*<Link to='/signup'>Sign Up</Link>*/}
      </div>
      </div>
    </div>
  );
}

export default SignIn;
