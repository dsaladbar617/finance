import { Link } from "wouter";

const Header = () => {
  return (
    <div className="header">
      <Link href="/">
        <div className="title">Finance</div>
      </Link>
      <div className="login-container">
        <div className="logins">
          <Link href="/signup">
            <button>Sign up</button>
          </Link>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
