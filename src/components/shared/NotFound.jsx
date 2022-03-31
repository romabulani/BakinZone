import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex-column-center middle-content">
      <p className="large-font-size">We couldn't find any matches!</p>
      <p>Please try searching something else.</p>
      <div className="flex-row-center">
        <Link
          to="/"
          className="btn btn-outline-primary no-link-decoration btn-fit-content"
        >
          Home
        </Link>
        <Link
          to="/videos"
          className="btn btn-primary no-link-decoration btn-fit-content"
        >
          Explore
        </Link>
      </div>
    </div>
  );
}

export { NotFound };
