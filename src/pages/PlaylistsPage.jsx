import { Navigation, Footer, Sidebar, Playlists } from "components";
import "styles/globalbakin.css";

function PlaylistsPage() {
  return (
    <div className="pagewrapper">
      <Navigation />
      <div className="middle-content">
        <Sidebar />
        <Playlists />
      </div>
      <Footer />
    </div>
  );
}

export { PlaylistsPage };
