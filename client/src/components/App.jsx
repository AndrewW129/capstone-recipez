import { useState } from "react";
import { useEffect } from "react";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch("/authorized").then((r) => {
      if (r.ok) {
        r.json().then(setUser);
      } else {
        setUser(null);
      }
    });
  };

  // const updateUser = (u) => setUser(u);
  function updateUser(user) {
    setUser(user);
  }
  return (
    <div>
      <Login updateUser={updateUser} />
      <Signup updateUser={updateUser} />
    </div>
  );
}

export default App;
