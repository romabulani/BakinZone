import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "contexts";
import "./videos.css";

function VideoCard({ video }) {
  const { setPlaylistModal, setCurrentVideo } = useData();
  const location = useLocation();
  const [ellipsisIcon, setEllipsisIcon] = useState(false);

  useEffect(() => {
    if (location.pathname === "/videos") setEllipsisIcon(true);
  }, [location]);

  return (
    <div className="video-card">
      <Link to={`/videos/${video._id}`} className="no-link-decoration">
        <div className="video-img-container">
          <img
            src={`https://i.ytimg.com/vi/${video._id}/0.jpg`}
            alt="video-thumbnail"
            className="video-thumbnail"
          ></img>
        </div>
        <div className="title-and-options">
          <span className="video-title">{video.title}</span>
          {ellipsisIcon ? (
            <FontAwesomeIcon
              icon="ellipsis-vertical"
              className="options-icon"
              onClick={(e) => {
                e.preventDefault();
                setPlaylistModal(true);
                setCurrentVideo(video);
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon="trash"
              className="delete-icon large-font-size"
            />
          )}
        </div>
        <div className="video-category">{video.category}</div>
      </Link>
    </div>
  );
}

export { VideoCard };
