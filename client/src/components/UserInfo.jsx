import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function UserInfo() {
  const context = useContext(UserContext);
  const user = context.user;
  return (
    <div>
      <h1>Hello, {user.username}</h1>
      <img src={user.profile_image} alt={user.username}/>
      <p>{user.email}</p>
    </div>
  );
}

export default UserInfo;
