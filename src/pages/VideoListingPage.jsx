import { Footer, Navigation, Sidebar, Videos } from "components";
import React from "react";
import "styles/globalbakin.css";
function VideoListingPage() {
  return (
    <div className="pagewrapper">
      <Navigation />
      <div className="middle-content">
        <Sidebar />
        <Videos />
      </div>
      <Footer />
    </div>
  );
}

export { VideoListingPage };
