import "./nav.css";
import logo from "assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth, useData } from "contexts";

function Navigation() {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const { searchBarText, setSearchBarText, dispatch } = useData();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchBarText.trim().length > 0) {
      dispatch({
        type: "SET_SEARCH_TEXT",
        payload: { searchText: searchBarText },
      });
      navigate({
        pathname: "/videos",
        search: `query=${searchBarText.trim()}`,
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

      <form onSubmit={searchHandler} className="searchbar-container">
        <input
          type="search"
          placeholder="Search for videos.."
          className="nav-search-field"
          value={searchBarText}
          onChange={(e) => setSearchBarText(e.target.value)}
        />
        <button className="btn-no-decoration text-white" type="submit">
          <FontAwesomeIcon icon="magnifying-glass" className="search-icon" />
        </button>
      </form>

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
