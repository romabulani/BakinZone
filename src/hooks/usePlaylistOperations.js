// This file contains all the Playlist operations
import { useAuth, useData } from "contexts";
import {
  addPlaylistToServer,
  getAllPlaylistsFromServer,
  addVideoToPlaylistInServer,
  removeVideoFromPlaylistInServer,
  deletePlaylistInServer,
} from "services";
import { useVideoOperations } from "./useVideoOperations";

function usePlaylistOperations() {
  const { authToken } = useAuth();
  const { dispatch, currentVideo, state } = useData();

  const { resetFunction } = useVideoOperations();

  const getAllPlaylists = async () => {
    try {
      const response = await getAllPlaylistsFromServer(authToken);
      dispatch({
        type: "SET_PLAYLISTS",
        payload: { playlists: response.playlists },
      });
    } catch (e) {
      resetFunction();
    }
  };

  const addPlaylist = async (name, setDisable) => {
    setDisable(true);
    try {
      const playlist = { name };
      const response = await addPlaylistToServer(authToken, playlist);
      dispatch({
        type: "SET_PLAYLISTS",
        payload: { playlists: response.playlists },
      });
      return response.playlists[response.playlists.length - 1];
    } catch (e) {
      resetFunction();
    } finally {
      setDisable(false);
    }
  };

  const addVideoToPlaylist = async (playlistId, setDisable) => {
    setDisable(true);
    try {
      const response = await addVideoToPlaylistInServer(
        authToken,
        playlistId,
        currentVideo
      );
      dispatch({
        type: "SET_PLAYLISTS",
        payload: { playlists: response.playlists },
      });
    } catch (e) {
      resetFunction();
    } finally {
      setDisable(false);
    }
  };

  const removeVideoFromPlaylist = async (
    e,
    playlistId,
    setDisable,
    currVideoId
  ) => {
    e.preventDefault();
    setDisable(true);
    let response;
    try {
      if (currVideoId)
        response = await removeVideoFromPlaylistInServer(
          authToken,
          playlistId,
          currVideoId
        );
      else
        response = await removeVideoFromPlaylistInServer(
          authToken,
          playlistId,
          currentVideo._id
        );
      dispatch({
        type: "SET_PLAYLISTS",
        payload: { playlists: response.playlists },
      });
    } catch (e) {
      resetFunction();
      setDisable(false);
    }
  };

  const deletePlaylist = async (e, playlistId, setDisable) => {
    e.preventDefault();
    setDisable(true);
    try {
      const response = await deletePlaylistInServer(authToken, playlistId);
      dispatch({
        type: "SET_PLAYLISTS",
        payload: { playlists: response.playlists },
      });
    } catch (e) {
      resetFunction();
      setDisable(false);
    }
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
