import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import Ingredients from "./Ingredients.jsx";
import Profile from "./Profile.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Logout from "./Logout.jsx";
import UserContext from "./UserContext.js";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch("/authorized").then((r) => {
      if (r.ok) {
        r.json().then((data) => setUser(data));
      } else {
        setUser(null);
      }
    });
  };

  function updateUser(value) {
    setUser(value);
    console.log(value);
  }

  function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      <div>
        <Header />
        <Routes>
          <Route 
            exact 
            path="/" 
            element={<MainContent />} 
          />
          <Route
            exact
            path="/ingredients"
            element={<Ingredients />}
          />
          <Route
            exact
            path="/profile"
            element={<Profile />}
          />
          <Route
            exact
            path="/login"
            element={<Login updateUser={updateUser} />}
          />
          <Route 
            exact 
            path="/Signup" 
            element={<Signup />} 
          />
          <Route 
            exact 
            path="/logout" 
            element={<Logout />} 
          />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
