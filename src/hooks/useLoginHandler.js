import { useAuth } from "contexts";
import { useNavigate } from "react-router-dom";
import { postLoginData } from "services";

function useLoginHandler() {
  const { setAuthToken, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const loginHandler = async (e, setLoginData, setErrorData, loginData) => {
    e.preventDefault();
    try {
      let response;
      if (e.target.innerText === "Login as Guest") {
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
      navigate("/videos");
    } catch (e) {
      console.log("loginHandler: Error in Login", e);
      setErrorData(true);
    }
  };
  return { loginHandler };
}

export { useLoginHandler };
