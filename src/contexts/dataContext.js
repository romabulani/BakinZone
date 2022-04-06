import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { reducer } from "reducer";
import { getCategories, getVideos } from "services";

const initialState = {
  videos: [],
  categories: [],
  category: "All",
  playlists: [],
  history: [],
  likes: [],
  watchLater: [],
  notes: [],
  uploadedVideos: [],
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
