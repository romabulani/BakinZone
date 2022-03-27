import "components/playlists/playlists.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlaylistOperations } from "hooks";
import { useData } from "contexts";

function CommonVideoCard({ video, playlistCategory }) {
  const { removeVideoFromPlaylist } = usePlaylistOperations();
  const { setCurrentVideo } = useData();
  const onClickDeleteHandler = (e) => {
    setCurrentVideo(video);
    removeVideoFromPlaylist(e, playlistCategory);
  };

  return (
    <div className="video-card playlist-card" key={video._id}>
      {/* Below comment will be used in further PRs */}
      {/* <Link to={`/videos/${video._id}`} className="no-link-decoration"> */}
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
      {/* </Link> */}
    </div>
  );
}

export { CommonVideoCard };
