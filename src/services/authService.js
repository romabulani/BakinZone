import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "utilities";

const postLoginData = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      return response.data;
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't Login! Please try again.`);
    console.error("postLoginData: Error in Login", e);
  }
};

const postSignupData = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, formData);
    if (response.status === 201) {
      toast.success("Sign up successful.");
      return response.data;
    } else throw new Error();
  } catch (e) {
    toast.error(`Couldn't Signup! Please try again.`);
    console.error("signUpHandler : Error in signing up", e);
  }
};

export { postLoginData, postSignupData };
