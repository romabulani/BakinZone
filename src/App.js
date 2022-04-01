import {
  Footer,
  HeroSection,
  History,
  LikedVideos,
  LoginForm,
  MobileProfile,
  MockAPI,
  Navigation,
  NotFound,
  PlaylistModal,
  Playlists,
  PrivateRoute,
  ProfileDetails,
  ScrollToTop,
  SignupForm,
  SinglePlaylist,
  Video,
  Videos,
  WatchLater,
} from "components";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

function App() {
  return (
    <div className="App pagewrapper">
      <Navigation />
      <ScrollToTop />
      <PlaylistModal />
      <ToastContainer theme="dark" position="bottom-right" autoClose={800} />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/mock-api" element={<MockAPI />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
