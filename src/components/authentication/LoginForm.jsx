import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Sidebar } from "components";
import { useLoginHandler } from "hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

function LoginForm() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errorData, setErrorData] = useState(false);
  const { loginHandler } = useLoginHandler();
  return (
    <div className="middle-content">
      <Sidebar />
      <div className="auth-container flex-column-center">
        <h4 className="heading4">LOGIN</h4>
        <form className="form-auth">
          <div className="form-input">
            <label htmlFor="email" className="input-label">
              Email *
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className="input-primary border-box"
              value={loginData.email}
              onChange={(e) =>
                setLoginData((loginData) => ({
                  ...loginData,
                  email: e.target.value,
                }))
              }
              onFocus={() => setErrorData(false)}
            />
          </div>
          <div className="form-input">
            {" "}
            <label htmlFor="password" className="input-label">
              Password *
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="input-primary border-box"
              value={loginData.password}
              onChange={(e) =>
                setLoginData((loginData) => ({
                  ...loginData,
                  password: e.target.value,
                }))
              }
              onFocus={() => setErrorData(false)}
            />
          </div>

          <button
            className="btn btn-primary btn-auth"
            onClick={(e) =>
              loginHandler(e, setLoginData, setErrorData, loginData)
            }
          >
            Login
          </button>
          <button
            className="btn btn-outline-primary btn-auth guest-button"
            onClick={(e) => loginHandler(e, setLoginData, setErrorData)}
          >
            Login as Guest
          </button>
          {errorData && (
            <div className="error-login ">
              <FontAwesomeIcon
                icon="circle-exclamation"
                className="error-icon"
              />
              {"    "}
              <div> Email or Password is incorrect</div>
            </div>
          )}
          <div>
            <span>Don't have an account?</span>
            <Link to="/signup" className="btn-link btn-link-primary">
              Create One
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export { LoginForm };
