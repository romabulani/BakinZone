import { MockAPI, Navigation, ScrollToTop, Sidebar } from "components";
import { VideoListingPage } from "pages";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/mock-api" element={<MockAPI />} />
        <Route path="/videos" element={<VideoListingPage />} />
      </Routes>
    </div>
  );
}

export default App;
