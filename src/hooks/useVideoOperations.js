import { useAuth, useData } from "contexts";
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
  const { authToken } = useAuth();
  const { state, dispatch } = useData();

  const getAllVideosInHistory = async () => {
    const response = await getAllVideosInHistoryFromServer(authToken);
    dispatch({
      type: "SET_HISTORY",
      payload: { history: response.history },
    });
  };

  const addVideoToHistory = async (video) => {
    const response = await addVideoToHistoryInServer(authToken, video);
    dispatch({
      type: "SET_HISTORY",
      payload: { history: response.history },
    });
  };

  const deleteVideoFromHistory = async (e, videoId) => {
    e.preventDefault();
    const response = await deleteVideoFromHistoryInServer(authToken, videoId);

    dispatch({
      type: "SET_HISTORY",
      payload: { history: response.history },
    });
  };

  const deleteAllVideosFromHistory = async (e) => {
    e.target.disabled = true;
    const response = await deleteAllVideosFromHistoryInServer(authToken);
    e.target.disabled = false;
    dispatch({
      type: "SET_HISTORY",
      payload: { history: response.history },
    });
  };

  const getAllLikedVideos = async () => {
    const response = await getAllLikedVideosFromServer(authToken);
    dispatch({
      type: "SET_LIKED_VIDEOS",
      payload: { likes: response.likes },
    });
  };

  const addVideoToLikedVideos = async (e, video) => {
    e.target.disabled = true;
    const response = await addVideoToLikedVideosInServer(authToken, video);
    e.target.disabled = false;
    dispatch({
      type: "SET_LIKED_VIDEOS",
      payload: { likes: response.likes },
    });
  };

  const deleteVideoFromLikedVideos = async (e, videoId) => {
    e.preventDefault();
    const response = await deleteVideoFromLikedVideosInServer(
      authToken,
      videoId
    );

    dispatch({
      type: "SET_LIKED_VIDEOS",
      payload: { likes: response.likes },
    });
  };

  const isLiked = (videoId) =>
    state.likes.find((video) => video._id === videoId);

  const getWatchLaterVideos = async () => {
    const response = await getWatchLaterVideosFromServer(authToken);
    dispatch({
      type: "SET_WATCH_LATER",
      payload: { watchLater: response.watchlater },
    });
  };

  const addVideoToWatchLaterVideos = async (e, video) => {
    e.target.disabled = true;
    const response = await addVideoToWatchLaterVideosInServer(authToken, video);
    e.target.disabled = false;
    dispatch({
      type: "SET_WATCH_LATER",
      payload: { watchLater: response.watchlater },
    });
  };

  const deleteVideoFromWatchLaterVideos = async (e, videoId) => {
    e.preventDefault();
    const response = await deleteVideoFromWatchLaterVideosInServer(
      authToken,
      videoId
    );

    dispatch({
      type: "SET_WATCH_LATER",
      payload: { watchLater: response.watchlater },
    });
  };

  const inWatchLater = (videoId) =>
    state.watchLater.find((video) => video._id === videoId);

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
  };
}

export { useVideoOperations };
