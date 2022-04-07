import { useAuth, useData } from "contexts";
import { useNavigate } from "react-router-dom";
import {
  getAllVideosInHistoryFromServer,
  addVideoToHistoryInServer,
  deleteAllVideosFromHistoryInServer,
  deleteVideoFromHistoryInServer,
  getAllLikedVideosFromServer,
  addVideoToLikedVideosInServer,
  deleteVideoFromLikedVideosInServer,
  getWatchLaterVideosFromServer,
  addVideoToWatchLaterVideosInServer,
  deleteVideoFromWatchLaterVideosInServer,
} from "services";

function useVideoOperations() {
  const { authToken, setAuthToken, setAuthUser } = useAuth();
  const { state, dispatch, setPlaylistModal } = useData();
  const navigate = useNavigate();

  function resetFunction() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setAuthToken("");
    setAuthUser(null);
    dispatch({ type: "SET_NOTES", payload: { notes: [] } });
    setPlaylistModal(false);
    navigate("/login");
  }

  const getAllVideosInHistory = async () => {
    try {
      const response = await getAllVideosInHistoryFromServer(authToken);
      dispatch({
        type: "SET_HISTORY",
        payload: { history: response.history },
      });
    } catch (e) {
      resetFunction();
    }
  };

  const addVideoToHistory = async (video) => {
    const inHistory = state.history.filter(
      (eachVideo) => eachVideo._id === video._id
    );
    if (inHistory.length === 0) {
      try {
        const response = await addVideoToHistoryInServer(authToken, video);
        dispatch({
          type: "SET_HISTORY",
          payload: { history: response.history },
        });
      } catch (e) {
        resetFunction();
      }
    }
  };

  const deleteVideoFromHistory = async (e, videoId, setDisable) => {
    setDisable(true);
    e.preventDefault();
    try {
      const response = await deleteVideoFromHistoryInServer(authToken, videoId);
      dispatch({
        type: "SET_HISTORY",
        payload: { history: response.history },
      });
    } catch (e) {
      resetFunction();
      setDisable(false);
    }
  };

  const deleteAllVideosFromHistory = async (setDisable) => {
    setDisable(true);

    try {
      const response = await deleteAllVideosFromHistoryInServer(authToken);
      dispatch({
        type: "SET_HISTORY",
        payload: { history: response.history },
      });
    } catch (e) {
      resetFunction();
    } finally {
      setDisable(false);
    }
  };

  const getAllLikedVideos = async () => {
    try {
      const response = await getAllLikedVideosFromServer(authToken);
      dispatch({
        type: "SET_LIKED_VIDEOS",
        payload: { likes: response.likes },
      });
    } catch (e) {
      resetFunction();
    }
  };

  const addVideoToLikedVideos = async (video, setDisable) => {
    setDisable(true);
    try {
      const response = await addVideoToLikedVideosInServer(authToken, video);
      dispatch({
        type: "SET_LIKED_VIDEOS",
        payload: { likes: response.likes },
      });
    } catch (e) {
      resetFunction();
    } finally {
      setDisable(false);
    }
  };

  const deleteVideoFromLikedVideos = async (e, videoId, setDisable) => {
    setDisable(true);
    e.preventDefault();
    try {
      const response = await deleteVideoFromLikedVideosInServer(
        authToken,
        videoId
      );
      dispatch({
        type: "SET_LIKED_VIDEOS",
        payload: { likes: response.likes },
      });
    } catch (e) {
      resetFunction();
      setDisable(false);
    }
  };

  const isLiked = (videoId) =>
    state.likes.find((video) => video._id === videoId);

  const getWatchLaterVideos = async () => {
    try {
      const response = await getWatchLaterVideosFromServer(authToken);
      dispatch({
        type: "SET_WATCH_LATER",
        payload: { watchLater: response.watchlater },
      });
    } catch (e) {
      resetFunction();
    }
  };

  const addVideoToWatchLaterVideos = async (e, video, setDisable) => {
    setDisable(true);
    try {
      const response = await addVideoToWatchLaterVideosInServer(
        authToken,
        video
      );
      dispatch({
        type: "SET_WATCH_LATER",
        payload: { watchLater: response.watchlater },
      });
    } catch (e) {
      resetFunction();
    } finally {
      setDisable(false);
    }
  };

  const deleteVideoFromWatchLaterVideos = async (e, videoId, setDisable) => {
    setDisable && setDisable(true);
    e.preventDefault();
    try {
      const response = await deleteVideoFromWatchLaterVideosInServer(
        authToken,
        videoId
      );
      dispatch({
        type: "SET_WATCH_LATER",
        payload: { watchLater: response.watchlater },
      });
    } catch (e) {
      resetFunction();
    } finally {
      setDisable && setDisable(false);
    }
  };

  const inWatchLater = (videoId) => {
    const filteredVideos = state.watchLater.filter(
      (video) => video._id === videoId
    );
    return !(filteredVideos.length === 0);
  };

  return {
    getAllVideosInHistory,
    addVideoToHistory,
    deleteVideoFromHistory,
    deleteAllVideosFromHistory,
    getAllLikedVideos,
    addVideoToLikedVideos,
    deleteVideoFromLikedVideos,
    isLiked,
    getWatchLaterVideos,
    addVideoToWatchLaterVideos,
    deleteVideoFromWatchLaterVideos,
    inWatchLater,
    resetFunction,
  };
}

export { useVideoOperations };
