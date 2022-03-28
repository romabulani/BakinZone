import "./nav.css";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiPlayListAddFill } from "react-icons/ri";

function Sidebar() {
  return (
    <>
      <aside className="sidebar">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "sidebar-item sidebar-active" : "sidebar-item"
          }
        >
          <FontAwesomeIcon icon="home" className="sidebar-icon" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/videos"
          className={({ isActive }) =>
            isActive ? "sidebar-item sidebar-active" : "sidebar-item"
          }
        >
          <FontAwesomeIcon icon="compass" className="sidebar-icon" />
          <span>Explore</span>
        </NavLink>

        <NavLink
          to="/playlists"
          className={({ isActive }) =>
            isActive ? "sidebar-item sidebar-active" : "sidebar-item"
          }
        >
          <div className="icon-chip">
            <RiPlayListAddFill />
            <span className="p-left-12">Playlists</span>
          </div>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "sidebar-item sidebar-active" : "sidebar-item"
          }
        >
          <FontAwesomeIcon icon="thumbs-up" className="sidebar-icon" />
          <span>Liked</span>
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? "sidebar-item sidebar-active" : "sidebar-item"
          }
        >
          <FontAwesomeIcon icon="clock-rotate-left" className="sidebar-icon" />
          <span>History</span>
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "sidebar-item sidebar-active" : "sidebar-item"
          }
        >
          <FontAwesomeIcon icon="clock" className="sidebar-icon" />
          <span>Watch Later</span>
        </NavLink>
      </aside>
      <div className="mobile-bottom-nav">
        <Link to="/videos" className="mobile-nav-item">
          <div className="mobile-nav-item">
            <FontAwesomeIcon icon="home" className="bottom-icon" />
            <span>Home</span>
          </div>
        </Link>

        <Link to="/videos" className="mobile-nav-item">
          <div className="mobile-nav-item">
            <FontAwesomeIcon icon="compass" className="bottom-icon" />
            <span>Explore</span>
          </div>
        </Link>

        <Link to="/playlists" className="mobile-nav-item">
          <div className="mobile-nav-item">
            <div className="icon-chip">
              <RiPlayListAddFill />
            </div>
            <span>Playlists</span>
          </div>
        </Link>
        <Link to="/profile" className="mobile-nav-item">
          <div className="mobile-nav-item">
            <FontAwesomeIcon icon="user" className="bottom-icon" />
            <span>Profile</span>
          </div>
        </Link>
      </div>
    </>
  );
}

export { Sidebar };
