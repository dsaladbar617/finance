import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../util/axios";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const Header = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const nav = useNavigate();
  return (
    <div className="header">
      <div className="header-container">
        <div className="login-container">
          <div className="logins">
            {isAuth ? (
              <button
                onClick={async () => {
                  await axiosInstance.delete("/account/logout");
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  nav("/");
                  setIsAuth(false);
                }}
              >
                Log Out
              </button>
            ) : (
              <>
                <Link to="/signup">
                  <button>Sign up</button>
                </Link>
                <Link to="/login">
                  <button>Login</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
