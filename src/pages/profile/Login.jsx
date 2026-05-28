import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth(); 

  const usernameRef = useRef(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [isLoginMode]);

  // login / Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }
    
    if (username.includes(' ')) {
      setError('Username cannot contain spaces.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    // --------------------------------

    const endpoint = isLoginMode ? '/api/login' : '/api/register';
    
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (isLoginMode) {
        // If logging in, save user and token to ontext
        login(data.user, data.token);
      } else {
        // If registering, switch to login mode so they can log in
        setIsLoginMode(true);
        alert('Account created successfully! You can now log in.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Google Login Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    try {
      // send google to backend
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Google login failed on server');
      }

      // save user and token
      login(data.user, data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container} className="card">
      <h2 style={{ color: 'var(--primary-cosmic-cyan)' }}>
        {isLoginMode ? 'Log In' : 'Register New Astronaut'}
      </h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ref={usernameRef}
          style={styles.input}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        
        {error && <p style={{ color: 'var(--secondary-mars-rust)' }}>{error}</p>}
        
        <button type="submit" style={styles.button} className="neon-hover">
          {isLoginMode ? 'Log In' : 'Create Account'}
        </button>
      </form>

      {/* Google section */}
      <div style={styles.divider}>
        <span style={styles.dividerLine}></span>
        <span style={styles.dividerText}>OR</span>
        <span style={styles.dividerLine}></span>
      </div>

      <div style={styles.googleContainer}>
        <GoogleLogin 
          onSuccess={handleGoogleSuccess}
          onError={() => setError('Google Login Failed')}
          theme="filled_black"
          shape="pill"
        />
      </div>

      <p style={{ marginTop: '1.5rem', color: 'var(--text-nebula-gray)' }}>
        {isLoginMode ? 'No Account? ' : 'Already have an account? '}
        <span 
          style={{ color: 'var(--success-stardust-gold)', cursor: 'pointer' }}
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode ? 'Create Account!' : 'Log In!'}
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: '4rem auto', textAlign: 'center', padding: '2rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' },
  input: { padding: '0.8rem', borderRadius: 'var(--border-radius-sm)', border: 'none', backgroundColor: 'var(--bg-void-black)', color: 'white' },
  button: { padding: '0.8rem', backgroundColor: 'var(--primary-cosmic-cyan)', color: 'black', border: 'none', borderRadius: 'var(--border-radius-sm)', fontWeight: 'bold', cursor: 'pointer' },
  divider: { display: 'flex', alignItems: 'center', margin: '1.5rem 0' },
  dividerLine: { flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' },
  dividerText: { margin: '0 1rem', color: 'var(--text-nebula-gray)', fontSize: '0.9rem' },
  googleContainer: { display: 'flex', justifyContent: 'center' }
};

export default Login;