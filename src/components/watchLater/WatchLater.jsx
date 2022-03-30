import { CommonVideoCard } from "components";
import { useData } from "contexts";
import { Link } from "react-router-dom";

function WatchLater() {
  const { state } = useData();
  return (
    <>
      <div className="flex-column">
        <div className="flex-column-start">
          <div className="large-font-size">Watch Later</div>
          <div>{`${state.watchLater.length} video(s)`}</div>
        </div>

        <div className="flex-row-center">
          <div className="videos-container">
            {state.watchLater.map((video) => (
              <CommonVideoCard
                video={video}
                playlistCategory="watchLater"
                key={video._id}
              ></CommonVideoCard>
            ))}
          </div>
        </div>
      </div>
      {state.watchLater.length === 0 && (
        <div className="flex-column-center margin-container no-playlist-container">
          <div>No saved videos.</div>
          <Link
            className="btn btn-primary no-link-decoration inline-flex-center"
            to="/videos"
          >
            Explore
          </Link>
        </div>
      )}
    </>
  );
}

export { WatchLater };
