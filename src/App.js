import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import {
  Footer,
  HeroSection,
  History,
  LikedVideos,
  LoginForm,
  MobileProfile,
  Navigation,
  NotFound,
  PlaylistModal,
  Playlists,
  PrivateRoute,
  ProfileDetails,
  ScrollToTop,
  SignupForm,
  SinglePlaylist,
  UploadVideo,
  Video,
  Videos,
  WatchLater,
} from "components";
import "./App.css";
import { useAuth, useData, useTheme } from "contexts";
import {
  getAllLikedVideosFromServer,
  getAllPlaylistsFromServer,
  getAllVideosInHistoryFromServer,
  getNotesFromServer,
  getWatchLaterVideosFromServer,
  getUploadedVideos,
} from "services";
import { useEffect } from "react";

function App() {
  const { theme } = useTheme();
  const { authToken } = useAuth();
  const { dispatch } = useData();
  useEffect(() => {
    (async () => {
      if (authToken)
        try {
          let response = await getNotesFromServer(authToken);
          dispatch({ type: "SET_NOTES", payload: { notes: response.notes } });
          response = await getAllPlaylistsFromServer(authToken);
          dispatch({
            type: "SET_PLAYLISTS",
            payload: { playlists: response.playlists },
          });
          response = await getAllLikedVideosFromServer(authToken);
          dispatch({
            type: "SET_LIKED_VIDEOS",
            payload: { likes: response.likes },
          });
          response = await getWatchLaterVideosFromServer(authToken);
          dispatch({
            type: "SET_WATCH_LATER",
            payload: { watchLater: response.watchlater },
          });
          response = await getAllVideosInHistoryFromServer(authToken);
          dispatch({
            type: "SET_HISTORY",
            payload: { history: response.history },
          });
          response = await getUploadedVideos(authToken);
          dispatch({
            type: "SET_UPLOADED_VIDEOS",
            payload: { uploadedVideos: response.uploadedVideos },
          });
        } catch (e) {
          console.error(e);
        }
    })();
  }, [authToken]);
  return (
    <div className="App pagewrapper" data-theme={theme}>
      <Navigation />
      <ScrollToTop />
      <PlaylistModal />
      <ToastContainer
        theme={theme === "dark" ? "dark" : "light"}
        position="bottom-right"
        autoClose={800}
        draggable
      />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/:videoId" element={<Video />} />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <ProfileDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <PrivateRoute>
              <Playlists />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlists/:playlistId"
          element={
            <PrivateRoute>
              <SinglePlaylist />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />
        <Route
          path="/liked"
          element={
            <PrivateRoute>
              <LikedVideos />
            </PrivateRoute>
          }
        />
        <Route
          path="/watchlater"
          element={
            <PrivateRoute>
              <WatchLater />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <MobileProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/uploadvideo"
          element={
            <PrivateRoute>
              <UploadVideo />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
