import { Footer, Navigation, ProfileDetails, Sidebar } from "components";
import React from "react";

function ProfilePage() {
  return (
    <div className="pagewrapper">
      <Navigation />
      <div className="middle-content">
        <Sidebar />
        <ProfileDetails />
      </div>
      <Footer />
    </div>
  );
}

export { ProfilePage };
