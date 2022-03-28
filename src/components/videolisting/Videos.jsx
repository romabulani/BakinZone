import { useData } from "contexts";
import "./videos.css";
import { VideoCard } from "./VideoCard";
import { Outlet } from "react-router-dom";

function Videos() {
  const { state, dispatch } = useData();

  const dispatchHandler = (category) => {
    dispatch({ type: "CATEGORY", payload: { category: category } });
  };

  function getFilteredVideos() {
    if (state.category === "All") return state.videos;
    else
      return state.videos.filter(
        (perVideo) => perVideo.category === state.category
      );
  }

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
              onClick={() => dispatchHandler(category.categoryName)}
            >
              {category.categoryName}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-row-center">
        <div className="videos-container">
          {getFilteredVideos().map((video) => (
            <VideoCard video={video} key={video._id}></VideoCard>
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export { Videos };
