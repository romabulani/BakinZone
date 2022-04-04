import { useState } from "react";
import { Link } from "react-router-dom";
import { CommonVideoCard, Sidebar } from "components";
import { useData } from "contexts";
import { useVideoOperations } from "hooks";

function History() {
  const { state } = useData();
  const { deleteAllVideosFromHistory } = useVideoOperations();
  const [disable, setDisable] = useState(false);
  return (
    <div className="middle-content">
      <Sidebar />
      <div className="flex-column">
        <div className="flex-row-justify-space-between">
          <div className="flex-column-start">
            <div className="large-font-size">History</div>
            <div>{`${state.history.length} video(s)`}</div>
          </div>
          {state.history.length > 0 && (
            <button
              className="btn btn-link btn-link-error btn-fit-content no-link-decoration"
              disabled={disable}
              onClick={() => deleteAllVideosFromHistory(setDisable)}
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
          <Link
            className="btn btn-primary no-link-decoration inline-flex-center"
            to="/videos"
          >
            Explore
          </Link>
        </div>
      )}
    </div>
  );
}

export { History };
