import { MockAPI, PlaylistModal, ScrollToTop } from "components";
import { useAuth } from "contexts";
import {
  LoginPage,
  PlaylistPage,
  PlaylistsPage,
  ProfilePage,
  SignupPage,
  VideoListingPage,
} from "pages";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

function App() {
  const { authToken } = useAuth();

  return (
    <div className="App">
      <ScrollToTop />
      <PlaylistModal />
      <ToastContainer theme="dark" position="bottom-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<VideoListingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mock-api" element={<MockAPI />} />
        <Route path="/videos" element={<VideoListingPage />} />
        {authToken && <Route path="/profile" element={<ProfilePage />} />}
        <Route path="/playlists" element={<PlaylistsPage />} />
        <Route path="/playlists/:playlistId" element={<PlaylistPage />} />
      </Routes>
    </div>
  );
}

export default App;
