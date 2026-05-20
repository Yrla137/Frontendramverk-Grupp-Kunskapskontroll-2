import {NavLink} from "react-router-dom";


const NavBar = () => {


  return (
    <nav className="main-nav">
        <ul className="nav-list">
          <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
          <li className="nav-item"><NavLink to="/explore" className="nav-link">Explore</NavLink></li>
          <li className="nav-item"><NavLink to="/quests" className="nav-link">Quests</NavLink></li>
        </ul>
    </nav>
  )
}

export default NavBar