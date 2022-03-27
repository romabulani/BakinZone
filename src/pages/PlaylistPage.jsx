import { Footer, Navigation, Sidebar, SinglePlaylist } from "components";

function PlaylistPage() {
  return (
    <div className="pagewrapper">
      <Navigation />
      <div className="middle-content">
        <Sidebar />
        <SinglePlaylist />
      </div>
      <Footer />
    </div>
  );
}

export { PlaylistPage };
