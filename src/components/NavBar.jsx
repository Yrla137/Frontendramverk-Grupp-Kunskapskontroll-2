import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./NavBar.css";

const NavBar = () => {
  // import props isLoggedIn and currentUser

  // Auth/user state will likely later come from Context,
  // global auth state or backend authentication instead of props.

  // May be replaced by if (!currentUser) return; inside the function later on when we have real user data,
  // but for now it serves the purpose of showing the profile icon for both logged in and logged out users, and navigating to either the profile page or login page when clicked.

  const getNavLinkClass = ({ isActive }) =>
  isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="main-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/explore" className={getNavLinkClass}>
            Explore
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/quests" className={getNavLinkClass}>
            Quests
          </NavLink>
        </li>
      </ul>
      <NavLink
        to="/profile"
        className="profile-link"
        aria-label="Go to profile or login"
      >
        <FontAwesomeIcon icon={faUser} />
      </NavLink>
    </nav>
  );
};

export default NavBar;

      // to={
        // isLoggedIn && currentUser?.id
        //   ? `/profile/${currentUser.id}`
        //   : "/profile"
        // }
        // aria-label={isLoggedIn ? "Open profile" : "Go to login"}