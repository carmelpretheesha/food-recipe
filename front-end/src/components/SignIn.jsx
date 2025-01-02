import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch('http://localhost:8081/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const contentType = response.headers.get('Content-Type');
      const isJson = contentType && contentType.includes('application/json');
  
      if (!response.ok) {
        const errorData = isJson ? await response.json() : { message: await response.text() };
        throw new Error(errorData.message || 'Failed to sign in');
      }
  
      const data = isJson ? await response.json() : { message: await response.text() };
  
      console.log('Sign In Successful:', data);
  
      if (isJson && data.token) {
        localStorage.setItem('token', data.token);
      }
      navigate('/home');
    } catch (error) {
      console.error('Sign In Error:', error);
      alert(error.message || 'Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: 'url("/image/WhatsApp Image 2025-01-02 at 14.53.13_9f51d0fb (1).jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    formContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    burgerIcon: {
      width: '55px',
      height: 'auto',
      marginBottom: '20px',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    heading: {
      color: '#FFA500',
      fontSize: '36px',
      marginBottom: '20px',
    },
    inputWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: '15px',
    },
    label: {
      fontSize: '16px',
      color: '#333',
      marginBottom: '5px',
      alignSelf: 'flex-start',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      boxSizing: 'border-box',
    },
    button: {
      backgroundColor: '#FFA500',
      color: '#fff',
      padding: '12px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      width: '100%',
      cursor: 'pointer',
      marginTop: '20px',
    },
    link: {
      color: '#FFA500',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <img
          src="/image/burger-icon-cartoon-hamburger-fast-food-symbol_80590-14811.jpg"
          alt="Burger Icon"
          style={styles.burgerIcon}
        />
        <h1 style={styles.heading}>Food Recipe</h1>
        <h2 style={{ color: '#FFA500', fontSize: '24px', marginBottom: '20px' }}>Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputWrapper}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputWrapper}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p>
          Don't have an account? <a href="/sign-up" style={styles.link}>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
