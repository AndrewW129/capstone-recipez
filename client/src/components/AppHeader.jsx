import Nav from "./Nav.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Segment, Image } from "semantic-ui-react";

function AppHeader() {
  const context = useContext(UserContext);
  const user = context.user;
  const setUser = (user) => context.setUser(user);
  // console.log(user.username);
  const navigate = useNavigate();

  const updateUser = (user) => {
    setUser(user);
  };

  return (
    <Segment padded="very" inverted>
      <Header as="h1" color="green" textAlign="center">
        RecipEz
      </Header>
      <Header as="h4" floated="left">
        <Image src={user.profile_image} size="mini" avatar />
        {user.username}
      </Header>
      <Header floated="right">
        <Nav />
      </Header>
    </Segment>
  );
}

export default AppHeader;
