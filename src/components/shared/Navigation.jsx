import "./nav.css";
import logo from "assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth, useData } from "contexts";

function Navigation() {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const { dispatch, searchBarText, setSearchBarText } = useData();

  const searchHandler = (e, text) => {
    if (text) {
      navigate("/videos");
      dispatch({
        type: "SET_SEARCH_TEXT",
        payload: { searchText: searchBarText },
      });
    }
    if (e.key === "Enter" || e.key === "Backspace" || e.target.value === "") {
      navigate("/videos");
      dispatch({
        type: "SET_SEARCH_TEXT",
        payload: { searchText: e.target.value.trim() },
      });
    }
  };

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
          value={searchBarText}
          onChange={(e) => setSearchBarText(e.target.value)}
          onKeyDown={(e) => searchHandler(e)}
        />
        <FontAwesomeIcon
          icon="magnifying-glass"
          className="search-icon"
          onClick={(e) => searchHandler(e, searchBarText)}
        />
      </div>
      <div
        className="profile-icon"
        onClick={() => (authToken ? navigate("/profile") : navigate("/login"))}
      >
        <FontAwesomeIcon icon="user" className="search-icon" />
      </div>
    </nav>
  );
}

export { Navigation };
