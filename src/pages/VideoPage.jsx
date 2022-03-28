import { Footer, Navigation, Sidebar, Video } from "components";
import "styles/globalbakin.css";

function VideoPage() {
  return (
    <div className="pagewrapper">
      <Navigation />
      <div className="middle-content">
        <Sidebar />
        <Video />
      </div>
      <Footer />
    </div>
  );
}

export { VideoPage };
