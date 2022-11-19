import { useAuth, useData } from "contexts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postLoginData } from "services";

function useLoginHandler() {
  const { setAuthToken, setAuthUser } = useAuth();
  const { dispatch } = useData();
  const navigate = useNavigate();
  const loginHandler = async (
    e,
    setLoginData,
    setErrorData,
    loginData,
    location,
    setDisableLogin
  ) => {
    if (setDisableLogin) setDisableLogin(true);
    if (e) e.preventDefault();
    try {
      let response;
      if (e && e.target.innerText === "Login as Guest") {
        setLoginData({
          email: "johndoe@gmail.com",
          password: "Johndoe@123",
        });
        response = await postLoginData("johndoe@gmail.com", "Johndoe@123");
      } else
        response = await postLoginData(loginData.email, loginData.password);

      const tokenResponse = response.user.token;
      const foundUser = {
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
      };
      setAuthToken(tokenResponse);
      setAuthUser(foundUser);
      localStorage.setItem("authToken", tokenResponse);
      localStorage.setItem("authUser", JSON.stringify(foundUser));
      dispatch({
        type: "SET_PLAYLISTS",
        payload: { playlists: response.user.playlists },
      });
      dispatch({
        type: "SET_HISTORY",
        payload: { history: response.user.history },
      });
      dispatch({
        type: "SET_LIKED_VIDEOS",
        payload: { likes: response.user.likes },
      });
      dispatch({
        type: "SET_WATCH_LATER",
        payload: { watchLater: response.user.watchlater },
      });
      dispatch({
        type: "SET_NOTES",
        payload: { notes: response.user.notes },
      });
      dispatch({
        type: "SET_UPLOADED_VIDEOS",
        payload: { uploadedVideos: response.user.uploadedVideos },
      });
      if (e) toast.success("Log In successful");
      if (location.state) navigate(location.state?.from?.pathname);
      else navigate("/videos");
    } catch (e) {
      setErrorData(true);
    } finally {
      if (setDisableLogin) setDisableLogin(false);
    }
  };
  return { loginHandler };
}

export { useLoginHandler };
