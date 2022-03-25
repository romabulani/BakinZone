import { Navigation, Footer, SignupForm, Sidebar } from "components";
import "styles/globalbakin.css";

function SignupPage() {
  return (
    <div className="pagewrapper">
      <Navigation />
      <div className="middle-content">
        <Sidebar />
        <SignupForm />
      </div>
      <Footer />
    </div>
  );
}

export { SignupPage };
