import {NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";

// impost icons here

const NavBar = ({ isLoggedIn, currentUser }) => {
  // Only temporarly using isLoggedIn and currentUser as props for example purposes, will likely be moved to Context or backend-auth later on.

  const navigate = useNavigate();

  const handleProfileClick = (profile) => {
    isLoggedIn
    ? navigate(`/profile/${profile.id}`)
    : navigate("/login");
  };

  // May be replaced by if (!currentUser) return; inside the function later on when we have real user data,
  // but for now it serves the purpose of showing the profile icon for both logged in and logged out users, and navigating to either the profile page or login page when clicked.

  return (
    <nav className="main-nav">
        <ul className="nav-list">
          <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li className="nav-item"><NavLink to="/explore" className="nav-link">Explore</NavLink></li>
          <li className="nav-item"><NavLink to="/quests" className="nav-link">Quests</NavLink></li>
        </ul>

      <div onClick = {() => handleProfileClick(currentUser)}>
        {/* Icon Image here */}
      </div>
    </nav>
  )
}

export default NavBar
