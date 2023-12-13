import { Link } from "react-router-dom";
import chatGptLogo from "./../../asset/logo.png";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import Navigation from "../Navigation/Navigation";

const Header = () => {
  const auth = useAuth();
  return (
    <div className="header">
      <div className="left-header">
        <Link to={"/"} className="link">
          <img src={chatGptLogo} alt="" />
          <p>AiChatBot</p>
        </Link>
      </div>
      <div className="right-header">
        {auth?.isLoggedIn ? (
          <>
            <Navigation to="/chat" text="Chat" />
            <Navigation to="/logout" text="logout" onClick={auth.logout} />
          </>
        ) : (
          <>
            <Navigation to="/login" text="login" />
            <Navigation to="/signup" text="signup" />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
