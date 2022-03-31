import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./video.css";
import { useAuth, useData } from "contexts";
import { faClock, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { RiPlayListAddFill } from "react-icons/ri";
import { useVideoOperations } from "hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Sidebar } from "components";

function Video() {
  const params = useParams();
  const { state, setPlaylistModal, setCurrentVideo } = useData();
  const [disableLike, setDisableLike] = useState(false);
  const [disableWatchLater, setDisableWatchLater] = useState(false);

  const { authToken } = useAuth();
  const {
    addVideoToHistory,
    isLiked,
    addVideoToLikedVideos,
    deleteVideoFromLikedVideos,
    addVideoToWatchLaterVideos,
    inWatchLater,
    deleteVideoFromWatchLaterVideos,
  } = useVideoOperations();

  const video = state.videos.find((video) => video._id === params.videoId);

  useEffect(() => setCurrentVideo(video), [video]);
  const likeHandler = (e, video) =>
    isLiked(video._id)
      ? deleteVideoFromLikedVideos(e, video._id, setDisableLike)
      : addVideoToLikedVideos(video, setDisableLike);

  const watchLaterHandler = (e, video) =>
    inWatchLater(video._id)
      ? deleteVideoFromWatchLaterVideos(e, video._id, setDisableWatchLater)
      : addVideoToWatchLaterVideos(e, video, setDisableWatchLater);

  const copyHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info("Link Copied");
  };

  return (
    <div className="middle-content">
      <Sidebar />
      {video && (
        <div className="flex-row-justify-space-around margin-container video-and-notes">
          <div className="video-content flex-column">
            <div className="single-video-container">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${video._id}`}
                controls
                width="100%"
                height="100%"
                onStart={() => {
                  if (authToken) addVideoToHistory(video);
                }}
              />
            </div>
            <div className="video-description">
              <div className="keyword hashtag">{`#${video.category}`}</div>
              <div className="video-title">{video.title}</div>
              <div className="video-buttons">
                <span
                  className="chip category-chip"
                  style={{ pointerEvents: disableLike ? "none" : "auto" }}
                  onClick={(e) => !disableLike && likeHandler(e, video)}
                >
                  {isLiked(video._id) ? (
                    <FontAwesomeIcon
                      icon="thumbs-up"
                      className="p-right-5 keyword"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faThumbsUp} className="p-right-5" />
                  )}
                  Like
                </span>
                <span
                  className="chip category-chip"
                  onClick={(e) =>
                    !disableWatchLater && watchLaterHandler(e, video)
                  }
                >
                  {inWatchLater(video._id) ? (
                    <FontAwesomeIcon
                      icon="clock"
                      className="p-right-5 keyword"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faClock} className="p-right-5" />
                  )}
                  Watch Later
                </span>
                <span
                  className="chip category-chip icon-chip"
                  onClick={() => setPlaylistModal(true)}
                >
                  <div className="icon-chip">
                    <RiPlayListAddFill />
                  </div>
                  <span className="p-left-5">Save</span>
                </span>
                <span className="chip category-chip" onClick={copyHandler}>
                  <FontAwesomeIcon icon="share-alt" className="p-right-5" />
                  Copy Link
                </span>
              </div>
            </div>
          </div>

          <div className="add-note-container">
            <div>Notes</div>
            <div>
              <input
                placeholder="Title.."
                className="input-primary input-full-width"
              />
            </div>
            <div>
              <textarea
                placeholder="Description.."
                className="input-primary input-full-width input-height-8"
              />
            </div>
            <div className="flex-row-justify-start add-note-btns">
              <button className="btn btn-primary btn-fit-content">Save</button>
              <button className="btn btn-outline-primary btn-fit-content">
                Discard
              </button>
            </div>
            <div className="added-notes-container">
              <div className="added-note">
                <p className="added-note-header">Lorem ipsum dolor sit</p>
                <p className="added-note-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat velit itaque eos consequuntur quos cum, nihil aliquid
                  vero, veritatis, necessitatibus non nobis beatae perspiciatis.
                </p>
                <p>
                  <FontAwesomeIcon icon="clock" />
                </p>
                <div className="flex-row-justify-start">
                  <FontAwesomeIcon icon="pen" />
                  <FontAwesomeIcon icon="trash" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { Video };
