import { useData } from "contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./videos.css";
import { VideoCard } from "./VideoCard";

function Videos() {
  const { state, dispatch } = useData();
  return (
    <>
      <div>
        <div className="categories">
          {state.categories.map((category) => (
            <span
              className={`chip category-chip ${
                category.categoryName === state.category
                  ? "active-category"
                  : null
              }`}
              key={category._id}
            >
              {category.categoryName}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-row-center">
        <div className="videos-container">
          {state.videos.map((video) => (
            <VideoCard video={video} key={video._id}></VideoCard>
          ))}
        </div>
      </div>
    </>
  );
}

export { Videos };
