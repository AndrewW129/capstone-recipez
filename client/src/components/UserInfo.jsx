import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CardMeta, Header, CardContent, Card, Image } from "semantic-ui-react";
function UserInfo() {
  const context = useContext(UserContext);
  const user = context.user;
  return (
    <div
      style={{
        textAlign: "center",
        paddingLeft: "37%",
      }}
    >
      <Card>
        <CardContent>
          <Header as="h2">Hello, {user.username}</Header>
          <Header as="h4">Profile Picture:</Header>
          <Image
            rounded
            bordered
            src={user.profile_image}
            alt={user.username}
          />
          <Header as="h4">Email Address:</Header>
          <p>{user.email}</p>
          <CardMeta>Created At: {user.created_at}</CardMeta>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserInfo;
