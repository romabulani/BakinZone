import { CommonVideoCard } from "components";
import { useData } from "contexts";
import { useNavigate, useParams } from "react-router-dom";

function SinglePlaylist() {
  const params = useParams();
  const { state } = useData();
  const navigate = useNavigate();
  const playlist = state.playlists.filter(
    (playlist) => params.playlistId === playlist._id
  )[0];

  return (
    <>
      {playlist && (
        <div className="flex-column">
          <div className="flex-column-start">
            <div className="large-font-size">{playlist.name}</div>
            <div>{`${playlist.videos.length} video(s)`}</div>
          </div>

          <div className="flex-row-center">
            <div className="videos-container">
              {playlist.videos.map((video) => (
                <CommonVideoCard
                  video={video}
                  playlistCategory={playlist._id}
                  key={video._id}
                ></CommonVideoCard>
              ))}
            </div>
          </div>
        </div>
      )}
      {playlist.videos.length === 0 && (
        <div className="flex-column-center margin-container no-playlist-container">
          <div>There are no videos added in this playlist.</div>
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

export { SinglePlaylist };
