import "./Header.css";
import Nav from "./Nav.jsx";
import UserContext from "./UserContext.js";
import { useContext } from "react";

function Header() {
  const user = useContext(UserContext);
  return (
    <div className="header-container">
      <div className="header">
        Header
        {/* <img>Profile pic</img> */}
        <p>{user.username}</p>
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
}

export default Header;
