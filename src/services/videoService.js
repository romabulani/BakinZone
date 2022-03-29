import axios from "axios";
import { toast } from "react-toastify";

const getAllVideosInHistoryFromServer = async (authorization) => {
  try {
    const response = await axios.get("/api/user/history", {
      headers: { authorization },
    });
    if (response.status === 200) return response.data;
    else throw new Error();
  } catch (e) {
    console.log(
      "getAllVideosInHistoryFromServer : Error in fetching history details",
      e
    );
  }
};

const addVideoToHistoryInServer = async (authorization, video) => {
  try {
    const response = await axios.post(
      "/api/user/history",
      { video },
      {
        headers: { authorization },
      }
    );
    if (response.status === 201) return response.data;
    else throw new Error();
  } catch (e) {
    console.log(
      "addVideoInHistoryInServer : Error in adding video to History",
      e
    );
  }
};

const deleteVideoFromHistoryInServer = async (authorization, videoId) => {
  try {
    const response = await axios.delete(`/api/user/history/${videoId}`, {
      headers: { authorization },
    });
    if (response.status === 200) {
      toast.success("Video deleted from History");
      return response.data;
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't delete playlist! Try again.`);
    console.log(
      "deleteVideoFromHistoryInServer : Error in deleting video from History",
      e
    );
  }
};

const deleteAllVideosFromHistoryInServer = async (authorization) => {
  try {
    const response = await axios.delete("/api/user/history/all", {
      headers: { authorization },
    });
    if (response.status === 200) {
      toast.success("History cleared");
      return response.data;
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't clear history`);
    console.log(
      "deleteVideoFromHistoryInServer : Error in deleting video from History",
      e
    );
  }
};

const getAllLikedVideosFromServer = async (authorization) => {
  try {
    const response = await axios.get("/api/user/likes", {
      headers: { authorization },
    });
    if (response.status === 200) return response.data;
    else throw new Error();
  } catch (e) {
    console.log(
      "getAllLikedVideosFromServer : Error in fetching liked videos.",
      e
    );
  }
};

const addVideoToLikedVideosInServer = async (authorization, video) => {
  try {
    const response = await axios.post(
      "/api/user/likes",
      { video },
      {
        headers: { authorization },
      }
    );
    if (response.status === 201) {
      toast.success("Added to Liked Videos");
      return response.data;
    } else throw new Error();
  } catch (e) {
    console.log(
      "addVideoToLikedVideosInServer : Error in adding video to liked videos",
      e
    );
  }
};

const deleteVideoFromLikedVideosInServer = async (authorization, videoId) => {
  try {
    const response = await axios.delete(`/api/user/likes/${videoId}`, {
      headers: { authorization },
    });
    if (response.status === 200) {
      toast.success("Removed from Liked Videos");
      return response.data;
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't update playlist! Try again.`);
    console.log(
      "deleteVideoFromLikedVideosInServer : Error in deleting video from History",
      e
    );
  }
};

export {
  addVideoToHistoryInServer,
  deleteVideoFromHistoryInServer,
  getAllVideosInHistoryFromServer,
  deleteAllVideosFromHistoryInServer,
  getAllLikedVideosFromServer,
  addVideoToLikedVideosInServer,
  deleteVideoFromLikedVideosInServer,
};
