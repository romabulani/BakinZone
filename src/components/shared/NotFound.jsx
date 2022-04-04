import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex-column-center middle-content">
      <img
        className="img-responsive"
        src="https://res.cloudinary.com/dtrjdcrme/image/upload/v1649009736/ecommerce/404Image_s8lokh.webp"
      />
      <p className="large-font-size heading4">We couldn't find any matches!</p>
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
