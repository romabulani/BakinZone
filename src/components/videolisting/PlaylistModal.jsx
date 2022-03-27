import { useAuth, useData } from "contexts";
import { usePlaylistOperations } from "hooks";
import React, { useEffect, useState } from "react";
import "./playlistModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PlaylistModal() {
  const { state, playlistModal, setPlaylistModal, currentVideo } = useData();
  const { addPlaylist, removeVideoFromPlaylist, addVideoToPlaylist } =
    usePlaylistOperations();
  const [newPlaylist, setNewPlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [watchLaterOption, setWatchLaterOption] = useState(false);
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const createPlaylistHandler = (e) => {
    const filteredPlaylists = state.playlists.filter(
      (playlist) => playlistName === playlist.name
    );
    if (filteredPlaylists.length === 0) {
      addPlaylist(e, playlistName);
      setNewPlaylist(false);
    } else toast.info("Playlist already exists");
  };

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/videos") setWatchLaterOption(true);
  }, [location]);

  const isVideoInPlaylist = (playlist) => {
    const filteredVideos = playlist.videos.filter(
      (playlistVideo) => playlistVideo._id === currentVideo._id
    );
    return filteredVideos.length === 1;
  };

  const videoInPlaylistHandler = (e, playlist) =>
    isVideoInPlaylist(playlist)
      ? removeVideoFromPlaylist(e, playlist._id)
      : addVideoToPlaylist(e, playlist._id);

  return (
    <div
      className={`modal-wrapper ${
        playlistModal ? "display-block" : "display-none"
      }`}
    >
      <div className="playlist-modal">
        <div className="flex-row-spacebetween">
          <div className="playlist playlist-header">
            {watchLaterOption && (
              <div className="watch-later">
                <FontAwesomeIcon icon="clock" className="p-right-5" />
                <span className="p-left-5">Add to Watch Later</span>
              </div>
            )}
            <div>Save to...</div>
          </div>
          <FontAwesomeIcon
            icon="close"
            className="close-btn"
            onClick={() => setPlaylistModal(false)}
          />
        </div>

        <div className="playlists-container">
          {state.playlists.map((playlist) => (
            <div key={playlist._id} className="playlist">
              <input
                type="checkbox"
                id={playlist._id}
                checked={isVideoInPlaylist(playlist)}
                className="p-right-5"
                onChange={(e) => videoInPlaylistHandler(e, playlist)}
              />
              <label htmlFor={playlist._id} className="checkbox-label">
                {playlist.name}{" "}
              </label>
            </div>
          ))}
        </div>

        {newPlaylist ? (
          <div className="new-playlist-container">
            <label htmlFor="new-playlist-name">Name</label>
            <input
              type="text"
              id="new-playlist-name"
              placeholder="Enter Playlist Name"
              className="input-primary input-full-width"
              onChange={(e) => setPlaylistName(e.target.value.trim())}
            />
            <button
              onClick={(e) => createPlaylistHandler(e)}
              className={`btn btn-primary btn-dark-theme ${
                playlistName === "" ? "disabled-cursor" : ""
              }`}
              disabled={playlistName === ""}
            >
              Create
            </button>
          </div>
        ) : (
          <div
            className="playlist create-playlist"
            onClick={() => {
              if (authToken) setNewPlaylist(true);
              else {
                setPlaylistModal(false);
                navigate("/login");
              }
            }}
          >
            <span className="p-right-5">
              <FontAwesomeIcon icon="plus" />
            </span>
            Create New Playlist
          </div>
        )}
      </div>
    </div>
  );
}

export { PlaylistModal };
