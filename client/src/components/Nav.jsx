import { useState, useContext } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from "../context/UserContext.jsx";
import { Grid, GridRow, Segment, GridColumn } from "semantic-ui-react";
function Nav() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const setUser = (user) => context.setUser(user);

  const updateUser = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    fetch("http://127.0.0.1:5555//logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        updateUser({
          username: "Guest User",
          profile_image:
            "data:image/png;base64,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",
          recipes: [],
        });
        navigate("/");
      }
    });
  };

  return (
    <div>
      {!menu ? (
        <div
          style={{ marginRight: "135px" }}
          onClick={() => setMenu(!menu)}
          className="hamburger-menu"
        >
          <GiHamburgerMenu size={30} />
        </div>
      ) : (
        <div>
          <nav>
            <Grid
              style={{ width: "1425px" }}
              textAlign="center"
              relaxed
              columns={7}
            >
              <GridRow>
                <GridColumn width={2}>
                  <Segment inverted>
                    <NavLink style={{ color: "green" }} to="/">
                      Recipez
                    </NavLink>
                  </Segment>
                </GridColumn>
                <GridColumn width={2}>
                  <Segment inverted>
                    <NavLink style={{ color: "green" }} to="/ingredients">
                      Ingredients
                    </NavLink>
                  </Segment>
                </GridColumn>
                <GridColumn width={2}>
                  <Segment inverted>
                    <NavLink style={{ color: "green" }} to="/profile">
                      Profile
                    </NavLink>
                  </Segment>
                </GridColumn>
                <GridColumn width={2}>
                  <Segment inverted>
                    <NavLink style={{ color: "green" }} to="/login">
                      Login
                    </NavLink>
                  </Segment>
                </GridColumn>
                <GridColumn width={2}>
                  <Segment inverted>
                    <NavLink style={{ color: "green" }} to="/signup">
                      Register
                    </NavLink>
                  </Segment>
                </GridColumn>
                <GridColumn width={2} onClick={handleLogout}>
                  <Segment inverted>
                    <NavLink style={{ color: "green" }} to="/logout">
                      Logout
                    </NavLink>
                  </Segment>
                </GridColumn>
                <GridColumn
                  onClick={() => setMenu(!menu)}
                  className="hamburger-menu"
                >
                  <GiHamburgerMenu size={30} />
                </GridColumn>
              </GridRow>
            </Grid>
            <div
              onClick={() => setMenu(!menu)}
              className="hamburger-menu"
            ></div>
            {/* <List size="large" divided horizontal>
              <ListItem>
                <NavLink to="/">Recipez</NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/ingredients">Ingredients</NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/profile">Profile</NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/login">Login</NavLink>
              </ListItem>
              <ListItem>
                <NavLink to="/signup">Sign Up</NavLink>
              </ListItem>
              <ListItem onClick={handleLogout}>
                <NavLink to="/logout">Logout</NavLink>
              </ListItem>
            </List> */}
          </nav>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Nav;
