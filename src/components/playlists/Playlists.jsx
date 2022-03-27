import { useData } from "contexts";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./playlists.css";
import { usePlaylistOperations } from "hooks";

function Playlists() {
  const { state } = useData();
  const { deletePlaylist } = usePlaylistOperations();

  const getThumbnail = (playlist) =>
    playlist.videos.length === 0
      ? "https://i.ytimg.com/img/no_thumbnail.jpg"
      : `https://i.ytimg.com/vi/${playlist.videos[0]._id}/0.jpg`;

  const onClickDeleteHandler = (e, playlistId) => deletePlaylist(e, playlistId);

  return (
    <div className="flex-row-center">
      <div className="videos-container">
        <div className="flex-start-column">
          <div className="large-font-size">
            {state.playlists.length} Playlists
          </div>
        </div>
        {state.playlists.map((playlist) => (
          <div className="video-card playlist-card" key={playlist._id}>
            <div className="video-img-container">
              <img
                src={getThumbnail(playlist)}
                alt="video-thumbnail"
                className="video-thumbnail"
              ></img>
              <div className="videos-count-container">
                <div className="large-font-size">
                  {playlist.videos.length === 0 ? "" : playlist.videos.length}
                </div>
                <FontAwesomeIcon
                  icon="clapperboard"
                  className="large-font-size"
                />
              </div>
            </div>
            <div className="title-and-options playlist-title">
              <span className="large-font-size">{playlist.name}</span>
              <FontAwesomeIcon
                icon="trash"
                className="delete-icon large-font-size"
                onClick={(e) => onClickDeleteHandler(e, playlist._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Playlists };
