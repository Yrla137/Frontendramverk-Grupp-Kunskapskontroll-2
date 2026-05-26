import styles from './Profile.module.css';
import { useAuth } from '../../context/AuthContext';
import Login from './Login'; 

const Profile = () => {
  const { currentUser, isLoggedIn, logout } = useAuth(); 

  // Redirect to login form if user is not authenticated
  if (!isLoggedIn) {
    return <Login />;
  }

  // Map database data to user profile
  const userData = {
    username: currentUser.username,
    title: "Space Explorer",
    points: currentUser.points || 0,
    streak: currentUser.streak_count || 0,
    badges: [
      { id: 1, name: "First Step", icon: "🚀", earned: true },
      { id: 2, name: "Mars Expert", icon: "🔴", earned: false },
      { id: 3, name: "Black Hole", icon: "🌌", earned: false },
      { id: 4, name: "Stargazer", icon: "✨", earned: false },
      { id: 5, name: "APOD Collector", icon: "📸", earned: false }
    ]
  };

  // Generate avatar based on the real username
  const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${userData.username}&backgroundColor=0B0D17`;

  return (
    <div className={styles.profileContainer}>
      
      {/* Profile Header */}
      <section className={`${styles.headerCard} card`}>
        <img src={avatarUrl} alt="User Avatar" className={styles.avatar} />
        <div className={styles.userInfo}>
          <h2>{userData.username}</h2>
          <p className={styles.userTitle}>{userData.title}</p>
          <button 
            onClick={logout} 
            style={{marginTop: '10px', padding: '5px 10px', background: 'transparent', color: 'var(--secondary-mars-rust)', border: '1px solid var(--secondary-mars-rust)', borderRadius: '5px', cursor: 'pointer'}}
          >
            Log Out
          </button>
        </div>
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

    </div>
  );
};

export default Profile;