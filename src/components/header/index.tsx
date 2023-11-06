import logoImg from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FiUser, FiLogIn } from "react-icons/fi";

export function Header() {
  const signed = false;
  const loadingAuth = false;

  return (
    <div className="w-full">
      <header>
        <Link to="/">
          <img src={logoImg} alt="logo" />
        </Link>

        {!loadingAuth && signed && (
          <Link to="/dashboard">
            <FiUser size={24} color="#000" />
          </Link>
        )}
        {loadingAuth && signed && (
          <Link to="/login">
            <FiLogIn size={24} color="#000" />
          </Link>
        )}
      </header>
    </div>
  );
}
