import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { reducer } from "reducer";
import { getCategories, getVideos } from "services";

// Two searchTexts, one for input field in navbar which is searchBarText and other in initial object with key searchText to perform search operation
const initialState = {
  videos: [],
  categories: [],
  category: "All",
  playlists: [],
  history: [],
  likes: [],
  watchLater: [],
  searchText: "",
};

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [playlistModal, setPlaylistModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({});
  const [searchBarText, setSearchBarText] = useState("");
  useEffect(
    () =>
      (async () => {
        const respVideos = await getVideos();
        dispatch({
          type: "SET_VIDEOS",
          payload: { videos: respVideos.videos },
        });
        const respCategories = await getCategories();
        dispatch({
          type: "SET_CATEGORIES",
          payload: { categories: respCategories.categories },
        });
      })(),
    []
  );

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        playlistModal,
        setPlaylistModal,
        currentVideo,
        setCurrentVideo,
        searchBarText,
        setSearchBarText,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
