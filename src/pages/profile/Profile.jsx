import { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { useAuth } from '../../context/AuthContext';
import Login from './Login'; 

const Profile = () => {
  const { currentUser, isLoggedIn, logout, updateUser } = useAuth(); 

  // Ediit
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    bio: '',
    avatar_url: ''
  });
  const [error, setError] = useState('');

  // query DB on mount
  useEffect(() => {
    if (isLoggedIn && currentUser?.id) {
      fetch(`http://localhost:5000/api/users/${currentUser.id}/profile`)
        .then((res) => {
          if (!res.ok) throw new Error("Could not sync profile with database");
          return res.json();
        })
        .then((freshData) => {

          // Update our global AuthContext and localStorage with the fresh data records
          updateUser(freshData);
        })
        .catch((err) => console.error("Profile sync error:", err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures this triggers only once when the page opens

  // Redirect to login if user is not authenticated
  if (!isLoggedIn) {
    return <Login />;
  }

  // Populate form when the user clicks "Edit Profile"
  const handleEditClick = () => {
    setEditForm({
      username: currentUser.username || '',
      bio: currentUser.bio || '',
      avatar_url: currentUser.avatar_url || ''
    });
    setIsEditing(true);
  };

  // UPDATE
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/users/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      updateUser(editForm);
      setIsEditing(false); 
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("WARNING: Are you sure you want to delete your account? All points and badges will be lost in a black hole!");
    
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${currentUser.id}`, {
          method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete account.');
        logout();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // Map data to user profile for badges and stats
  const userData = {
    username: currentUser.username,
    title: "Space Explorer",
    points: currentUser.points || 0,
    streak: currentUser.streak_count || 0,

    // Read badges from backend if available, otherwise use fallback layout
    badges: currentUser.badges || [
      { id: 1, name: "First Step", icon: "🚀", earned: true },
      { id: 2, name: "Mars Expert", icon: "🔴", earned: false },
      { id: 3, name: "Point Hoarder", icon: "💎", earned: false },
      { id: 4, name: "Streak Master", icon: "🔥", earned: false }
    ]
  };

  const avatarUrl = currentUser.avatar_url || `https://api.dicebear.com/7.x/bottts/svg?seed=${userData.username}&backgroundColor=0B0D17`;

  return (
    <div className={styles.profileContainer}>
      
      {/* Profile Header */}
      <section className={`${styles.headerCard} card`}>
        <img src={avatarUrl} alt="User Avatar" className={styles.avatar} />
        
        {!isEditing ? (

          // READ
          <div className={styles.userInfo}>
            <h2>{userData.username}</h2>
            <p className={styles.userTitle}>{userData.title}</p>
            {currentUser.bio && <p style={{ fontStyle: 'italic', color: 'var(--text-starlight)', marginTop: '0.5rem' }}>"{currentUser.bio}"</p>}
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button onClick={handleEditClick} style={editButtonStyle}>Edit Profile</button>
              <button onClick={logout} style={logoutButtonStyle}>Log Out</button>
            </div>
          </div>
        ) : (

          // UPDATE
          <form onSubmit={handleSaveProfile} style={styles.editForm}>
            <input 
              type="text" 
              value={editForm.username} 
              onChange={(e) => setEditForm({...editForm, username: e.target.value})}
              placeholder="Username"
              style={inputStyle}
              required
            />
            <input 
              type="text" 
              value={editForm.avatar_url} 
              onChange={(e) => setEditForm({...editForm, avatar_url: e.target.value})}
              placeholder="Avatar Image URL (Optional)"
              style={inputStyle}
            />
            <textarea 
              value={editForm.bio} 
              onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
              placeholder="Write a short bio..."
              maxLength={100}
              style={{...inputStyle, resize: 'none', height: '60px'}}
            />
            <small style={{ color: 'var(--text-nebula-gray)' }}>{editForm.bio.length}/100 chars</small>
            
            {error && <p style={{ color: 'var(--secondary-mars-rust)' }}>{error}</p>}
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" style={saveButtonStyle}>Save</button>
              <button type="button" onClick={() => setIsEditing(false)} style={cancelButtonStyle}>Cancel</button>
            </div>
          </form>
        )}
      </section>

      {/* Stats Section */}
      <section className={styles.statsGrid}>
        <div className={`${styles.statBox} card`}>
          <span className={styles.statValue}>{userData.points}</span>
          <span className={styles.statLabel}>Exp. Points</span>
        </div>
        <div className={`${styles.statBox} card`}>
          <span className={styles.statValue}>{userData.streak} 🔥</span>
          <span className={styles.statLabel}>Day Streak</span>
        </div>
      </section>

      {/* Badges / Achievements */}
      <section className="card">
        <h3>Achievements</h3>
        <p>Explore more to unlock new badges!</p>
        
        <div className={styles.badgesGrid}>
          {userData.badges.map((badge) => (
            <div 
              key={badge.id} 
              className={`${styles.badge} ${badge.earned ? styles.earned : ''}`}
            >
              <span className={styles.badgeIcon}>{badge.icon}</span>
              <span className={styles.badgeName}>{badge.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Danger Zone */}
      <section className="card" style={{ border: '1px solid var(--secondary-mars-rust)', marginTop: '2rem' }}>
        <h3 style={{ color: 'var(--secondary-mars-rust)' }}>Danger Zone</h3>
        <p style={{ marginBottom: '1rem' }}>Deleting your account is permanent. This cannot be undone.</p>
        <button onClick={handleDeleteAccount} style={deleteButtonStyle}>Delete Account</button>
      </section>

    </div>
  );
};

const editButtonStyle = { padding: '8px 16px', background: 'var(--primary-cosmic-cyan)', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const logoutButtonStyle = { padding: '8px 16px', background: 'transparent', color: 'var(--text-nebula-gray)', border: '1px solid var(--text-nebula-gray)', borderRadius: '5px', cursor: 'pointer' };
const saveButtonStyle = { padding: '8px 16px', background: 'var(--success-stardust-gold)', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const cancelButtonStyle = { padding: '8px 16px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '5px', cursor: 'pointer' };
const deleteButtonStyle = { padding: '8px 16px', background: 'var(--secondary-mars-rust)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: 'none', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' };

export default Profile;