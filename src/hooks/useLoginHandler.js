import { useAuth, useData } from "contexts";
import { useNavigate } from "react-router-dom";

import {
  getAllPlaylistsFromServer,
  postLoginData,
  getAllVideosInHistoryFromServer,
  getAllLikedVideosFromServer,
  getWatchLaterVideosFromServer,
} from "services";

function useLoginHandler() {
  const { setAuthToken, setAuthUser } = useAuth();
  const { dispatch } = useData();
  const navigate = useNavigate();
  const loginHandler = async (e, setLoginData, setErrorData, loginData) => {
    if (e) e.preventDefault();
    try {
      let response;
      if (e && e.target.innerText === "Login as Guest") {
        setLoginData({
          email: "adarshbalika@gmail.com",
          password: "adarshBalika123",
        });
        response = await postLoginData(
          "adarshbalika@gmail.com",
          "adarshBalika123"
        );
      } else
        response = await postLoginData(loginData.email, loginData.password);

      const user = JSON.stringify(response.foundUser);
      const tokenResponse = response.encodedToken;
      setAuthToken(tokenResponse);
      setAuthUser(response.foundUser);
      localStorage.setItem("authToken", tokenResponse);
      localStorage.setItem("authUser", user);
      response = await getAllPlaylistsFromServer(tokenResponse);
      dispatch({
        type: "SET_PLAYLISTS",
        payload: { playlists: response.playlists },
      });
      response = await getAllVideosInHistoryFromServer(tokenResponse);
      dispatch({
        type: "SET_HISTORY",
        payload: { history: response.history },
      });
      response = await getAllLikedVideosFromServer(tokenResponse);
      dispatch({
        type: "SET_LIKED_VIDEOS",
        payload: { likes: response.likes },
      });
      response = await getWatchLaterVideosFromServer(tokenResponse);
      dispatch({
        type: "SET_WATCH_LATER",
        payload: { watchLater: response.watchlater },
      });
      navigate("/videos");
    } catch (e) {
      setErrorData(true);
    }
  };
  return { loginHandler };
}

export { useLoginHandler };
