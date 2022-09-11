import { useAuth, useData } from "contexts";
import { usePlaylistOperations, useVideoOperations } from "hooks";
import React, { useEffect, useState } from "react";
import "./playlistModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PlaylistModal() {
  const { state, playlistModal, setPlaylistModal, currentVideo } = useData();
  const { addPlaylist, removeVideoFromPlaylist, addVideoToPlaylist } =
    usePlaylistOperations();
  const {
    inWatchLater,
    addVideoToWatchLaterVideos,
    deleteVideoFromWatchLaterVideos,
  } = useVideoOperations();
  const [newPlaylist, setNewPlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [watchLaterOption, setWatchLaterOption] = useState(false);
  const [disableWatchLater, setDisableWatchLater] = useState(false);
  const [disableCheckbox, setDisableCheckbox] = useState(false);
  const [disableCreate, setDisableCreate] = useState(false);
  const navigate = useNavigate();
  const { authToken } = useAuth();

  const createPlaylistHandler = (e) => {
    e.preventDefault();
    const filteredPlaylists = state.playlists.filter(
      (playlist) => playlistName === playlist.name
    );
    if (filteredPlaylists.length === 0) {
      addPlaylist(playlistName, setDisableCreate);
      setNewPlaylist(false);
    } else toast.info("Playlist already exists");
  };

  const location = useLocation();

  useEffect(() => {
    // Added to customise modal as per the route
    location.pathname === "/videos"
      ? setWatchLaterOption(true)
      : setWatchLaterOption(false);
  }, [location]);

  const isVideoInPlaylist = (playlist) => {
    const filteredVideos = playlist?.videos?.filter(
      (playlistVideo) => playlistVideo._id === currentVideo._id
    );
    return filteredVideos?.length === 1;
  };

  const videoInPlaylistHandler = (e, playlist) =>
    isVideoInPlaylist(playlist)
      ? removeVideoFromPlaylist(e, playlist._id, setDisableCheckbox)
      : addVideoToPlaylist(playlist._id, setDisableCheckbox);

  return (
    <div
      className={`modal-wrapper ${
        playlistModal ? "display-block" : "display-none"
      }`}
    >
      <div className="playlist-modal">
        <div className="flex-row-spacebetween">
          <div className="playlist playlist-header">
            <div>Save to...</div>
          </div>
          <FontAwesomeIcon
            icon="close"
            className="close-btn"
            onClick={() => {
              setNewPlaylist(false);
              setPlaylistModal(false);
            }}
          />
        </div>

        <div className="playlists-container">
          {watchLaterOption && (
            <>
              <input
                type="checkbox"
                id="watchLater"
                checked={inWatchLater(currentVideo._id)}
                className="p-right-5"
                disabled={disableWatchLater}
                onChange={(e) =>
                  inWatchLater(currentVideo._id)
                    ? deleteVideoFromWatchLaterVideos(
                        e,
                        currentVideo._id,
                        setDisableWatchLater
                      )
                    : addVideoToWatchLaterVideos(
                        e,
                        currentVideo,
                        setDisableWatchLater
                      )
                }
              />
              <label htmlFor="watchLater" className="checkbox-label">
                Watch Later
              </label>
            </>
          )}

          {state.playlists.map((playlist) => (
            <div key={playlist._id} className="playlist">
              <input
                type="checkbox"
                id={playlist._id}
                checked={isVideoInPlaylist(playlist)}
                className="p-right-5"
                disabled={disableCheckbox}
                onChange={(e) => videoInPlaylistHandler(e, playlist)}
              />
              <label htmlFor={playlist._id} className="checkbox-label">
                {playlist.name}{" "}
              </label>
            </div>
          ))}
        </div>

        {newPlaylist ? (
          <form onSubmit={(e) => createPlaylistHandler(e)}>
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
                type="submit"
                className={`btn btn-primary btn-dark-theme ${
                  playlistName === "" ? "disabled-cursor" : ""
                }`}
                disabled={playlistName === "" || disableCreate}
              >
                Create
              </button>
            </div>
          </form>
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
