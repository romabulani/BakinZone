import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./videos.css";
function VideoCard({ video }) {
  return (
    <div className="video-card">
      <div className="video-img-container">
        <img
          src={`https://i.ytimg.com/vi/${video._id}/0.jpg`}
          alt="video-thumbnail"
          className="video-thumbnail"
        ></img>
      </div>
      <div className="title-and-options">
        <span className="video-title">{video.title}</span>
        <FontAwesomeIcon icon="ellipsis-vertical" />
      </div>
      <div className="video-category">{video.category}</div>
    </div>
  );
}

export { VideoCard };
