import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useData } from "contexts";
import { getVideos, uploadVideoInServer } from "services";

function useUploadVideoHandler() {
  const { state, dispatch } = useData();
  const navigate = useNavigate();
  const { authToken } = useAuth();
  function youtube_parser(url) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }
  const initialUploadState = {
    videoUrl: "",
    title: "",
    category: "Cakes",
    description: "",
  };

  const initialUploadErrorState = {
    videoUrl: "",
    title: "",
    category: "",
    description: "",
  };

  const uploadReducer = (state, action) => {
    switch (action.type) {
      case "VIDEO_URL":
        return {
          ...state,
          videoUrl: action.payload,
        };
      case "VIDEO_TITLE":
        return {
          ...state,
          title: action.payload,
        };
      case "VIDEO_DESCRIPTION":
        return {
          ...state,
          description: action.payload,
        };
      case "VIDEO_CATEGORY":
        return {
          ...state,
          category: action.payload,
        };
    }
  };

  const uploadErrorReducer = (state, action) => {
    switch (action.type) {
      case "ERROR_VIDEO_URL":
        return {
          ...state,
          videoUrl: action.payload,
        };
      case "ERROR_VIDEO_TITLE":
        return {
          ...state,
          title: action.payload,
        };
      case "ERROR_VIDEO_DESCRIPTION":
        return {
          ...state,
          description: action.payload,
        };
      case "ERROR_VIDEO_CATEGORY":
        return {
          ...state,
          category: action.payload,
        };
    }
  };

  const [uploadErrorData, uploadErrorDispatch] = useReducer(
    uploadErrorReducer,
    initialUploadErrorState
  );
  const [uploadData, uploadDispatch] = useReducer(
    uploadReducer,
    initialUploadState
  );

  const checkValidation = () => {
    let uploadFlag = true;

    const tempId = youtube_parser(uploadData.videoUrl);
    if (!tempId) {
      uploadErrorDispatch({
        type: "ERROR_VIDEO_URL",
        payload: "Invalid Youtube URL",
      });
      uploadFlag = false;
    }
    if (!uploadData.title.trim().length > 0) {
      uploadErrorDispatch({
        type: "ERROR_VIDEO_TITLE",
        payload: "Invalid title",
      });
      uploadFlag = false;
    }

    if (!uploadData.description.trim().length > 0) {
      uploadErrorDispatch({
        type: "ERROR_VIDEO_DESCRIPTION",
        payload: "Invalid description",
      });
      uploadFlag = false;
    }

    if (!uploadData.category.trim().length > 0) {
      uploadErrorDispatch({
        type: "ERROR_VIDEO_CATEGORY",
        payload: "Please select category",
      });
      uploadFlag = false;
    }

    return { tempId, uploadFlag };
  };

  const uploadVideoHandler = async (e, setUploadModal) => {
    e.preventDefault();
    const { tempId, uploadFlag } = checkValidation();
    if (uploadFlag) {
      const isVideoPresent = state.videos.filter(
        (video) => video._id === tempId
      );
      if (isVideoPresent.length > 0) {
        toast.info("Video already exists!");
        navigate(`/videos/${tempId}`);
      } else {
        let response = await uploadVideoInServer(authToken, {
          ...uploadData,
          _id: tempId,
          viewCount: 0,
          uploadDate: Date.now(),
          uploaded: true,
        });
        dispatch({
          type: "SET_UPLOADED_VIDEOS",
          payload: {
            uploadedVideos: response.uploadedVideos,
          },
        });
        response = await getVideos();
        dispatch({
          type: "SET_VIDEOS",
          payload: {
            videos: response.videos,
          },
        });
        setUploadModal(false);
      }
    }
  };

  return {
    uploadData,
    uploadDispatch,
    uploadErrorData,
    uploadErrorDispatch,
    uploadVideoHandler,
  };
}

export { useUploadVideoHandler };
