import styles from './Profile.module.css';

const Profile = () => {
  // Låtsasdata
  const mockUserData = {
    username: "SpaceExplorer_99",
    title: "Junior Astronaut",
    points: 1250,
    streak: 5,
    badges: [
      { id: 1, name: "Första Steget", icon: "🚀", earned: true },
      { id: 2, name: "Mars-Expert", icon: "🔴", earned: true },
      { id: 3, name: "Svart Hål", icon: "🌌", earned: false },
      { id: 4, name: "Stjärnskådare", icon: "✨", earned: false },
      { id: 5, name: "APOD-Samlare", icon: "📸", earned: false }
    ]
  };

  // Genererar en avatar baserat på användarnamnet
  const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${mockUserData.username}&backgroundColor=0B0D17`;

  return (
    <div className={styles.profileContainer}>
      
      {/* Profil Header */}
      <section className={`${styles.headerCard} card`}>
        <img src={avatarUrl} alt="User Avatar" className={styles.avatar} />
        <div className={styles.userInfo}>
          <h2>{mockUserData.username}</h2>
          <p className={styles.userTitle}>{mockUserData.title}</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsGrid}>
        <div className={`${styles.statBox} card`}>
          <span className={styles.statValue}>{mockUserData.points}</span>
          <span className={styles.statLabel}>Exp. Poäng</span>
        </div>
        <div className={`${styles.statBox} card`}>
          <span className={styles.statValue}>{mockUserData.streak} 🔥</span>
          <span className={styles.statLabel}>Dagars Streak</span>
        </div>
      </section>

      {/* Badges / Achievements */}
      <section className="card">
        <h3>Achievements</h3>
        <p>Utforska mer för att låsa upp nya badges!</p>
        
        <div className={styles.badgesGrid}>
          {mockUserData.badges.map((badge) => (
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