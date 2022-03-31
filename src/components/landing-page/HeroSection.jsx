import { useData } from "contexts";
import { Link } from "react-router-dom";
import "./landingpage.css";

function HeroSection() {
  const { state, dispatch } = useData();

  return (
    <div className="flex-column middle-content">
      <div className="hero-section flex-row-center">
        <div className="hero-text-container flex-column">
          <div className="hero-text flex-column">
            <p className="hero-para">Learn And Bake</p>
            <p>
              Do you love Baking and thinking where to start? You are at the
              right place. Learn Baking by Watching Videos.
            </p>
          </div>
          <Link
            className="btn btn-primary no-link-decoration inline-flex-center hero-btn"
            to="/videos"
          >
            Explore Now
          </Link>
        </div>
        <div className="hero-img-container">
          <img
            src="https://res.cloudinary.com/dtrjdcrme/image/upload/v1648652873/video%20library/heroimg.webp"
            className="hero-img"
            alt="hero-img"
          />
        </div>
      </div>

      <div className="categories-container flex-column-center">
        {state.categories.slice(1).map((category, index) => (
          <div key={category._id}>
            <div
              className={`flex-row-center category-container ${
                index % 2 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="category-img-container ">
                <img
                  src={category.imgUrl}
                  className="hero-img"
                  alt="category-img"
                />
              </div>
              <div className="flex-column category-text">
                <p className="category-para">{category.title}</p>
                <p>{category.subTitle}</p>
                <Link
                  className="btn btn-primary no-link-decoration inline-flex-center category-btn"
                  to="/videos"
                  onClick={() => {
                    dispatch({
                      type: "CATEGORY",
                      payload: { category: category.categoryName },
                    });
                  }}
                >
                  Check Now
                </Link>
              </div>
            </div>
            {index !== 4 && <hr className="section-line"></hr>}
          </div>
        ))}
      </div>
    </div>
  );
}

export { HeroSection };
