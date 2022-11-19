import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useData } from "contexts";
import { Sidebar } from "components";
import "./profile.css";

function ProfileDetails() {
  const { setAuthToken, authUser, setAuthUser } = useAuth();
  const { dispatch } = useData();
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    toast.success("Logout successful");
    setAuthToken("");
    setAuthUser(null);
    dispatch({ type: "SET_NOTES", payload: { notes: [] } });
    dispatch({ type: "SET_PLAYLISTS", payload: { playlists: [] } });
    dispatch({ type: "SET_LIKED_VIDEOS", payload: { likes: [] } });
    dispatch({ type: "SET_WATCH_LATER", payload: { watchLater: [] } });
    dispatch({ type: "SET_HISTORY", payload: { history: [] } });
    dispatch({ type: "SET_UPLOADED_VIDEOS", payload: { uploadedVideos: [] } });
    navigate("/videos");
  }

  return (
    <div className="middle-content">
      <Sidebar />
      <div className="flex-row-center">
        <div className="logout-container flex-column-center">
          <div className="large-font-size">
            Account Details<hr className="section-line"></hr>
          </div>

          <div className="flex-row-center profile-details">
            <div className="flex-column profile-column">
              <p>Name</p>
              <p>Email</p>
            </div>
            <div className="flex-column  profile-column">
              <p>{` ${authUser.firstName} ${authUser.lastName}`}</p>
              <p>{` ${authUser.email}`}</p>
            </div>
          </div>
          <div className="large-font-size">
            Account Settings<hr className="section-line"></hr>
          </div>
          <button
            className="btn btn-outline-error logout-btn"
            onClick={logoutHandler}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export { ProfileDetails };
