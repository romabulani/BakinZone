// This file contains all the Playlist operations

import { useAuth, useData } from "contexts";
import {
  addPlaylistToServer,
  getAllPlaylistsFromServer,
  addVideoToPlaylistInServer,
  removeVideoFromPlaylistInServer,
  deletePlaylistInServer,
} from "services";

function usePlaylistOperations() {
  const { authToken } = useAuth();
  const { dispatch, currentVideo, state } = useData();

  const getAllPlaylists = async () => {
    const response = await getAllPlaylistsFromServer(authToken);
    dispatch({
      type: "PLAYLIST_OPERATION",
      payload: { playlists: response.playlists },
    });
  };

  const addPlaylist = async (e, name) => {
    e.target.disabled = true;
    const playlist = { name };
    const response = await addPlaylistToServer(authToken, playlist);
    e.target.disabled = false;
    dispatch({
      type: "PLAYLIST_OPERATION",
      payload: { playlists: response.playlists },
    });
    return response.playlists[response.playlists.length - 1];
  };

  const addVideoToPlaylist = async (e, playlistId) => {
    e.target.disabled = true;
    const response = await addVideoToPlaylistInServer(
      authToken,
      playlistId,
      currentVideo
    );
    e.target.disabled = false;
    const newPlaylists = state.playlists.reduce(
      (acc, curr) =>
        curr._id === response.playlist._id
          ? [...acc, response.playlist]
          : [...acc, curr],
      []
    );
    // Note : Response has playlist and NOT playlists, wrong in MOCKBEE (for reference)
    dispatch({
      type: "PLAYLIST_OPERATION",
      payload: { playlists: newPlaylists },
    });
  };

  const removeVideoFromPlaylist = async (e, playlistId) => {
    e.target.disabled = true;
    const response = await removeVideoFromPlaylistInServer(
      authToken,
      playlistId,
      currentVideo._id
    );
    e.target.disabled = false;
    const newPlaylists = state.playlists.reduce(
      (acc, curr) =>
        curr._id === response.playlist._id
          ? [...acc, response.playlist]
          : [...acc, curr],
      []
    );
    dispatch({
      type: "PLAYLIST_OPERATION",
      payload: { playlists: newPlaylists },
    });
  };

  const deletePlaylist = async (e, playlistId) => {
    e.target.disabled = true;
    const response = await deletePlaylistInServer(authToken, playlistId);
    e.target.disabled = false;
    dispatch({
      type: "PLAYLIST_OPERATION",
      payload: { playlists: response.playlists },
    });
  };
  return {
    getAllPlaylists,
    addPlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
  };
}

export { usePlaylistOperations };
