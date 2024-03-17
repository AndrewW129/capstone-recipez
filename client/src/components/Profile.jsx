import UserInfo from "./UserInfo.jsx";
import UserCollection from "./UserCollection.jsx";
import UserRecipes from "./UserRecipes.jsx";
import UserForm from "./UserForm";

function Profile() {
  return (
  <div>Profile
    <UserInfo />
    <UserCollection />
    <UserRecipes />
    <UserForm />
  </div>
  );
}

export default Profile;
