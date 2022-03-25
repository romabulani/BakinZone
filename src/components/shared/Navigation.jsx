import "./nav.css";
import logo from "assets/images/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navigation() {
  return (
    <nav className="nav-container">
      <div className="brand">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="muffin-logo" className="logo" />
          </Link>
        </div>
        <Link to="/" className="brand-name">
          Bakin Zone
        </Link>
      </div>
      <div className="searchbar-container" aria-label="search">
        <input
          type="search"
          placeholder="Search for videos.."
          className="nav-search-field"
        />
        <FontAwesomeIcon icon="magnifying-glass" className="search-icon" />
      </div>
      <div className="profile-icon">
        <FontAwesomeIcon icon="user" className="search-icon" />
      </div>
    </nav>
  );
}

export { Navigation };
