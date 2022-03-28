import { CommonVideoCard } from "components";
import { useData } from "contexts";
import { useVideoOperations } from "hooks";
import { useNavigate } from "react-router-dom";

function History() {
  const { state } = useData();
  const navigate = useNavigate();
  const { deleteAllVideosFromHistory } = useVideoOperations();
  return (
    <>
      <div className="flex-column">
        <div className="flex-row-justify-space-between">
          <div className="flex-column-start">
            <div className="large-font-size">History</div>
            <div>{`${state.history.length} video(s)`}</div>
          </div>
          {state.history.length > 0 && (
            <button
              className="btn btn-link btn-link-error btn-fit-content"
              onClick={(e) => deleteAllVideosFromHistory(e)}
            >
              Clear History
            </button>
          )}
        </div>

        <div className="flex-row-center">
          <div className="videos-container">
            {state.history.map((video) => (
              <CommonVideoCard
                video={video}
                playlistCategory="watchHistory"
                key={video._id}
              ></CommonVideoCard>
            ))}
          </div>
        </div>
      </div>
      {state.history.length === 0 && (
        <div className="flex-column-center margin-container no-playlist-container">
          <div>No videos watched.</div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/videos")}
          >
            Explore
          </button>
        </div>
      )}
    </>
  );
}

export { History };
