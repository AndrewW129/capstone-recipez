import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./context/UserContext.jsx";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </React.StrictMode>
);
