import { Footer, Navigation, Sidebar, WatchLater } from "components";
import "styles/globalbakin.css";

function WatchLaterPage() {
  return (
    <div className="pagewrapper">
      <Navigation />
      <div className="middle-content">
        <Sidebar />
        <WatchLater />
      </div>
      <Footer />
    </div>
  );
}

export { WatchLaterPage };
