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

  const deleteVideoFromHistory = async (e, videoId, setDisable) => {
    setDisable(true);
    e.preventDefault();
    try {
      const response = await deleteVideoFromHistoryInServer(authToken, videoId);
      dispatch({
        type: "SET_HISTORY",
        payload: { history: response.history },
      });
    } finally {
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
    } finally {
      setDisable(false);
    }
  };

  const getAllLikedVideos = async () => {
    const response = await getAllLikedVideosFromServer(authToken);
    dispatch({
      type: "SET_LIKED_VIDEOS",
      payload: { likes: response.likes },
    });
  };

  const addVideoToLikedVideos = async (video, setDisable) => {
    setDisable(true);
    try {
      const response = await addVideoToLikedVideosInServer(authToken, video);
      dispatch({
        type: "SET_LIKED_VIDEOS",
        payload: { likes: response.likes },
      });
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
    } finally {
      setDisable(false);
    }
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
    } finally {
      setDisable(false);
    }
  };

  const deleteVideoFromWatchLaterVideos = async (e, videoId, setDisable) => {
    e.preventDefault();
    setDisable(true);
    try {
      const response = await deleteVideoFromWatchLaterVideosInServer(
        authToken,
        videoId
      );
      dispatch({
        type: "SET_WATCH_LATER",
        payload: { watchLater: response.watchlater },
      });
    } finally {
      setDisable(false);
    }
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
