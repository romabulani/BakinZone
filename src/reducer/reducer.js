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
    case "PLAYLIST_OPERATION":
      return {
        ...state,
        playlists: action.payload.playlists,
      };
    case "HISTORY_OPERATION":
      return {
        ...state,
        history: action.payload.history,
      };
    default:
      return state;
  }
};
