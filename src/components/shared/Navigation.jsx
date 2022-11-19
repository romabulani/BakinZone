import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth, useData, useTheme } from "contexts";
import logo from "assets/images/logo.png";
import "./nav.css";

function Navigation() {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const { searchBarText, setSearchBarText, dispatch } = useData();
  const { theme, switchTheme } = useTheme();
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
            <img
              src={
                theme === "dark"
                  ? logo
                  : "https://res.cloudinary.com/dtrjdcrme/image/upload/v1649076577/ecommerce/logo_sr3h5w.webp"
              }
              alt="muffin-logo"
              className="logo"
            />
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
      <div className="flex-row-center nav-right-icons">
        <button
          className="btn-no-decoration cursor-pointer text-white"
          onClick={switchTheme}
        >
          <FontAwesomeIcon
            icon={theme === "light" ? "moon" : "sun"}
            className="search-icon"
          />
        </button>
        <div
          className="profile-icon"
          onClick={() =>
            authToken ? navigate("/account") : navigate("/login")
          }
        >
          <FontAwesomeIcon icon="user" className="search-icon" />
        </div>
      </div>
    </nav>
  );
}

export { Navigation };
