import { CommonVideoCard, Sidebar } from "components";
import { useData } from "contexts";
import { Link } from "react-router-dom";

function LikedVideos() {
  const { state } = useData();

  return (
    <div className="middle-content">
      <Sidebar />
      <div className="flex-column">
        <div className="flex-column-start">
          <div className="large-font-size">Liked Videos</div>
          <div>{`${state.likes.length} video(s)`}</div>
        </div>

        <div className="flex-row-center">
          <div className="videos-container">
            {state.likes.map((video) => (
              <CommonVideoCard
                video={video}
                playlistCategory="likedVideo"
                key={video._id}
              ></CommonVideoCard>
            ))}
          </div>
        </div>
      </div>
      {state.likes.length === 0 && (
        <div className="flex-column-center margin-container no-playlist-container">
          <div>No liked videos.</div>
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

export { LikedVideos };
