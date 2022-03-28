import { useAuth, useData } from "contexts";
import {
  getAllVideosInHistoryFromServer,
  addVideoToHistoryInServer,
  deleteAllVideosFromHistoryInServer,
  deleteVideoFromHistoryInServer,
} from "services";

function useVideoOperations() {
  const { authToken } = useAuth();
  const { dispatch } = useData();

  const getAllVideosInHistory = async () => {
    const response = await getAllVideosInHistoryFromServer(authToken);
    dispatch({
      type: "HISTORY_OPERATION",
      payload: { history: response.history },
    });
  };

  const addVideoToHistory = async (video) => {
    const response = await addVideoToHistoryInServer(authToken, video);
    dispatch({
      type: "HISTORY_OPERATION",
      payload: { history: response.history },
    });
  };

  const deleteVideoFromHistory = async (e, videoId) => {
    e.target.disabled = true;
    e.preventDefault();
    const response = await deleteVideoFromHistoryInServer(authToken, videoId);
    e.target.disabled = false;

    dispatch({
      type: "HISTORY_OPERATION",
      payload: { history: response.history },
    });
  };

  const deleteAllVideosFromHistory = async (e) => {
    e.target.disabled = true;
    const response = await deleteAllVideosFromHistoryInServer(authToken);
    e.target.disabled = false;
    dispatch({
      type: "HISTORY_OPERATION",
      payload: { history: response.history },
    });
  };

  return {
    getAllVideosInHistory,
    addVideoToHistory,
    deleteVideoFromHistory,
    deleteAllVideosFromHistory,
  };
}

export { useVideoOperations };
