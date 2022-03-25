import { Navigation, Footer, LoginForm, Sidebar } from "components";
import "styles/globalbakin.css";

function LoginPage() {
  return (
    <div className="pagewrapper">
      <Navigation />
      <div className="middle-content">
        <Sidebar />
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}

export { LoginPage };
