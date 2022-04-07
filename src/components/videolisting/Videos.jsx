import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "components";
import { useData } from "contexts";
import { VideoCard } from "./VideoCard";
import "./videos.css";

function Videos() {
  const { state, dispatch, setSearchBarText } = useData();
  const { search } = useLocation();
  const [query, setQuery] = useState("");
  const getSearchedVideos = () =>
    state.videos.filter(
      (video) =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.category.toLowerCase().includes(query.toLowerCase())
    );

  useEffect(() => {
    if (search.length > 0) {
      // To get the string after = in URL
      setQuery(decodeURIComponent(search.split("=")[1]));
      setSearchBarText("");
    }
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
    if (state.sortBy === "latest")
      filteredVideos.sort(
        (a, b) =>
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      );
    return filteredVideos;
  }

  return (
    <div className="middle-content">
      <Sidebar />
      {!search && (
        <>
          <div className="margin-container flex-column-start">
            <button
              className="btn btn-link btn-link-primary btn-fit-content no-link-decoration text-white "
              onClick={() =>
                state.sortBy === "none" &&
                dispatch({ type: "SORT_BY", payload: { sortBy: "latest" } })
              }
            >
              Sort By Latest
            </button>
          </div>
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
        </>
      )}

      {search && getSearchedVideos().length > 0 && (
        <div className="flex-column">
          <div className="flex-column-center search-header">
            <div>
              {`Search Results for "${query}" - ${
                getSearchedVideos().length
              } videos`}
            </div>
          </div>
          <div className="flex-row-center">
            <div className="videos-container">
              {getSearchedVideos().map((video) => (
                <VideoCard video={video} key={video._id}></VideoCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {search && getSearchedVideos().length === 0 && (
        <div className="flex-row-center">
          <div className="margin-container flex-column-center padding-top-8">
            {`No Search Results found for "${query}"`}
            <Link
              className="btn btn-primary no-link-decoration inline-flex-center"
              to="/videos"
            >
              Explore
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export { Videos };
