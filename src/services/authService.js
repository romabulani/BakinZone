import axios from "axios";
import { toast } from "react-toastify";

const postLoginData = async (email, password) => {
  try {
    const response = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      toast.success("Log In successful");
      return response.data;
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't Login! Please try again.`);
    console.log("postLoginData: Error in Login", e); // convert this in error page
  }
};

const postSignupData = async (formData, navigate) => {
  try {
    const response = await axios.post("/api/auth/signup", formData);
    if (response.status === 201) {
      toast.success("Sign up successful.");
      navigate("/login");
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't Signup! Please try again.`);
    console.log("signUpHandler : Error in signing up", e);
  }
};

export { postLoginData, postSignupData };
