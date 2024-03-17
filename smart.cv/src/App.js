import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import Login from "./login";
import Register from "./Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/" exact component={() => <div>Home</div>} />
      </Routes>
    </Router>
  );
}

export default App;
