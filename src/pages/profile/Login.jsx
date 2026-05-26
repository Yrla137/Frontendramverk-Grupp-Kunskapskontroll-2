import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

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
        login(data.user, data.token);
      } else {
        setIsLoginMode(true);
        alert('Account created successfully! You can now log in.');
      }
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

      <p style={{ marginTop: '1rem', color: 'var(--text-nebula-gray)' }}>
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
  button: { padding: '0.8rem', backgroundColor: 'var(--primary-cosmic-cyan)', color: 'black', border: 'none', borderRadius: 'var(--border-radius-sm)', fontWeight: 'bold', cursor: 'pointer' }
};

export default Login;