import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "reducer";
import { getCategories, getVideos } from "services";

const initialState = {
  videos: [],
  categories: [],
  category: "All",
};

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataContextProvider, useData };
