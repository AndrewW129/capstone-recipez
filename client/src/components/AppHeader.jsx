import Nav from "./Nav.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { useContext } from "react";
import { Header, Segment, Image } from "semantic-ui-react";

function AppHeader() {
  const context = useContext(UserContext);
  const user = context.user;
  // console.log(user.username);

  return (
    <Segment basic padded="very" inverted>
      <Header size="huge" as="h1" color="green" textAlign="center">
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
