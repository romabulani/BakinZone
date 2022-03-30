import "components/playlists/playlists.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlaylistOperations, useVideoOperations } from "hooks";
import { Link } from "react-router-dom";

function CommonVideoCard({ video, playlistCategory }) {
  const { removeVideoFromPlaylist } = usePlaylistOperations();
  const {
    deleteVideoFromHistory,
    deleteVideoFromLikedVideos,
    deleteVideoFromWatchLaterVideos,
  } = useVideoOperations();

  const onClickDeleteHandler = (e) => {
    if (playlistCategory === "likedVideo")
      deleteVideoFromLikedVideos(e, video._id);
    else if (playlistCategory === "watchHistory")
      deleteVideoFromHistory(e, video._id);
    else if (playlistCategory === "watchLater")
      deleteVideoFromWatchLaterVideos(e, video._id);
    else removeVideoFromPlaylist(e, playlistCategory, video._id);
    setDisable(false);
  };

  return (
    <div className="video-card playlist-card">
      <Link to={`/videos/${video._id}`} className="no-link-decoration">
        <div className="video-img-container">
          <img
            src={`https://i.ytimg.com/vi/${video._id}/0.jpg`}
            alt="video-thumbnail"
            className="video-thumbnail"
          ></img>
        </div>
        <div className="title-and-options playlist-title">
          <span>{video.title}</span>
          <button
            onClick={(e) => onClickDeleteHandler(e)}
            className="btn-no-decoration"
          >
            <FontAwesomeIcon
              icon="trash"
              className="delete-icon large-font-size"
            />
          </button>
        </div>
      </Link>
    </div>
  );
}

export { CommonVideoCard };
