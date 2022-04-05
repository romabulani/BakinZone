export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VIDEOS":
      return {
        ...state,
        videos: action.payload.videos,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload.categories,
      };
    case "CATEGORY":
      return {
        ...state,
        category: action.payload.category,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.payload.playlists,
      };
    case "SET_HISTORY":
      return {
        ...state,
        history: action.payload.history,
      };
    case "SET_LIKED_VIDEOS":
      return {
        ...state,
        likes: action.payload.likes,
      };
    case "SET_WATCH_LATER":
      return {
        ...state,
        watchLater: action.payload.watchLater,
      };
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload.notes,
      };
    default:
      return state;
  }
};
