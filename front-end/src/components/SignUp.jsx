import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8081/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const contentType = response.headers.get('Content-Type');
        const data = contentType && contentType.includes('application/json') 
          ? await response.json() 
          : null;
        console.log('User registered successfully!', data);
      } else {
        const contentType = response.headers.get('Content-Type');
        const error = contentType && contentType.includes('application/json')
          ? await response.json()
          : { message: 'Unknown error occurred' };
        console.error('Error:', error);
        alert('Error during registration: ' + error.message);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error: Unable to reach the server.');
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("/image/WhatsApp Image 2025-01-02 at 14.53.13_9f51d0fb (1).jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  
  const formContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  };
  

  const burgerIconStyle = {
    width: '55px',
    height: 'auto',
    marginBottom: '20px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const headingStyle = {
    color: '#FFA500',
    fontSize: '36px',
    marginBottom: '20px'
  };

  const inputWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: '15px',
  };

  const labelStyle = {
    fontSize: '16px',
    color: '#333',
    marginBottom: '5px',
    alignSelf: 'flex-start',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    marginTop: '5px',
    boxSizing: 'border-box', 
  };

  const buttonStyle = {
    backgroundColor: '#FFA500',
    color: '#fff',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    width: '100%',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <img
          src="/image/burger-icon-cartoon-hamburger-fast-food-symbol_80590-14811.jpg"
          alt="Burger Icon"
          style={burgerIconStyle}
        />
        <h1 style={headingStyle}>Food Recipe</h1>
        <h2 style={{ color: '#FFA500', fontSize: '24px', marginBottom: '20px' }}>Sign Up</h2>

        <form id="signup-form" onSubmit={handleSubmit}>
          <div style={inputWrapperStyle}>
            <label htmlFor="email" style={labelStyle}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={inputWrapperStyle}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={inputWrapperStyle}>
            <label htmlFor="confirm-password" style={labelStyle}>Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/sign-in" style={{ color: '#FFA500' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
