import { useData } from "contexts";
import "./videos.css";
import { VideoCard } from "./VideoCard";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sidebar } from "components";

function Videos() {
  const { state, dispatch, setSearchBarText } = useData();
  const { search } = useLocation();
  const [searchedVideos, setSearchedVideos] = useState([]);

  const getSearchedVideos = () => {
    let filteredVideos = [];
    // To get the string after = in URL
    const query = decodeURIComponent(search.split("=")[1]);
    filteredVideos = state.videos.filter(
      (video) =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchedVideos(filteredVideos);
    setSearchBarText("");
  };

  useEffect(() => {
    if (search.length > 0) getSearchedVideos();
  }, [search]);

  const dispatchHandler = (category) => {
    dispatch({ type: "CATEGORY", payload: { category } });
  };

  function getFilteredVideos() {
    let filteredVideos = [];
    if (state.category === "All") filteredVideos = state.videos;
    else
      filteredVideos = state.videos.filter(
        (perVideo) => perVideo.category === state.category
      );

    return filteredVideos;
  }

  return (
    <div className="middle-content">
      <Sidebar />
      {!search && (
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
          <div className="flex-row-center">
            <div className="videos-container">
              {getFilteredVideos().map((video) => (
                <VideoCard video={video} key={video._id}></VideoCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {search && searchedVideos.length > 0 && (
        <div className="flex-column">
          <div className="flex-column-center search-header">
            <div>
              {`Search Results for "${state.searchText}" - ${searchedVideos.length} videos`}
            </div>
          </div>
          <div className="flex-row-center">
            <div className="videos-container">
              {searchedVideos.map((video) => (
                <VideoCard video={video} key={video._id}></VideoCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {search && searchedVideos.length === 0 && (
        <div className="flex-row-center">
          <div className="margin-container flex-column-center padding-top-8">
            {`No Search Results found for "${state.searchText}"`}
            <Link
              className="btn btn-primary no-link-decoration inline-flex-center"
              to="/videos"
            >
              Explore
            </Link>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export { Videos };
