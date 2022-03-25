import axios from "axios";
const getVideos = async () => {
  try {
    const response = await axios.get("/api/videos");
    if (response.status === 200) return response.data;
    else throw new Error();
  } catch (e) {
    console.log("getVideos : Error in fetching videos", e);
  }
};

const getCategories = async () => {
  try {
    const response = await axios.get("/api/categories");
    if (response.status === 200) return response.data;
    else throw new Error();
  } catch (e) {
    console.log("getCategories : Error in fetching categories", e);
  }
};

export { getCategories, getVideos };
