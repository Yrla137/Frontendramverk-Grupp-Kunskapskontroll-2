import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "./NavBar.css";

const NavBar = ({ isLoggedIn }) => {

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
        to={isLoggedIn ? "/profile" : "/login"}
        className={`profile-link ${isLoggedIn ? "logged-in" : "logged-out"}`}
        aria-label="Go to profile or login"
      >
        <FontAwesomeIcon icon={faUser} />
      </NavLink>
    </nav>
  );
};

export default NavBar;