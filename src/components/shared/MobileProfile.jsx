import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Sidebar } from "components";
import "./nav.css";

function MobileProfile() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => window.innerWidth > 640 && navigate("/account");
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="middle-content">
      <Sidebar />

      <div className="mobile-nav-options flex-column">
        <Link to="/liked" className="sidebar-item">
          <FontAwesomeIcon icon="thumbs-up" className="sidebar-icon" />
          <span>Liked</span>
        </Link>

        <Link to="/history" className="sidebar-item">
          <FontAwesomeIcon icon="clock-rotate-left" className="sidebar-icon" />
          <span>History</span>
        </Link>

        <Link to="/watchlater" className="sidebar-item">
          <FontAwesomeIcon icon="clock" className="sidebar-icon" />
          <span>Watch Later</span>
        </Link>

        <Link to="/account" className="sidebar-item">
          <FontAwesomeIcon icon="user" className="sidebar-icon" />
          <span>Your Account</span>
        </Link>
      </div>
    </div>
  );
}

export { MobileProfile };
