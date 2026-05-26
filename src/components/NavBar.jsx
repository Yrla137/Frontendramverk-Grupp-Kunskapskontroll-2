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

  return (
    <nav className="main-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/explore" className="nav-link">
            Explore
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/quests" className="nav-link">
            Quests
          </NavLink>
        </li>
      </ul>

      <NavLink
        // to={
        // isLoggedIn && currentUser?.id
        //   ? `/profile/${currentUser.id}`
        //   : "/profile"
        // }
        // aria-label={isLoggedIn ? "Open profile" : "Go to login"}
      >
        <FontAwesomeIcon icon={faUser} />
      </NavLink>
    </nav>
  );
};

export default NavBar;