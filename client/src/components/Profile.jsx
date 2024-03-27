import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Container, Header } from "semantic-ui-react";
import UserInfo from "./UserInfo.jsx";
import UserCollection from "./UserCollection.jsx";
import UserForm from "./UserForm.jsx";

function Profile() {
  const context = useContext(UserContext);
  const user = context.user;

  if (user.username === "Guest User") {
    return <h1>Please Login to continue.</h1>;
  }

  return (
    <div>
      <Header dividing as="h1">
        Account Information
      </Header>
      <Container>
        <UserInfo />
      </Container>
      <Header dividing as="h1">
        Your Recipez
      </Header>
      <div style={{ display: "flex" }}>
        <UserCollection />
        <UserForm />
      </div>
    </div>
  );
}

export default Profile;
