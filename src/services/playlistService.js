import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "utilities";

const getAllPlaylistsFromServer = async (authorization) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/playlists`, {
      headers: { authorization },
    });
    if (response.status === 200) return response.data;
    else throw new Error();
  } catch (e) {
    console.error(
      "getAllPlaylistsFromServer : Error in fetching playlist details",
      e
    );
  }
};

const addPlaylistToServer = async (authorization, playlist) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/user/playlists`,
      { playlist },
      {
        headers: { authorization },
      }
    );
    if (response.status === 201) {
      toast.success("Playlist created successfully");
      return response.data;
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't add Playlist! Try again.`);
    console.error("addPlaylistToServer : Error in adding playlist", e);
  }
};

const addVideoToPlaylistInServer = async (authorization, playlistId, video) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/user/playlists/${playlistId}`,
      { video },
      {
        headers: { authorization },
      }
    );
    if (response.status === 201) {
      toast.success("Video added in Playlist");
      return response.data;
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't add video in playlist! Try again.`);
    console.error(
      "addVideoToPlaylistInServer : Error in adding video to playlist",
      e
    );
  }
};

const removeVideoFromPlaylistInServer = async (
  authorization,
  playlistId,
  videoId
) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/user/playlists/${playlistId}/${videoId}`,
      {
        headers: { authorization },
      }
    );
    if (response.status === 200) {
      toast.success("Video removed from Playlist");
      return response.data;
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't remove video from playlist! Try again.`);
    console.error(
      "removeVideoToPlaylistFromServer : Error in removing video from playlist",
      e
    );
  }
};

const deletePlaylistInServer = async (authorization, playlistId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/user/playlists/${playlistId}`,
      {
        headers: { authorization },
      }
    );
    if (response.status === 200) {
      toast.success("Playlist deleted successfully");
      return response.data;
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't delete playlist! Try again.`);
    console.error("deletePlaylist : Error in deleting playlist", e);
  }
};

export {
  getAllPlaylistsFromServer,
  addPlaylistToServer,
  addVideoToPlaylistInServer,
  removeVideoFromPlaylistInServer,
  deletePlaylistInServer,
};
