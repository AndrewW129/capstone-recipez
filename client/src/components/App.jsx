import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AppHeader from "./AppHeader.jsx";
import MainContent from "./MainContent.jsx";
import Ingredients from "./Ingredients.jsx";
import Profile from "./Profile.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Logout from "./Logout.jsx";
import { UserContext } from "../context/UserContext.jsx";
import IngredientProvider from "../context/IngredientContext.jsx";
import RecipeProvider from "../context/RecipeIngredientContext.jsx";

function App() {
  const context = useContext(UserContext);
  const setUser = (user) => context.setUser(user);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch("/authorized").then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data));
      }
    });
  };

  return (
    <div>
      <AppHeader />
      <IngredientProvider>
        <RecipeProvider>
          <Routes>
            <Route exact path="/" element={<MainContent />} />
            <Route exact path="/ingredients" element={<Ingredients />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/Signup" element={<Signup />} />
            <Route exact path="/logout" element={<Logout />} />
          </Routes>
        </RecipeProvider>
      </IngredientProvider>
    </div>
  );
}

export default App;
