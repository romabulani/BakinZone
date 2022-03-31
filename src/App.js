import { MockAPI, PlaylistModal, PrivateRoute, ScrollToTop } from "components";
import {
  LoginPage,
  PlaylistPage,
  PlaylistsPage,
  ProfilePage,
  SignupPage,
  VideoListingPage,
  VideoPage,
  HistoryPage,
  LikedVideosPage,
  WatchLaterPage,
  LandingPage,
} from "pages";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <PlaylistModal />
      <ToastContainer theme="dark" position="bottom-right" autoClose={2000} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mock-api" element={<MockAPI />} />
        <Route path="/videos" element={<VideoListingPage />} />
        <Route path="/videos/:videoId" element={<VideoPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <PrivateRoute>
              <PlaylistsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/playlists/:playlistId"
          element={
            <PrivateRoute>
              <PlaylistPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <HistoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/liked"
          element={
            <PrivateRoute>
              <LikedVideosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/watchlater"
          element={
            <PrivateRoute>
              <WatchLaterPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
