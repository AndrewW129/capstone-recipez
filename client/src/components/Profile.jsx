import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import UserInfo from "./UserInfo.jsx";
import UserCollection from "./UserCollection.jsx";
import UserRecipes from "./UserRecipes.jsx";
import UserForm from "./UserForm.jsx";

function Profile() {
  const context = useContext(UserContext);
  const user = context.user;

  if (user.username === "Guest User") {
    return <h1>Please Login to continue.</h1>;
  }

  return (
    <div>
      Profile
      <div>
        <UserInfo />
        <UserCollection />
        <UserRecipes />
        <UserForm />
      </div>
    </div>
  );
}

export default Profile;
