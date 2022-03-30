import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts";
import "./profile.css";
import { toast } from "react-toastify";

function ProfileDetails() {
  const { setAuthToken, authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.authUser) setAuthUser(JSON.parse(localStorage.authUser));
  }, []);

  function logoutHandler() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    toast.success("Logout successful");
    setAuthToken("");
    setAuthUser(null);
    navigate("/videos");
  }

  return (
    <div className="flex-row-center">
      <div className="logout-container flex-column-center">
        <h4 className="heading4">ACCOUNT DETAILS</h4>
        <div className="row-format">
          Name :{` ${authUser.firstName} ${authUser.lastName}`}
        </div>
        <div className="row-format">Email :{` ${authUser.email}`}</div>
        <button className="btn btn-outline-error" onClick={logoutHandler}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export { ProfileDetails };
