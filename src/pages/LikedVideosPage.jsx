import { Footer, LikedVideos, Navigation, Sidebar } from "components";
import "styles/globalbakin.css";

function LikedVideosPage() {
  return (
    <div className="pagewrapper">
      <Navigation />
      <div className="middle-content">
        <Sidebar />
        <LikedVideos />
      </div>
      <Footer />
    </div>
  );
}

export { LikedVideosPage };
