import { Link } from "wouter";

const Header = () => {
  return (
    <div className="header">
      <div className="header-container">
        <Link href="/">
          <div className="title">Finance</div>
        </Link>
        <div className="login-container">
          <div className="logins">
            <Link href="/signup">
              <button>Sign up</button>
            </Link>
            <Link href="/login">
              <button>Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
