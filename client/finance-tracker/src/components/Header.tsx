import { Link } from "wouter";
import { navigate } from "wouter/use-browser-location";
import { axiosInstance } from "../util/axios";
import { Dispatch, SetStateAction } from "react";
// import { useEffect, useState } from "react";
// import { axiosInstance } from "../util/axios";

type HeaderProps = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ isAuth, setIsAuth }: HeaderProps) => {
  // const [isAuth, setIsAuth] = useState(false);

  // const accessToken = localStorage.getItem("accessToken");
  // useEffect(() => {
  //   if (accessToken) {
  //     setIsAuth(true);
  //   } else {
  //     setIsAuth(false);
  //   }
  // }, [accessToken]);

  return (
    <div className="header">
      <div className="header-container">
        <Link href="/">
          <div className="title">Finance</div>
        </Link>
        <div className="login-container">
          <div className="logins">
            {isAuth ? (
              <button
                onClick={async () => {
                  await axiosInstance.delete("/account/logout");
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  setIsAuth(false);
                  navigate("/");
                }}
              >
                Log Out
              </button>
            ) : (
              <>
                <Link href="/signup">
                  <button>Sign up</button>
                </Link>
                <Link href="/login">
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
