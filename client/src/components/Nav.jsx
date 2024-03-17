import { Outlet, NavLink, Navigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

function Nav() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const updateUser = useContext(UserContext);

  const handleLogout = () => {
    fetch("http://127.0.0.1:5555//logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        updateUser(null);
        navigate("/");
      }
    });
  };

  return (
    <div>
      {!menu ? (
        <div onClick={() => setMenu(!menu)} className="hamburger-menu">
          <GiHamburgerMenu size={30} />
        </div>
      ) : (
        <div>
          <div onClick={() => setMenu(!menu)} className="hamburger-menu">
            <GiHamburgerMenu size={20} />
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Recipez</NavLink>
              </li>
              <li>
                <NavLink to="/ingredients">Ingredients</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
              <li onClick={handleLogout}>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Nav;
