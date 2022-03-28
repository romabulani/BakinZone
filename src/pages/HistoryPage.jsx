import { Footer, History, Navigation, Sidebar } from "components";
import "styles/globalbakin.css";

function HistoryPage() {
  return (
    <div className="pagewrapper">
      <Navigation />
      <div className="middle-content">
        <Sidebar />
        <History />
      </div>
      <Footer />
    </div>
  );
}

export { HistoryPage };
