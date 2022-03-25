export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VIDEOS":
      console.log("in set vids", action.payload);
      return {
        ...state,
        videos: action.payload.videos,
      };
    case "SET_CATEGORIES":
      console.log(action, "in set cat");
      return {
        ...state,
        categories: action.payload.categories,
      };
  }
};
